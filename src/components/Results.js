import React, { useState, useEffect } from "react";
import { Filter } from "./Filter";
import Recipe from "./Recipe";
import Course from "./Course";
import { recipes, courses } from "./fakedata";
import { choose } from "../functionsJS/checkbox";

const Results = () => {
    const [findByCourse, setFindByCourse] = useState(
        sessionStorage.getItem("findByCourse")
    );
    const [food, setFood] = useState([]);
    const [place, setPlace] = useState(false);
    const [foodPrevious, setFoodPrevious] = useState({
        previousIncluded: false,
        previousIndex: "0",
    });
    const [foodNext, setFoodNext] = useState({
        nextIncluded: false,
        nextIndex: "0",
    });
    const [foodIndex, setFoodIndex] = useState({
        indexIncluded: false,
        indexStart: "0",
    });

    const [findInCommunity, setFindByCommunity] = useState(
        sessionStorage.getItem("findInCommunity")
            ? "Recipe-Restcipe"
            : "Recipe-Edamam"
    );

    const findCourses = () => {
        sessionStorage.getItem("findByCourse") === "true"
            ? setFindByCourse("true")
            : setFindByCourse("");
    };

    var previousAvoid = <div></div>;
    var nextAvoid = <div></div>;

    if (!foodPrevious.previousIncluded) {
    } else {
        previousAvoid = (
            <button
                className="prev-page"
                onClick={() => {
                    setFoodIndex({
                        indexIncluded: true,
                        indexStart: foodPrevious.previousIndex,
                    });
                }}
            >
                &#8606;
            </button>
        );
    }

    if (!foodNext.nextIncluded) {
    } else {
        nextAvoid = (
            <button
                className="next-page"
                onClick={() => {
                    setFoodIndex({
                        indexIncluded: true,
                        indexStart: foodNext.nextIndex,
                    });
                }}
            >
                &#8608;
            </button>
        );
    }

    return (
        <>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <h1>Results</h1>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <Filter
                                onChange={findCourses}
                                foodIn={(foodArray, previous, next) => {
                                    setFood(foodArray);
                                    setPlace(true);
                                    setFoodPrevious(previous);
                                    setFoodNext(next);
                                }}
                                foodIndexPlace={(foodPlaceIndex) => {
                                    setFoodIndex(foodPlaceIndex);
                                }}
                                placeValue={place}
                                placeFoodIndex={foodIndex}
                            />
                            <hr></hr>
                            {food.length === 0 ? (
                                <div className="results-section">
                                    <p>No Results</p>
                                </div>
                            ) : (
                                <div className="results-section">
                                    {findByCourse === "true" ? (
                                        <div className="grid-50">
                                            {courses.map((course, index) => (
                                                <Course
                                                    key={index}
                                                    recipes={course.recipes}
                                                    url={findInCommunity}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid-25">
                                            {food.map((placeFood) => (
                                                <Recipe
                                                    key={placeFood.foodId}
                                                    placeFood={placeFood}
                                                    url={findInCommunity}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <div className="results-buttons">
                                        {previousAvoid}
                                        {nextAvoid}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Results;
