import React from "react";
import "./store.css";
import item from "./item";
import firebase from "firebase";
const inventory = firebase.firestore().collection("/Inventory"); export default class Store extends React.Component{

    state: any = {items: [] as item[]}

    componentDidMount = () => {
        this.listenToInventory();
    }

    listenToInventory = async() => {
        let inventoryItems: item[] = [];
        await inventory.get().then((snapshot) => {
            snapshot.forEach(async(childSnapshot) => {
                let data: item = childSnapshot.data() as item;
                data.id = childSnapshot.id;
                this.setState({[data.id+"sizeIndex"]:  0})
                this.setState({[data.id+"cartQuantity"]:  0})
                inventoryItems.push(data);
            })
        })
        this.setState({items: inventoryItems});
    }

    setSize = (id: string, sizeIndex: number) => {
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
                    return(
                        <div className="item">
                            <img src={inventoryItem.image} alt={inventoryItem.name} className="itemPicture"/> 
                            <div className="itemDetails">
                                <h3><b>{inventoryItem.name}</b></h3>
                                <p>Price: {this.formatPrice(inventoryItem.variations[this.state[inventoryItem.id+"sizeIndex"]].price)}/{inventoryItem.units}</p>
                                <p>Sizes: </p>
                                <div className="sizes">
                                    {inventoryItem.variations.map((variation, index) => {
                                        return(
                                            <p className="size" onClick={()=>{this.setSize(inventoryItem.id, index)}}>{variation.size+inventoryItem.units}</p>
                                        )
                                    })} 
                                </div>
                                <div className="quantity">
                                    <button className="btn btn-primary" onClick={() => {this.removeItem(inventoryItem.id)}}>-</button> 
                                    <p>{this.state[inventoryItem.id+"cartQuantity"]}</p> 
                                    <button className="btn btn-primary" onClick={() => {this.addItem(inventoryItem.id, inventoryItem.variations[this.state[inventoryItem.id+"sizeIndex"]].quantity)}}>+</button> 
                                </div>
                                {this.state[inventoryItem.id+"cartQuantity"] > 0 ? 
                                    <button className="btn btn-primary addCart">
                                        Add To Cart({this.getTotal(inventoryItem.variations[this.state[inventoryItem.id+"sizeIndex"]].price, this.state[inventoryItem.id+"cartQuantity"])})
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