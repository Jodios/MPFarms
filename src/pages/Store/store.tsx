import React from "react";
import "./store.css";
import item from "./item";
import firebase from "firebase";

const inventory = firebase.firestore().collection("/Inventory"); 
export default class Store extends React.Component{

    state: any = {items: [] as item[], initialized: false}

    componentDidMount = async() => {
        this.listenToInventory();
    }

    listenToInventory = async() => {
        let inventoryItems: item[] = [];
        await inventory.onSnapshot(async(snapshot) => {
            await snapshot.docChanges().forEach((document) => {
                let childSnapshot = document.doc;
                let data: item = childSnapshot.data() as item;
                data.id = childSnapshot.id;
                if(!this.state.initialized){
                    this.setState({[data.id+"sizeIndex"]:  0})
                    this.setState({[data.id+"cartQuantity"]:  0})
                    inventoryItems.push(data);
                }else{
                    this.updateInventory(document);
                }  
            });
            if(!this.state.initialized)
                this.setState({initialized: true, items: inventoryItems});
        });
    }

    updateInventory = ( document: firebase.firestore.DocumentChange ) => {
        let affectedItem:item = document.doc.data() as item;
        affectedItem.id = document.doc.id; 
        let newList: item[] = this.state.items; 
        if(document.type === "added"){
            this.setState({[affectedItem.id+"sizeIndex"]:  0})
            this.setState({[affectedItem.id+"cartQuantity"]:  0})
            newList.push(affectedItem);
        }
        else if(document.type === "removed"){
            newList = newList.filter(currentItem => currentItem.id != affectedItem.id);
        }
        else if(document.type === "modified"){
            let index = 0;
            let quantity = this.state[affectedItem.id+"cartQuantity"];
            let variation = this.state[affectedItem.id+"sizeIndex"]; 
            newList.forEach((currentItem, i) => {
                if(currentItem.id === affectedItem.id){
                    index = i; 
                    return;
                }
            });
            newList[index] = affectedItem;
            if(affectedItem.variations[variation].quantity < quantity)
                this.setState({[affectedItem.id+"cartQuantity"]: affectedItem.variations[variation].quantity}); 
        }
        this.setState({items: newList});
    }

    setSize = (id: string, sizeIndex: number, variation: {quantity: number, price: number, size: number}) => {
        let quantity = this.state[id+"cartQuantity"];
        if (quantity > variation.quantity)
            this.setState({[id+"sizeIndex"]: sizeIndex, [id+"cartQuantity"]: variation.quantity});
        else 
            this.setState({[id+"sizeIndex"]: sizeIndex});
    }

    addItem = (id: string, quantity: number) => {
        let current = this.state[id+"cartQuantity"];
        if(current < quantity) 
            this.setState({[id+"cartQuantity"]: current+1});
    }

    removeItem = (id: string) => {
        let current = this.state[id+"cartQuantity"];
        if(current > 0) 
            this.setState({[id+"cartQuantity"]: current-1});
    }
   
    formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(price);
    }    

    getTotal = (price: number, quantity: number) => {
        return this.formatPrice(price * quantity);
    }

    render(){
        return (
            <div className="pageBody">
                <h1>Store...</h1>
                {this.state.items.map((inventoryItem: item) => {
                    let quantity = this.state[inventoryItem.id+"cartQuantity"]; 
                    let i = this.state[inventoryItem.id+"sizeIndex"];
                    let variation = inventoryItem.variations[i];
                    return(
                        <div className="item">
                            <img src={inventoryItem.image} alt={inventoryItem.name} className="itemPicture"/> 
                            <div className="itemDetails">
                                <h3><b>{inventoryItem.name}</b></h3>
                                <p>Price: {this.formatPrice(variation.price/variation.size)}/{inventoryItem.units}</p>
                                <p>Sizes: </p>
                                <div className="sizes">
                                    {inventoryItem.variations.map((variation, index) => {
                                        return(
                                            <p className={"size " + (index==i ? "selected":"")} onClick={()=>{this.setSize(inventoryItem.id, index, variation)}}>{variation.size+inventoryItem.units}</p>
                                        )
                                    })} 
                                </div>
                                <div className="quantity">
                                    <button className="btn btn-primary" onClick={() => {this.removeItem(inventoryItem.id)}}>-</button> 
                                    <p>{quantity}</p> 
                                    <button className="btn btn-primary" onClick={() => {this.addItem(inventoryItem.id, variation.quantity)}}>+</button> 
                                </div>
                                {quantity > 0 ? 
                                    <button className="btn btn-primary addCart">
                                        Add To Cart({this.getTotal(variation.price, quantity)})
                                    </button> : null
                                } 
                            </div> 
                        </div>
                    )
                })}
            </div>
        )
    }
}