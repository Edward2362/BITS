import React from "react";
import test from "../img/bg.jpg";
import { recipes } from "./fakedata";

const Recipe = ({ recipe, url }) => {
    var recipeName = "";
    var recipeImage = "";
    var apiURL = "";
    if (null === sessionStorage.getItem("findInCommunity")) {
        recipeName = recipe.recipe.label;
        recipeImage = recipe.recipe.image;
        apiURL = recipe._links.self.href.split("v2/")[1];
        console.log(recipe._links.self.href.split("v2/")[1]);
    } else {
        recipeName = recipe.foodName;
        recipeImage = test;
    }
    return (
        <a href={"/" + url + "/" + apiURL} className="recipe-href">
            <div className="recipe-card">
                <div className="recipe-img">
                    <img src={recipeImage}></img>
                </div>
                <div className="recipe-card-body">
                    <div className="recipe-information">
                        <p>{recipeName}</p>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Recipe;
