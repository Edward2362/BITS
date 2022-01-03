import React, { useState } from "react";
import classNames from "classnames";
import Recipe from "./Recipe";

const Course = ({ recipes, url }) => {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);
    const [prev, setPrev] = useState(recipes.length - 1);

    const length = recipes.length;

    const previousElement = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        setNext(next === 0 ? length - 1 : next - 1);
        setPrev(prev === 0 ? length - 1 : prev - 1);
    };

    const nextElement = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        setNext(next === length - 1 ? 0 : next + 1);
        setPrev(prev === length - 1 ? 0 : prev + 1);
    };

    return (
        <div className="course">
            <button className="carousel-button prev" onClick={previousElement}>
                &#8606;
            </button>
            <button className="carousel-button next" onClick={nextElement}>
                &#8608;
            </button>
            <div className="course-content">
                {recipes.map((recipe, index) => (
                    <div
                        className={classNames("recipe-holder absolute", {
                            "current-recipe": index === current,
                            "next-recipe": index === next,
                            "prev-recipe": index === prev,
                        })}
                        key={index}
                    >
                        <Recipe key={index} recipe={recipe} url={url} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Course;
