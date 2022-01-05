import React from "react";
import test from "../img/bg.jpg";
import { recipes } from "./fakedata";

const Recipe = ({ recipeName, recipeImage, recipeId, url }) => {
    // var recipeName = "";
    // var recipeImage = "";
    // var placeId = "";
    // if (null === sessionStorage.getItem("findInCommunity")) {
    //     recipeName = recipe.recipe.label;
    //     recipeImage = recipe.recipe.image;
    //     placeId = recipe._links.self.href.split("v2/")[1];
    // } else {
    //     recipeName = recipe.foodName;
    //     recipeImage = test;
    //     placeId = recipe.foodId;
    // }
    return (
        <a href={"/" + url + "/" + recipeId} className="recipe-href">
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
