import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Card1 } from "./Card1";
import { Card2 } from "./Card2";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../DashboardComponents.style.css";

const CardCarousel = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop
      showStatus={false}
      stopOnHover={true}
      showIndicators={false}
    >
      <Card1 />
      <Card2 />
    </Carousel>
  );
};

export default CardCarousel;
