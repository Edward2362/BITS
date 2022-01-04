import React from "react";
import test from "../img/bg.jpg";

const Recipe = ({ recipe }) => {
    return (
        <a href="#" className="recipe-href">
            <div className="recipe-card">
                <div className="recipe-img">
                    <img src={recipe.recipe.image}></img>
                </div>
                <div className="recipe-card-body">
                    <div className="recipe-information">
                        <p>{recipe.recipe.label}</p>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Recipe;
