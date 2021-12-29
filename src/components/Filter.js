import React from "react";
import { choose } from "../functionsJS/checkbox";

export const Filter = ({ findByCourse }) => {
    return (
        <div className="filter">
            <div className="filter-header">
                <h2>Filter</h2>
                <label className="checkbox-label" onChange={choose}>
                    By Courses
                    <input
                        type="checkbox"
                        id="vegetarian"
                        onClick={findByCourse}
                    ></input>
                </label>
            </div>
            <form>
                <div className="filter-section">
                    <div id="calories" className="filter-section-body">
                        <label>Calories</label>
                        <input id="from" placeholder="From"></input>
                        <input id="to" placeholder="To"></input>
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
                        <div className="filter-section-grid" onChange={choose}>
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
                    <input type="submit" value="APPLY" formMethod=""></input>
                </div>
            </form>
        </div>
    );
};
