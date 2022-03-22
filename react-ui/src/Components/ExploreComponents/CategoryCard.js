import React from 'react';

import Button from "@mui/material/Button"

import "./CategoryCard.css";
import CollectionCard from "./CollectionCard"

const CategoryCard = (props) => {
    const title = props.data.categoryTitle;
    const collectionData = props.data.collections;

    var collectionCards =
    <div id = "collectionComponents">
        {collectionData.map((collection, index) => (
            <CollectionCard data = {collection}/>
        ))}
    </div>




    return(
        <div id = "categoryContainer">
            <div id = "categoryTitleContainer">
                <b id = "categoryTitleText">
                    {title}
                </b>
            </div>
            {collectionCards}

            <div id = "exploreButtonContainer">
                <Button variant = "contained" style = {{backgroundColor: "#CE4257", fontSize: "24px"}}>
                    Explore More
                </Button>
            </div>

        </div>
    )
}

export default CategoryCard