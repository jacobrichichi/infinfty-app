import React from 'react'
import './InventoryMain.css'

const InventoryMain = (props) => {
    // Will need to grab current NFT's from store
    const inventoryItems = [
        {
            "name": "Penguin",
            "price": 20,
            "description": "Nice penguin"
        },
        {
            "name": "Penguin",
            "price": 20,
            "description": "Nice penguin"
        },
        {
            "name": "Penguin",
            "price": 20,
            "description": "Nice penguin"
        },
        {
            "name": "Penguin",
            "price": 20,
            "description": "Nice penguin"
        },
        {
            "name": "Penguin",
            "price": 20,
            "description": "Nice penguin"
        },
        {
            "name": "Penguin",
            "price": 20,
            "description": "Nice penguin"
        },
        {
            "name": "Penguin",
            "price": 20,
            "description": "Nice penguin"
        }
    ]

    var inventoryContainer = 
        <div id = "invContainer">
            {inventoryItems.map((item, index) => (
                <ItemCard data = {item}/>
            ))}
        </div>

    return(
        <div id = "mainInvContainer">
            
        </div>
    )
}
export default InventoryMain;