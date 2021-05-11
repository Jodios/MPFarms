import React from "react";
import "./store.css";
import firestore from "../../util/firestore";
import item from "./item";

const inventory = firestore.collection("/Inventory");
export default class Store extends React.Component{

    state = {items: [] as item[]}

    componentDidMount = () => {
        this.listenToInventory();
    }

    listenToInventory = async() => {
        let inventoryItems: item[] = [];
        await inventory.get().then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let data: item = childSnapshot.data() as item;
                inventoryItems.push(data);
            })
        })
        this.setState({items: inventoryItems});
    }

    render(){
        return (
            <div className="pageBody">
                <h1>Store...</h1>
                {this.state.items.map(inventoryItem => {
                    return(
                        <div className="item">
                            <p>{inventoryItem.name}</p>
                            <p>Price: {inventoryItem.price}/{inventoryItem.units}</p>
                            <p>Sizes: {inventoryItem.sizes}</p>

                        </div>
                    )
                })}
            </div>
        )
    }
}