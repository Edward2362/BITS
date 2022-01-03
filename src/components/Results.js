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
    
    










    const [foodPrevious, setFoodPrevious] = useState({previousIncluded: false, previousIndex: "0"});
    const [foodNext, setFoodNext] = useState({nextIncluded: false, nextIndex: "0"});
    const [foodIndex, setFoodIndex] = useState({indexIncluded: false, indexStart: "0"});
    
    
    










    const findCourses = () => {
        sessionStorage.getItem("findByCourse") === "true"
            ? setFindByCourse("true")
            : setFindByCourse("");
    };
























































    var previousAvoid = <div></div>;
    var nextAvoid = <div></div>;
    










    










    









    if (!foodPrevious.previousIncluded) {

    } else {
        previousAvoid = <input type="submit" value="APPLY" formMethod="" onClick={() => {setFoodIndex({indexIncluded: true, indexStart: foodPrevious.previousIndex})}}></input>;
    }

    if (!foodNext.nextIncluded) {

    } else {
        nextAvoid = <input type="submit" value="APPLY" formMethod="" onClick={() => {setFoodIndex({indexIncluded: true, indexStart: foodNext.nextIndex})}}></input>;
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
                            <Filter onChange={findCourses} foodIn={(foodArray, previous, next) => {setFood(foodArray); setPlace(true); setFoodPrevious(previous); setFoodNext(next);}} foodIndexPlace={(foodPlaceIndex) => {setFoodIndex(foodPlaceIndex)}} placeValue={place} placeFoodIndex={foodIndex} />
                            <hr></hr>
                            
                            

















                            <div className="results-section">
                                

                                
                                






                                <div className="grid-25">
                                        
                                            
                                    {food.map((placeFood) => (
                                        <Recipe 
                                            key={placeFood.foodId}
                                            placeFood={placeFood}
                                        />
                                    ))} 
                                </div>
                            </div>

                            























                            <div className="results-section">
                                


                            
                































































































































                











                <div className="submit">
                    

























                    {previousAvoid}
                </div>
                <div className="submit">

                    


                    {nextAvoid}
                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Results;
