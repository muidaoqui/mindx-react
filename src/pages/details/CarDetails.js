import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {interior, exterior, behind, light, lightbehind } from "../../img/mec/sclass/index"
const CarGallery = () => {
  const images = [
    interior,
    exterior,
    behind,
    light,
    lightbehind,
  ];

  const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : "");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
  };

  return (
    <div>
        <div className="w-1/2 max-w-4xl mx-auto my-8">
            <div className="relative justify-center flex ">
                <img
                src={selectedImage}
                alt="Car"
                className="w-auto  object-cover rounded-lg"
                />
            </div>

            <Slider {...settings} className="mt-4">
                {images.map((img, index) => (
                <div key={index} className="px-2">
                    <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`w-24 h-16 object-cover cursor-pointer rounded-lg ${
                        selectedImage === img ? "border-2 border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                    />
                </div>
                ))}
            </Slider>
        </div>
        <div className="flex justify-center mt-4">
            <div>

            </div>
            <div></div>
        </div>
    </div>
  );
};

export default CarGallery;
