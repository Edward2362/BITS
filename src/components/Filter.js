import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { choose } from "../functionsJS/checkbox";

export const Filter = ({ onChange, foodIn, foodIndexPlace, placeValue, placeFoodIndex }) => {

































    var endPoint = "http://localhost:9000/placeFood";


    const [findByCourse, setFindByCourse] = useState(false);
    const [calories, setCalories] = useState({from: "0", to: "0"});
    const [ingredientUpTo, setIngredientUpTo] = useState("0");
    


























    if (sessionStorage.getItem("findByCourse")) {
        if (findByCourse === false) {
            setFindByCourse(true);
        }
    }





























































































    if (!placeFoodIndex.indexIncluded) {

    } else {
        load(placeFoodIndex.indexStart);
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

    











    const load = (foodIndex) => {
        













































































































        
        








































































































































        if (null === window.sessionStorage.getItem("findInCommunity")) {

        } else {
            
            var foodPrevious = {};
            var foodNext = {};

            if (null === window.sessionStorage.getItem("place")) {
                foodPrevious = {previousIncluded: false, previousIndex: "0"};
                foodNext = {nextIncluded: false, nextIndex: "0"};
                foodIn([], foodPrevious, foodNext);
                
            } else {




                if ("" == window.sessionStorage.getItem("place")) {
                    foodPrevious = {previousIncluded: false, previousIndex: "0"};
                    foodNext = {nextIncluded: false, nextIndex: "0"};
                    foodIn([], foodPrevious, foodNext);
                    
                } else {
                    











                    
                    


                    



































                    var caloriesFromMix = "";
                    
                    
                    var caloriesToMix = "";
                    var ingredientUpToMix = "";

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
                        ingredientUpToMix = window.sessionStorage.getItem("ingredientUpTo");
                    } else {
                        ingredientUpToMix = ingredientUpTo;
                    }

                    fetch(endPoint + "/" + window.sessionStorage.getItem("place") + "/" + caloriesFromMix + "/" + caloriesToMix + "/" + ingredientUpToMix + "/" + foodIndex)
                    .then(response=>response.json())
                    .then(data => {
                        









                        











                        
                        


                        if (undefined !== data[0].foodPrevious) {
                            


















                            if (undefined !== data[0].foodNext) {
                                
















                                foodPrevious = {previousIncluded: true, previousIndex: data[0].foodPrevious.toString()};
                                






































































































































































































                                foodNext = {nextIncluded: true, nextIndex: data[0].foodNext.toString()};
                                
                            } else {
                                foodPrevious = {previousIncluded: true, previousIndex: data[0].foodPrevious.toString()};
                                foodNext = {nextIncluded: false, nextIndex: "0"};
                            }
                        } else {
                            if (undefined !== data[0].foodNext) {
















                                foodPrevious = {previousIncluded: false, previousIndex: "0"};
                                


                                













                                foodNext = {nextIncluded: true, nextIndex: data[0].foodNext.toString()};
                            } else {
                                











                                
                                


















                                foodPrevious = {previousIncluded: false, previousIndex: "0"};
                                foodNext = {nextIncluded: false, nextIndex: "0"};
                            }
                        }

                        
                        





                        









                        






                        window.sessionStorage.setItem("foodIndex", foodIndex);
                        var foodIndexMix = {indexIncluded: false, indexStart: foodIndex};
                        foodIn(data[0].result, foodPrevious, foodNext);
                        foodIndexPlace(foodIndexMix);

                    });
                }
            }
        }

    };

    const placeLoad = () => {
        window.sessionStorage.setItem("caloriesFrom", calories.from);
        window.sessionStorage.setItem("caloriesTo", calories.to);
        window.sessionStorage.setItem("ingredientUpTo", ingredientUpTo);
        window.sessionStorage.removeItem("foodIndex");
        load("0");
    };

    

    useEffect(() => {
        choose();
        
        
        if (placeValue) {

        } else {
            var foodIndex = "";
            
            if (null !== window.sessionStorage.getItem("foodIndex")) {
                
                foodIndex = window.sessionStorage.getItem("foodIndex");
            } else {
                foodIndex = "0";
            }
            load(foodIndex);
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
                        <input id="from" placeholder="From" value={calories.from} onChange={(e) => {if ("" == e.target.value) {setCalories({from: "0", to: calories.to})} else {setCalories({from: e.target.value, to: calories.to})}}}></input>
                        <input id="to" placeholder="To" value={calories.to} onChange={(e) => {if ("" == e.target.value) {setCalories({from: calories.from, to: "0"})} else {setCalories({to: e.target.value, from: calories.from})}}} ></input>
                    </div>
                    <div id="ingredients" className="filter-section-body">
                        <label>Ingredients</label>
                        <input
                            id="num-of-ingredients"
                            placeholder="Up to"
                            





                            
                            






                            value={ingredientUpTo}
                            onChange={(e) => {if ("" == e.target.value) {setIngredientUpTo("0")} else {setIngredientUpTo(e.target.value)}}}
                        ></input>
                    </div>
                </div>
                <div id="diets" className="filter-section">
                    <div className="diet-choice">
                        <label>Diet</label>
                        <div className="grid-25" onChange={choose}>
                            <label className="checkbox-label">
                                Vegetarian
                                <input type="checkbox" id="vegetarian"></input>
                            </label>
                            <label className="checkbox-label">
                                Vegan
                                <input type="checkbox" id="vegan"></input>
                            </label>
                            <label className="checkbox-label">
                                Paleo
                                <input type="checkbox" id="paleo"></input>
                            </label>
                            <label className="checkbox-label">
                                High-Fiber
                                <input type="checkbox" id="high-fiber"></input>
                            </label>

                            <label className="checkbox-label">
                                High-Protein
                                <input
                                    type="checkbox"
                                    id="high-protein"
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Carb
                                <input type="checkbox" id="low-carb"></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Fat
                                <input type="checkbox" id="low-fat"></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Sodium
                                <input type="checkbox" id="low-sodium"></input>
                            </label>

                            <label className="checkbox-label">
                                Low-Sugar
                                <input type="checkbox" id="low-sugar"></input>
                            </label>
                            <label className="checkbox-label">
                                Alcohol-Free
                                <input
                                    type="checkbox"
                                    id="alcohol-free"
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Balanced
                                <input type="checkbox" id="balanced"></input>
                            </label>
                            <label className="checkbox-label">
                                Immunity
                                <input type="checkbox" id="immunity"></input>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="submit">
                    <input type="submit" value="APPLY" formMethod="" onClick={placeLoad}></input>
                </div>
            
        </div>
    );
};
