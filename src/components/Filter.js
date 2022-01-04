import React from "react";
import { choose } from "../functionsJS/checkbox";
import { useState } from "react";
export const Filter = ({onSubmit}) => {
    // const choose = () => {
    //     var checkboxs = document.querySelectorAll("input[type=checkbox]");
    //     var labels = document.querySelectorAll(".checkbox-label");
    //     console.log(checkboxs);
    //     for (let i = 0; i < checkboxs.length; i++) {
    //         if (checkboxs[i].checked == true) {
    //             labels[i].classList.add("checked");
    //         } else {
    //             labels[i].classList.remove("checked");
    //         }
    //     }
    // };
    const [recipeDataReturn, setRecipeDataReturn] = useState([])
    const [termReturn, setTermReturn] = useState("")
    const [nextEndPointReturn, setNextEndPointReturn] = useState("")
    const [userRecipeReturn, setUserRecipeReturn] = useState([])
    const [cal, setCal] = useState({ from: "", to: "" });
    const [diet, setDiet] = useState([]);
    const [health, setHealth] = useState([]);
    let recipeData = []
    let fetched = []
    let nEndP = ""
    let calories = ""
    let dietLabels = ""
    let healths = ""
    if (cal.from != "" && cal.to == "") {
        calories = "&calories=" + cal.from + "+";
    } else if (cal.from != "" && cal.to != "") {
        calories = "&calories=" + cal.from + "-" + cal.to;
    } else if (cal.from == "" && cal.to != "") {
        calories = "&calories=" + cal.to;
    } else {
        calories = "";
    }
    const checkbox = (e) => {
        let data = diet;
        if (e.target.checked) {
            data.push(e.target.value);
            e.target.parentElement.classList.add("checked")
        } else {
            data.indexOf(e.target.value);
            data.splice(data.indexOf(e.target.value), 1);
            e.target.parentElement.classList.remove("checked")
        }
        setDiet(data)
        console.log(data)
    }
    const checkHealth = (e) => {
        let data1 = health;
        if (e.target.checked) {
            data1.push(e.target.value);
            e.target.parentElement.classList.add("checked")
        } else {
            data1.indexOf(e.target.value);
            data1.splice(data1.indexOf(e.target.value), 1);
            e.target.parentElement.classList.remove("checked")
        }
        setHealth(data1)
        console.log(data1)
    }
    dietLabels = ""
        if(diet.length == 0){
            dietLabels = "";
        }else{
            for (let i = 0; i < diet.length; i++) {
                dietLabels = dietLabels + "&diet=" + diet[i];
            }
        }
    healths = ""
    if(health.length == 0){
        for (let i = 0; i < health.length; i++) {
            healths = healths + "&health=" + healths[i];
        }
    }
    return (
        <div className="filter">
            <h2>Filter</h2>
            
                <div className="filter-section">
                    <div id="calories" className="filter-section-body">
                        <label>Calories</label>
                        <input id="from" placeholder="From" value={cal.from} onChange={(e) => {setCal({ from: e.target.value, to: cal.to })}}></input>
                        <input id="to" placeholder="To" value={cal.to} onChange={(e) => {setCal({ from: cal.from, to: e.target.value })}}></input>
                    </div>
                    <div id="ingredients" className="filter-section-body">
                        <label>Ingredients</label>
                        <input
                            id="num-of-ingredients"
                            placeholder="Up to"
                        ></input>
                    </div>
                </div>
                <div id="diets" className="filter-section">
                    <div className="diet-choice">
                        <label>Diets</label>
                        <div className="filter-section-grid">
                            <label className="checkbox-label">
                                Vegetarian
                                <input type="checkbox" id="vegetarian" value="vegetarian" onChange={checkHealth}></input>
                            </label>
                            <label className="checkbox-label">
                                Vegan
                                <input type="checkbox" id="vegan" value="vegan" onChange={checkHealth}></input>
                            </label>
                            <label className="checkbox-label">
                                Paleo
                                <input type="checkbox" id="paleo" value="paleo" onChange={checkHealth}></input>
                            </label>
                            <label className="checkbox-label">
                                High-Fiber
                                <input type="checkbox" id="high-fiber" value="high-fiber" onChange={checkbox}></input>
                            </label>

                            <label className="checkbox-label">
                                High-Protein
                                <input
                                    type="checkbox"
                                    id="high-protein"
                                    value="high-protein" onChange={checkbox}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Carb
                                <input type="checkbox" id="low-carb" value="low-carb" onChange={checkbox}></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Fat
                                <input type="checkbox" id="low-fat" value="low-fat" onChange={checkbox}></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Sodium
                                <input type="checkbox" id="low-sodium" value="low-sodium" onChange={checkbox}></input>
                            </label>

                            <label className="checkbox-label">
                                Low-Sugar
                                <input type="checkbox" id="low-sugar" value="low-sugar" onChange={checkHealth}></input>
                            </label>
                            <label className="checkbox-label">
                                Alcohol-Free
                                <input
                                    type="checkbox"
                                    id="alcohol-free"
                                    value="alcohol-free" onChange={checkHealth}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Balanced
                                <input type="checkbox" id="balanced" value="balanced" onChange={checkbox}></input>
                            </label>
                            <label className="checkbox-label">
                                Immunity
                                <input type="checkbox" id="immunity" value="immunity" onChange={checkHealth}></input>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="submit">
                    <input type="submit" value="APPLY" formMethod="" onClick={() => onSubmit(calories,dietLabels,healths)}></input>
                </div>
                
        </div>
    );
}
