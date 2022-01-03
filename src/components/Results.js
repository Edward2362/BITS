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
    const [recipes, setRecipes] = useState([]);
    const [place, setPlace] = useState(false);
    const [recipesPrevious, setRecipesPrevious] = useState({
        previousIncluded: false,
        previousIndex: "0",
    });
    const [recipesNext, setRecipesNext] = useState({
        nextIncluded: false,
        nextIndex: "0",
    });
    const [recipesIndex, setRecipesIndex] = useState({
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

    if (!recipesPrevious.previousIncluded) {
    } else {
        previousAvoid = (
            <button
                className="prev-page"
                onClick={() => {
                    setRecipesIndex({
                        indexIncluded: true,
                        indexStart: recipesPrevious.previousIndex,
                    });
                }}
            >
                &#8606;
            </button>
        );
    }

    if (!recipesNext.nextIncluded) {
    } else {
        nextAvoid = (
            <button
                className="next-page"
                onClick={() => {
                    setRecipesIndex({
                        indexIncluded: true,
                        indexStart: recipesNext.nextIndex,
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
                                recipesIn={(recipesArray, previous, next) => {
                                    setRecipes(recipesArray);
                                    setPlace(true);
                                    setRecipesPrevious(previous);
                                    setRecipesNext(next);
                                }}
                                recipesIndexPlace={(recipesPlaceIndex) => {
                                    setRecipesIndex(recipesPlaceIndex);
                                }}
                                placeValue={place}
                                placeRecipesIndex={recipesIndex}
                            />
                            <hr></hr>
                            {recipes.length === 0 ? (
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
                                            {recipes.map((recipe) => (
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
