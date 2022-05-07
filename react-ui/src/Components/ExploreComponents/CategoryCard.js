import React from 'react';

import Button from "@mui/material/Button"

import "./CategoryCard.css";
import CollectionCard from "./CollectionCard"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CategoryCard = (props) => {
    const title = props.data.categoryTitle;
    const collections = props.data.collections;

   
    const responsive = {
        desktop: {
          breakpoint: { max: 2400, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 664 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 664, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      }

    var collectionCards =
    <div id = "collectionComponents">
         <Carousel swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay = {false}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={[/*"tablet", "mobile"*/]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        >
        {(typeof collections !== 'undefined' || collections !== null) ? collections.map((collection, index) => (
            <CollectionCard data = {collection}/>
        )): <div/>}
        </Carousel>
    </div>




    return(
        <div id = "categoryContainer">
            <div id = "categoryTitleContainer">
                <b id = "categoryTitleText">
                    {title}
                </b>
            </div>
            {collectionCards}

            {/* <div id = "exploreButtonContainer">
                <Button variant = "contained" style = {{backgroundColor: "#CE4257", fontSize: "24px"}}>
                    Explore More
                </Button>
            </div> */}

        </div>
    )
}

export default CategoryCard