import React from 'react'
import "./ExploreCarouselTwo.css"

import CarouselTwoCard from './CarouselTwoCard'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const ExploreCarouselTwo = (props) => {

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

        

    var categoryComponents = 
    <div id = "carTwoComponents">
         <Carousel swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay = {true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">

            {props.data.collections.map((collection, index) => (
                <CarouselTwoCard data = {collection}/>
            ))}
        </Carousel>
    </div>

    return(
        <div id = "expTwoContainer">
            <div id = "expTwoTitle">
              {props.data.carouselTitle}
            </div>
            {categoryComponents}
        </div>
    )
}

export default ExploreCarouselTwo