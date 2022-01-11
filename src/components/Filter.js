import React, { useEffect, useState } from "react";
import { choose } from "../functionsJS/checkbox";

export const Filter = ({
    handleIncomingEndPoint,
    handleIncomingFirstEndPoint,
    handleDeletingEndPoint,
    onChange,
    setDone,
    recipesIn,
    coursesIn,
    recipesAPINextEndPointPlace,
    recipesIndexPlace,
    previousNext,
    recipesAPINextEndPoint,
    placeRecipesIndex,
}) => {
    var endPoint =
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        window.sessionStorage.getItem("place") +
        "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe";
    var endPoint2 = "http://localhost:9000/placeFood";

    const [findInCommunity] = useState(
        sessionStorage.getItem("findInCommunity") ? true : false
    );

    const [findByCourse, setFindByCourse] = useState(false);
    const [calories, setCalories] = useState({ from: "", to: "" });
    const [ingredientUpTo, setIngredientUpTo] = useState("");
    const [diets, setDiets] = useState([]);
    const [checkLoaded, setCheckLoaded] = useState(false);
    const [health] = useState([
        "vegetarian",
        "vegan",
        "paleo",
        "low-sugar",
        "alcohol-free",
        "immuno-supportive",
    ]);
    const [result, setResult] = useState([]);
    const [recipeDataReturn, setRecipeDataReturn] = useState([]);
    const [nextEndPointReturn, setNextEndPointReturn] = useState("");
    const [userRecipeReturn, setUserRecipeReturn] = useState([]);
    const [caloriesLimit, setCaloriesLimit] = useState("4000");
    let fetched = [];
    let combination = [];
    let nEndP = "";
    let array = [];
    const endPointCourse =
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        window.sessionStorage.getItem("place") +
        "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe&calories=1000";
    const getCourses = (e) => {
        fetch(endPointCourse)
            .then((response) => response.json())
            .then(async (fetchResult) => {
                setCheckLoaded(true);
                fetched = fetchResult.hits;
                if (fetchResult._links.next === undefined) {
                    coursesIn([]);
                    setTimeout(handleDone, 200);
                } else {
                    nEndP = fetchResult._links.next.href;
                    while (true) {
                        let preLength = combination.length;
                        let check = false;
                        for (let i = 0; i < fetched.length - 2; i++) {
                            if (check) {
                                break;
                            } else {
                                for (
                                    let j = i + 1;
                                    j < fetched.length - 1;
                                    j++
                                ) {
                                    if (check) {
                                        break;
                                    } else {
                                        for (
                                            let k = j + 1;
                                            k < fetched.length;
                                            k++
                                        ) {
                                            if (
                                                fetched[i].recipe.calories /
                                                    fetched[i].recipe.yield +
                                                    fetched[j].recipe.calories /
                                                        fetched[j].recipe
                                                            .yield +
                                                    fetched[k].recipe.calories /
                                                        fetched[k].recipe
                                                            .yield <
                                                parseInt(caloriesLimit)
                                            ) {
                                                let arr = [
                                                    fetched[i],
                                                    fetched[j],
                                                    fetched[k],
                                                ];
                                                combination.push(arr);
                                                check = true;
                                                setRecipeDataReturn(array);
                                            }
                                            if (check) {
                                                fetched.splice(i, 1);
                                                fetched.splice(j - 1, 1);
                                                fetched.splice(k - 2, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (preLength === combination.length) {
                            break;
                        }
                    }
                    let count = 0;
                    while (count < 10) {
                        let ep2 = fetchResult._links.next.href;
                        await fetch(nEndP)
                            .then((response1) => response1.json())
                            .then((fetchResult1) => {
                                let fetched1 = fetchResult1.hits;
                                while (true) {
                                    let preLength = combination.length;
                                    let check = false;
                                    for (
                                        let i = 0;
                                        i < fetched1.length - 2;
                                        i++
                                    ) {
                                        if (check) {
                                            break;
                                        } else {
                                            for (
                                                let j = i + 1;
                                                j < fetched1.length - 1;
                                                j++
                                            ) {
                                                if (check) {
                                                    break;
                                                } else {
                                                    for (
                                                        let k = j + 1;
                                                        k < fetched1.length;
                                                        k++
                                                    ) {
                                                        if (
                                                            fetched1[i].recipe
                                                                .calories /
                                                                fetched1[i]
                                                                    .recipe
                                                                    .yield +
                                                                fetched1[j]
                                                                    .recipe
                                                                    .calories /
                                                                    fetched1[j]
                                                                        .recipe
                                                                        .yield +
                                                                fetched1[k]
                                                                    .recipe
                                                                    .calories /
                                                                    fetched1[k]
                                                                        .recipe
                                                                        .yield <
                                                            parseInt(
                                                                caloriesLimit
                                                            )
                                                        ) {
                                                            let arr = [
                                                                fetched1[i],
                                                                fetched1[j],
                                                                fetched1[k],
                                                            ];
                                                            combination.push(
                                                                arr
                                                            );
                                                            check = true;
                                                            setRecipeDataReturn(
                                                                combination
                                                            );
                                                        }
                                                        if (check) {
                                                            fetched1.splice(
                                                                i,
                                                                1
                                                            );
                                                            fetched1.splice(
                                                                j - 1,
                                                                1
                                                            );
                                                            fetched1.splice(
                                                                k - 2,
                                                                1
                                                            );
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (preLength === combination.length) {
                                        break;
                                    }
                                }
                            });
                        count++;
                    }
                    console.log(combination);
                    let course8Array = combination.splice(0, 10);
                    console.log(course8Array);
                    coursesIn(course8Array);
                    setTimeout(handleDone, 200);
                }
            });
    };

    const handleDone = () => {
        setDone(true);
    };

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
        } else {
            sessionStorage.setItem("findByCourse", true);
            e.target.parentElement.classList.add("checked");
            setFindByCourse(true);
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

    const load = async (recipesIndex) => {
        var recipesPrevious = {};
        var recipesNext = {};
        var caloriesFromMix = "";
        var caloriesToMix = "";
        var ingredientUpToMix = "";
        var dietsMix = "";

        var caloriesFromToMix = "";
        var healthMix = "";
        if (null === window.sessionStorage.getItem("findInCommunity")) {
            if (null !== window.sessionStorage.getItem("caloriesFrom")) {
                caloriesFromMix = window.sessionStorage.getItem("caloriesFrom");
            } else {
                caloriesFromMix = calories.from;
            }

            if (null !== window.sessionStorage.getItem("caloriesTo")) {
                caloriesToMix = window.sessionStorage.getItem("caloriesTo");
            } else {
                caloriesToMix = calories.to;
            }

            if (null !== window.sessionStorage.getItem("ingredientUpTo")) {
                ingredientUpToMix =
                    window.sessionStorage.getItem("ingredientUpTo");
            } else {
                ingredientUpToMix = ingredientUpTo;
            }

            if (caloriesFromMix !== "" && caloriesToMix === "") {
                caloriesFromToMix = "&calories=" + caloriesFromMix + "%2B";
            } else if (caloriesFromMix !== "" && caloriesToMix !== "") {
                caloriesFromToMix =
                    "&calories=" + caloriesFromMix + "-" + caloriesToMix;
            } else if (caloriesFromMix === "" && caloriesToMix !== "") {
                caloriesFromToMix = "&calories=" + caloriesToMix;
            } else {
                caloriesFromToMix = "";
            }

            ingredientUpToMix === ""
                ? (ingredientUpToMix = "")
                : (ingredientUpToMix = "&ingr=" + ingredientUpToMix);
            for (let i = 0; i < diets.length; ++i) {
                if (health.includes(diets[i].toLowerCase())) {
                    healthMix = healthMix + "&health=" + diets[i].toLowerCase();
                } else {
                    dietsMix = dietsMix + "&diet=" + diets[i].toLowerCase();
                }
            }

            if (!recipesAPINextEndPoint.recipesAPINextEndPointIncluded) {
                endPoint =
                    endPoint +
                    caloriesFromToMix +
                    ingredientUpToMix +
                    healthMix +
                    dietsMix;
            } else {
                endPoint = recipesIndex;
            }

            await fetch(endPoint)
                .then((response) => response.json())
                .then((fetchResult) => {
                    let fetched = fetchResult.hits;
                    setCheckLoaded(true);
                    var recipesAPINextEndPointMix = {
                        recipesAPINextEndPointIncluded: false,
                        recipesAPINextEndPointStart: recipesIndex,
                    };
                    if (0 === fetched.length) {
                        recipesPrevious = {
                            previousIncluded: false,
                            previousIndex: "0",
                        };
                        recipesNext = { nextIncluded: false, nextIndex: "0" };

                        // var recipesAPINextEndPointMix = {
                        //     recipesAPINextEndPointIncluded: false,
                        //     recipesAPINextEndPointStart: recipesIndex,
                        // };
                        recipesAPINextEndPointPlace(recipesAPINextEndPointMix);

                        recipesIn([], recipesPrevious, recipesNext);
                    } else {
                        recipesPrevious = {
                            previousIncluded: false,
                            previousIndex: "0",
                        };
                        recipesNext = { nextIncluded: false, nextIndex: "0" };
                        // var recipesAPINextEndPointMix = {
                        //     recipesAPINextEndPointIncluded: false,
                        //     recipesAPINextEndPointStart: recipesIndex,
                        // };
                        recipesAPINextEndPointPlace(recipesAPINextEndPointMix);

                        recipesIn(fetched, recipesPrevious, recipesNext);
                        if (
                            !recipesAPINextEndPoint.recipesAPINextEndPointIncluded
                        ) {
                            if (!(fetchResult._links.next === undefined)) {
                                handleIncomingFirstEndPoint(
                                    endPoint,
                                    fetchResult._links.next.href
                                );
                            }
                        } else {
                            if ("next" !== previousNext) {
                                handleDeletingEndPoint();
                            } else {
                                if (!(fetchResult._links.next === undefined)) {
                                    handleIncomingEndPoint(
                                        fetchResult._links.next.href
                                    );
                                }
                            }
                        }
                    }
                    setTimeout(handleDone, 5000);
                });
        } else {
            if (null === window.sessionStorage.getItem("place")) {
                recipesPrevious = {
                    previousIncluded: false,
                    previousIndex: "0",
                };
                recipesNext = { nextIncluded: false, nextIndex: "0" };
                setCheckLoaded(true);
                recipesIn([], recipesPrevious, recipesNext);
                setTimeout(handleDone, 5000);
            } else {
                if ("" === window.sessionStorage.getItem("place")) {
                    recipesPrevious = {
                        previousIncluded: false,
                        previousIndex: "0",
                    };
                    recipesNext = { nextIncluded: false, nextIndex: "0" };
                    setCheckLoaded(true);
                    recipesIn([], recipesPrevious, recipesNext);
                    setTimeout(handleDone, 5000);
                } else {
                    // var caloriesFromMix = "";
                    // var caloriesToMix = "";
                    // var ingredientUpToMix = "";
                    // var dietsMix = "";

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

                    if (0 !== diets.length) {
                        for (let i = 0; i < diets.length; ++i) {
                            if (diets.length - 1 === i) {
                                dietsMix = dietsMix + diets[i];
                            } else {
                                dietsMix = dietsMix + diets[i] + ",";
                            }
                        }
                    } else {
                        dietsMix = "place";
                    }

                    caloriesFromMix =
                        caloriesFromMix === ""
                            ? (caloriesFromMix = "0")
                            : caloriesFromMix;
                    caloriesToMix =
                        caloriesToMix === ""
                            ? (caloriesToMix = "0")
                            : caloriesToMix;
                    ingredientUpToMix =
                        ingredientUpToMix === ""
                            ? (ingredientUpToMix = "0")
                            : ingredientUpToMix;

                    await fetch(
                        endPoint2 +
                            "/" +
                            window.sessionStorage.getItem("place") +
                            "/" +
                            caloriesFromMix +
                            "/" +
                            caloriesToMix +
                            "/" +
                            ingredientUpToMix +
                            "/" +
                            dietsMix +
                            "/" +
                            recipesIndex
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setCheckLoaded(true);
                            if (undefined !== data[0].foodPrevious) {
                                if (undefined !== data[0].foodNext) {
                                    recipesPrevious = {
                                        previousIncluded: true,
                                        previousIndex:
                                            data[0].foodPrevious.toString(),
                                    };

                                    recipesNext = {
                                        nextIncluded: true,
                                        nextIndex: data[0].foodNext.toString(),
                                    };
                                } else {
                                    recipesPrevious = {
                                        previousIncluded: true,
                                        previousIndex:
                                            data[0].foodPrevious.toString(),
                                    };
                                    recipesNext = {
                                        nextIncluded: false,
                                        nextIndex: "0",
                                    };
                                }
                            } else {
                                if (undefined !== data[0].foodNext) {
                                    recipesPrevious = {
                                        previousIncluded: false,
                                        previousIndex: "0",
                                    };

                                    recipesNext = {
                                        nextIncluded: true,
                                        nextIndex: data[0].foodNext.toString(),
                                    };
                                } else {
                                    recipesPrevious = {
                                        previousIncluded: false,
                                        previousIndex: "0",
                                    };
                                    recipesNext = {
                                        nextIncluded: false,
                                        nextIndex: "0",
                                    };
                                }
                            }

                            window.sessionStorage.setItem(
                                "recipesIndex",
                                recipesIndex
                            );
                            var recipesIndexMix = {
                                indexIncluded: false,
                                indexStart: recipesIndex,
                            };
                            recipesIndexPlace(recipesIndexMix);
                            recipesIn(
                                data[0].result,
                                recipesPrevious,
                                recipesNext
                            );
                            setTimeout(handleDone, 5000);
                        });
                }
            }
        }
    };

    const placeLoad = () => {
        window.sessionStorage.setItem("caloriesFrom", calories.from);
        window.sessionStorage.setItem("caloriesTo", calories.to);
        window.sessionStorage.setItem("ingredientUpTo", ingredientUpTo);
        window.sessionStorage.removeItem("recipesIndex");
        if (sessionStorage.getItem("findByCourse")) {
            getCourses();
            setDone(false);
        } else {
            setDone(false);
            load("0");
        }
    };

    if (recipesAPINextEndPoint.recipesAPINextEndPointIncluded) {
        load(recipesAPINextEndPoint.recipesAPINextEndPointStart);
    }

    if (placeRecipesIndex.indexIncluded) {
        load(placeRecipesIndex.indexStart);
    }

    useEffect(() => {
        handleCheckedDiet();
        choose();

        if (checkLoaded) {
        } else {
            var recipesIndex = "";

            if (null !== window.sessionStorage.getItem("recipesIndex")) {
                recipesIndex = window.sessionStorage.getItem("recipesIndex");
            } else {
                recipesIndex = "0";
            }
            load(recipesIndex);
            if (!window.sessionStorage.getItem("findInCommunity")) {
                getCourses();
                setDone(false);
            }
        }
    });

    return (
        <div className="filter">
            <div className="filter-header">
                <h2>Filter</h2>
                {findInCommunity ? (
                    <></>
                ) : (
                    <label className="checkbox-label">
                        By Courses
                        <input
                            type="checkbox"
                            id="find-course"
                            checked={findByCourse}
                            onClick={(e) => {
                                findCourses(e);
                                window.sessionStorage.removeItem(
                                    "recipesIndex"
                                );
                                if (sessionStorage.getItem("findByCourse")) {
                                    getCourses();
                                    setDone(false);
                                } else {
                                    setDone(false);
                                    load("0");
                                }
                            }}
                            onChange={onChange}
                        ></input>
                    </label>
                )}
            </div>

            <div className="filter-section">
                <div id="calories" className="filter-section-body">
                    {!findByCourse ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <label>Limit Calories</label>
                            <input
                                id="limit"
                                placeholder="Limit"
                                value={caloriesLimit}
                                onChange={(e) => {
                                    setCaloriesLimit(e.target.value);
                                }}
                            ></input>
                        </>
                    )}
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
                                value="Vegetarian"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Vegan
                            <input
                                type="checkbox"
                                id="vegan"
                                value="Vegan"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Paleo
                            <input
                                type="checkbox"
                                id="paleo"
                                value="Paleo"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            High-Fiber
                            <input
                                type="checkbox"
                                id="high-fiber"
                                value="High-Fiber"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>

                        <label className="checkbox-label">
                            High-Protein
                            <input
                                type="checkbox"
                                id="high-protein"
                                value="High-Protein"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Low-Carb
                            <input
                                type="checkbox"
                                id="low-carb"
                                value="Low-Carb"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Low-Fat
                            <input
                                type="checkbox"
                                id="low-fat"
                                value="Low-Fat"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Low-Sodium
                            <input
                                type="checkbox"
                                id="low-sodium"
                                value="Low-Sodium"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>

                        <label className="checkbox-label">
                            Low-Sugar
                            <input
                                type="checkbox"
                                id="low-sugar"
                                value="Low-Sugar"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Alcohol-Free
                            <input
                                type="checkbox"
                                id="alcohol-free"
                                value="Alcohol-Free"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Balanced
                            <input
                                type="checkbox"
                                id="balanced"
                                value="Balanced"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                        <label className="checkbox-label">
                            Immunity
                            <input
                                type="checkbox"
                                id="immunity"
                                value="Immuno-supportive"
                                onChange={(e) => handleChoose(e)}
                            ></input>
                        </label>
                    </div>
                </div>
            </div>
            <div className="submit" onClick={placeLoad}>
                <input type="submit" value="APPLY" formMethod=""></input>
            </div>
        </div>
    );
};
