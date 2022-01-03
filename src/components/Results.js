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
    const [recipe, setRecipe] = useState([]);
    const [place, setPlace] = useState(false);
    const [recipePrevious, setRecipePrevious] = useState({
        previousIncluded: false,
        previousIndex: "0",
    });
    const [recipeNext, setRecipeNext] = useState({
        nextIncluded: false,
        nextIndex: "0",
    });
    const [recipeIndex, setRecipeIndex] = useState({
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

    if (!recipePrevious.previousIncluded) {
    } else {
        previousAvoid = (
            <button
                className="prev-page"
                onClick={() => {
                    setRecipeIndex({
                        indexIncluded: true,
                        indexStart: recipePrevious.previousIndex,
                    });
                }}
            >
                &#8606;
            </button>
        );
    }

    if (!recipeNext.nextIncluded) {
    } else {
        nextAvoid = (
            <button
                className="next-page"
                onClick={() => {
                    setRecipeIndex({
                        indexIncluded: true,
                        indexStart: recipeNext.nextIndex,
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
                                recipeIn={(recipeArray, previous, next) => {
                                    setRecipe(recipeArray);
                                    setPlace(true);
                                    setRecipePrevious(previous);
                                    setRecipeNext(next);
                                }}
                                recipeIndexPlace={(recipePlaceIndex) => {
                                    setRecipeIndex(recipePlaceIndex);
                                }}
                                placeValue={place}
                                placeRecipeIndex={recipeIndex}
                            />
                            <hr></hr>
                            {recipe.length === 0 ? (
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
                                            {recipe.map((recipe) => (
                                                <Recipe
                                                    key={recipe.foodId}
                                                    recipe={recipe}
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
