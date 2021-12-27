import React, { useState } from "react";
import Recipe from "./Recipe";

const Course = ({ data }) => {
    const [current, setCurrent] = useState(0);
    const length = 3;

    const previousElement = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    const nextElement = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    console.log(current);

    const handleClick = () => {
        // const course = document.querySelector("[key=" + id + "]");
        // const button = this.querySelector["[id=" + value + "]"];
        // const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        // const test = button.closest("[data-carousel]").dataset.carousel;
        // console.log(button);
    };

    return (
        <div className="course" data-carousel={data}>
            <button
                className="carousel-button prev"
                data-carousel-button="prev"
                onClick={previousElement}
            ></button>
            <button
                className="carousel-button next"
                data-carousel-button="next"
                onClick={nextElement}
            ></button>
            <div className="course-content">
                <div className="recipe-holder">
                    <Recipe />
                </div>
                <div className="recipe-holder">
                    <Recipe />
                </div>
                <div className="recipe-holder">
                    <Recipe />
                </div>
            </div>
        </div>
    );
};

export default Course;
