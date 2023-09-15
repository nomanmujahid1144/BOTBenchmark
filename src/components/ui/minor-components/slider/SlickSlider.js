import React, { useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SlickSlider.css'


const NextArrow = (props) => {
    const { className, style, onClick } = props;

    return (

        <div
            className={className}
            style={{ ...style, display: "none", top: "100px" ,opacity: "0.9" , padding: "20px"  ,borderRadius: '50%'   }}
            onClick={onClick}
        />

    );
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none", zIndex : "1" , top: "100px" ,opacity: "0.9" , padding: "20px"  ,borderRadius: '50%' }}
            onClick={onClick}
        />
    );
}

var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                speed: 1000,
                slidesToShow: 4,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        },
        {
            breakpoint: 1140,
            settings: {
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        },
        {
            breakpoint: 930,
            settings: {
                speed: 1000,
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        },
        {
            breakpoint: 660,
            settings: {
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                variableWidth: false,
            }
        }
    ]
};
var reviewSettings = {
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    prevArrow: <PrevArrow />, // Hide the previous arrow
    nextArrow: <NextArrow />, // Hide the next arrow
    appendDots: dots => (
        <div
          style={{
                padding: "20px",
          }}
        >
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      ),
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                dots: true,
                centerMode: true,
                infinite: true,
                slidesToShow: 3,
                speed: 500,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                dots: true,
                centerMode: true,
                infinite: true,
                slidesToShow: 3,
                speed: 500,
            }
        },
        {
            breakpoint: 1000,
            settings: {
                dots: true,
                centerMode: false,
                infinite: true,
                slidesToShow: 2,
                speed: 500,
            }
        },
        {
            breakpoint: 650,
            settings: {
                dots: true,
                centerMode: true,
                infinite: true,
                slidesToShow: 1,
                speed: 500,
            }
        }
    ]
};
export const SlickSlider = ({ children }) => {
    return (
    
            <Slider className='w-full' {...settings}>
                    {children}
            </Slider>
      
    )
}


export const SlickReviewSlider = ({ children }) => {
    const sliderRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleDotClick = (index) => {
        if (sliderRef.current && sliderRef.current.slick) {
          sliderRef.current.slick.slickGoTo(index);
        }
      };
    
    return (
    
        <Slider ref={sliderRef} {...reviewSettings} beforeChange={(oldIndex, newIndex) => setActiveSlide(newIndex)} afterChange={(index) => handleDotClick(index)} >
            {React.Children.map(children, (child, index) => React.cloneElement(child, { isActive: index === activeSlide }))}
        </Slider>
    )
}