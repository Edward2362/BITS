import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { choose } from "../functionsJS/checkbox";
// import { set } from "mongoose";

export const Filter = ({
    onChange,
    recipeIn,
    recipeIndexPlace,
    placeValue,
    placeRecipeIndex,
}) => {
    var endPoint = "http://localhost:9000/placeFood";

    const [findByCourse, setFindByCourse] = useState(false);
    const [calories, setCalories] = useState({ from: "", to: "" });
    const [ingredientUpTo, setIngredientUpTo] = useState("");
    const [diets, setDiets] = useState([]);

    if (sessionStorage.getItem("findByCourse")) {
        if (findByCourse === false) {
            setFindByCourse(true);
        }
    }

    const findCourses = (e) => {
        if (sessionStorage.getItem("findByCourse")) {
            sessionStorage.removeItem("findByCourse");
            e.target.parentElement.classList.remove("checked");
            setFindByCourse(false);
            console.log(e.target);
        } else {
            sessionStorage.setItem("findByCourse", true);
            e.target.parentElement.classList.add("checked");
            setFindByCourse(true);
            console.log(e.target);
        }
    };

    const handleChoose = (e) => {
        if (e.target.checked) {
            e.target.parentElement.classList.add("checked");
            setDiets([...diets, e.target.value]);
        } else {
            e.target.parentElement.classList.remove("checked");
            setDiets(diets.filter((diet) => diet !== e.target.value));
        }
    };

    const handleCheckedDiet = () => {
        var checkboxs = document.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < checkboxs.length; i++) {
            if (diets.includes(checkboxs[i].value)) {
                checkboxs[i].checked = true;
            }
        }
    };

    const load = (recipeIndex) => {
        if (null === window.sessionStorage.getItem("findInCommunity")) {
        } else {
            var recipePrevious = {};
            var recipeNext = {};

            if (null === window.sessionStorage.getItem("place")) {
                recipePrevious = {
                    previousIncluded: false,
                    previousIndex: "0",
                };
                recipeNext = { nextIncluded: false, nextIndex: "0" };
                recipeIn([], recipePrevious, recipeNext);
            } else {
                if ("" == window.sessionStorage.getItem("place")) {
                    recipePrevious = {
                        previousIncluded: false,
                        previousIndex: "0",
                    };
                    recipeNext = { nextIncluded: false, nextIndex: "0" };
                    recipeIn([], recipePrevious, recipeNext);
                } else {
                    var caloriesFromMix = "";

                    var caloriesToMix = "";
                    var ingredientUpToMix = "";

                    if (
                        null !== window.sessionStorage.getItem("caloriesFrom")
                    ) {
                        caloriesFromMix =
                            window.sessionStorage.getItem("caloriesFrom");
                    } else {
                        caloriesFromMix = calories.from;
                    }

                    if (null !== window.sessionStorage.getItem("caloriesTo")) {
                        caloriesToMix =
                            window.sessionStorage.getItem("caloriesTo");
                    } else {
                        caloriesToMix = calories.to;
                    }

                    if (
                        null !== window.sessionStorage.getItem("ingredientUpTo")
                    ) {
                        ingredientUpToMix =
                            window.sessionStorage.getItem("ingredientUpTo");
                    } else {
                        ingredientUpToMix = ingredientUpTo;
                    }

                    caloriesFromMix === ""
                        ? (caloriesFromMix = "0")
                        : (caloriesFromMix = caloriesFromMix);
                    caloriesToMix === ""
                        ? (caloriesToMix = "0")
                        : (caloriesToMix = caloriesToMix);
                    ingredientUpToMix === ""
                        ? (ingredientUpToMix = "0")
                        : (ingredientUpToMix = ingredientUpToMix);

                    fetch(
                        endPoint +
                            "/" +
                            window.sessionStorage.getItem("place") +
                            "/" +
                            caloriesFromMix +
                            "/" +
                            caloriesToMix +
                            "/" +
                            ingredientUpToMix +
                            "/" +
                            recipeIndex
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (undefined !== data[0].foodPrevious) {
                                if (undefined !== data[0].foodNext) {
                                    recipePrevious = {
                                        previousIncluded: true,
                                        previousIndex:
                                            data[0].foodPrevious.toString(),
                                    };

                                    recipeNext = {
                                        nextIncluded: true,
                                        nextIndex: data[0].foodNext.toString(),
                                    };
                                } else {
                                    recipePrevious = {
                                        previousIncluded: true,
                                        previousIndex:
                                            data[0].foodPrevious.toString(),
                                    };
                                    recipeNext = {
                                        nextIncluded: false,
                                        nextIndex: "0",
                                    };
                                }
                            } else {
                                if (undefined !== data[0].foodNext) {
                                    recipePrevious = {
                                        previousIncluded: false,
                                        previousIndex: "0",
                                    };

                                    recipeNext = {
                                        nextIncluded: true,
                                        nextIndex: data[0].foodNext.toString(),
                                    };
                                } else {
                                    recipePrevious = {
                                        previousIncluded: false,
                                        previousIndex: "0",
                                    };
                                    recipeNext = {
                                        nextIncluded: false,
                                        nextIndex: "0",
                                    };
                                }
                            }

                            window.sessionStorage.setItem(
                                "recipeIndex",
                                recipeIndex
                            );
                            var recipeIndexMix = {
                                indexIncluded: false,
                                indexStart: recipeIndex,
                            };
                            recipeIn(
                                data[0].result,
                                recipePrevious,
                                recipeNext
                            );
                            recipeIndexPlace(recipeIndexMix);
                        });
                }
            }
        }
    };

    if (!placeRecipeIndex.indexIncluded) {
    } else {
        load(placeRecipeIndex.indexStart);
    }

    const placeLoad = () => {
        window.sessionStorage.setItem("caloriesFrom", calories.from);
        window.sessionStorage.setItem("caloriesTo", calories.to);
        window.sessionStorage.setItem("ingredientUpTo", ingredientUpTo);
        window.sessionStorage.removeItem("recipeIndex");
        load("0");
    };

    useEffect(() => {
        handleCheckedDiet();
        choose();

        if (placeValue) {
        } else {
            var recipeIndex = "";

            if (null !== window.sessionStorage.getItem("recipeIndex")) {
                recipeIndex = window.sessionStorage.getItem("recipeIndex");
            } else {
                recipeIndex = "0";
            }
            load(recipeIndex);
        }
    });

    console.log(findByCourse);

    return (
        <div className="filter">
            <div className="filter-header">
                <h2>Filter</h2>
                <label className="checkbox-label">
                    By Courses
                    <input
                        type="checkbox"
                        id="find-course"
                        checked={findByCourse}
                        onClick={(e) => findCourses(e)}
                        onChange={onChange}
                    ></input>
                </label>
            </div>

            <div className="filter-section">
                <div id="calories" className="filter-section-body">
                    <label>Calories</label>
                    <input
                        id="from"
                        placeholder="From"
                        value={calories.from}
                        onChange={(e) => {
                            setCalories({
                                from: e.target.value,
                                to: calories.to,
                            });
                        }}
                    ></input>
                    <input
                        id="to"
                        placeholder="To"
                        value={calories.to}
                        onChange={(e) => {
                            setCalories({
                                to: e.target.value,
                                from: calories.from,
                            });
                        }}
                    ></input>
                </div>
                <div id="ingredients" className="filter-section-body">
                    <label>Ingredients</label>
                    <input
                        id="num-of-ingredients"
                        placeholder="Up to"
                        value={ingredientUpTo}
                        onChange={(e) => {
                            setIngredientUpTo(e.target.value);
                        }}
                    ></input>
                </div>
            </div>
            <div id="diets" className="filter-section">
                <div className="diet-choice">
                    <label>Diet</label>
                    <div className="grid-25">
                        <label className="checkbox-label">
                            Vegetarian
                            <input
                                type="checkbox"
                                id="vegetarian"
                                value="vegetarian"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Vegan
                            <input
                                type="checkbox"
                                id="vegan"
                                value="vegan"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Paleo
                            <input
                                type="checkbox"
                                id="paleo"
                                value="paleo"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            High-Fiber
                            <input
                                type="checkbox"
                                id="high-fiber"
                                value="high-fiber"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>

                        <label className="checkbox-label">
                            High-Protein
                            <input
                                type="checkbox"
                                id="high-protein"
                                value="high-protein"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Low-Carb
                            <input
                                type="checkbox"
                                id="low-carb"
                                value="low-carb"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Low-Fat
                            <input
                                type="checkbox"
                                id="low-fat"
                                value="low-fat"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Low-Sodium
                            <input
                                type="checkbox"
                                id="low-sodium"
                                value="low-sodium"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>

                        <label className="checkbox-label">
                            Low-Sugar
                            <input
                                type="checkbox"
                                id="low-sugar"
                                value="low-sugar"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Alcohol-Free
                            <input
                                type="checkbox"
                                id="alcohol-free"
                                value="alcohol-free"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Balanced
                            <input
                                type="checkbox"
                                id="balanced"
                                value="balanced"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Immunity
                            <input
                                type="checkbox"
                                id="immunity"
                                value="immunity"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                    </div>
                </div>
            </div>
            <div className="submit">
                <input
                    type="submit"
                    value="APPLY"
                    formMethod=""
                    onClick={placeLoad}
                ></input>
            </div>
        </div>
    );
};
