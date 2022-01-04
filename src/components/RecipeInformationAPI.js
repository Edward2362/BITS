import React, { useEffect, useState } from "react";
import test from "../img/bg.jpg";
import Ingredient from "./Ingredient";
import Step from "./Step";
import edamam from "../img/edamam-logo.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Comment from "./Comment";

const RecipeInformationAPI = () => {
    // test
    // var endPoint =
    //     "https://api.edamam.com/api/recipes/v2/b79327d05b8e5b838ad6cfd9576b30b6?type=public&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe";
    // const [name, setName] = useState("");
    // const [img, setImg] = useState("");
    // const [ingredient, setIngredient] = useState([]);
    // const [test, setTest] = useState({ name: "", list: [] });
    // let fetched = [];
    // const load = () => {
    //     fetch(endPoint)
    //         .then((response) => response.json())
    //         .then((fetchResult) => {
    //             fetched = fetchResult.recipe;
    //             console.log(fetched);
    //             setName(fetched.label);
    //             console.log("name", name);
    //             setImg(fetched.image);
    //             console.log("image", img);
    //             setIngredient(fetched.ingredientLines);
    //             console.log("ingredient", ingredient);
    //         });
    //     setTest({ name: "123", list: [123, 123] });
    // };
    // const load2 = () => {
    //     console.log("test", test);
    // };
    // const load3 = () => {
    //     load();
    //     load2();
    // };
    // useEffect(load3, []);

    const [favourite, setFavourite] = useState(false);
    const [recipeData, setRecipeData] = useState({
        name: "Chicken Nugget",
        diets: [
            "Vegan",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
            "Vegetarian",
        ],
        ingredients: [
            "1/2 cup olive oil",
            "5 cloves garlic, peeled",
            "5 cloves garlic, peeled",
            "5 cloves garlic, peeled",
            "5 cloves garlic, peeled",
            "5 cloves garlic, peeled",
            "5 cloves garlic, peeled",
            "5 cloves garlic, peeled",
            "5 cloves garlic, peeled",
        ],
        steps: [
            "Clean the bones and meat: To a large stock pot, add bones and boneless shanks (do not include the Vietnamese ham!) and 2 teaspoons salt. Cover with water and heat on high. When pot reaches a rolling boil and impurities float to the top, turn off heat. Place a colander in the sink and drain the contents of the pot into the colander. Thoroughly rinse bones/meat under cold running water and drain dry. If using boneless pork shank, wrap up meat into a tight bundle with twine. This will make it easier to slice when it's finished cooking. Wash the pot thoroughly and return it to the stove. Transfer parboiled bones/meat to pot and fill with water (4 liters). Add lemongrass bundle, white/yellow onions, ginger, and pineapple. Heat on medium-high/low simmer for 2 to 2-1/2 hours. Occasionally skim surface of the stock to keep it clear.",
            "Remove pork blood from its container by cutting the seal between the pork blood and container with a long knife. Gently tilt container sideway to slide out pork blood into a large bowl then cut into cubes. Fill a small pot with 2-3 inches of water. Add salt, shallot and ginger. Heat pot to a low simmer. Add pork blood and cook for one hour. The low heat will prevent a honeycomb texture. After one hour, drain and rinse pork blood with cold running water. Store cooked pork blood in water and set aside.",
            "Back to the stock pot: After one and a half hour of cooking, check the boneless shank for doneness by piercing it with a chopstick. It's done when chopstick pierces easily and water runs clear. Remove and discard all bones, but if you are using knuckles and hocks, do not discard. They are commonly used as a meaty topping. Transfer all knuckles, hocks to an iced bath to cool. Leave the other aromatics in the stock pot for now. When knuckles, hocks and boneless shanks are cooled completely, remove them from the iced bath. For boneless shanks, cut them into thin circular slices and set aside. For any large hocks and knuckles that are too big, cut them into bite-size pieces and set aside. Continue to cook the stock with the aromatics for another 30-45 minutes on a low simmer.",
        ],
        comments: [
            {
                userName: "Hao",
                date: "1/1/2021",
                information:
                    "Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good! Look good!",
            },
            {
                userName: "Quang",
                date: "2/1/2021",
                information: "Look great!",
            },
        ],
    });

    return (
        <>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <h1>Recipe</h1>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <div className="recipe-detail-body">
                                <div className="recipe-detail-section">
                                    <h1>{recipeData.name}</h1>
                                    <div className="diets">
                                        {recipeData.diets.map((diet, index) => (
                                            <p key={index}>{diet}</p>
                                        ))}
                                    </div>
                                    <div className="creator">
                                        <div className="creator-avatar">
                                            <img src={edamam}></img>
                                        </div>
                                        <div className="creator-name">
                                            <p>Edamam</p>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="recipe-detail-section">
                                    <div className="recipe-detail-content">
                                        <div className="sn-body-equal-half">
                                            <div className="recipe-detail-img">
                                                <img src={test}></img>
                                            </div>
                                        </div>
                                        <div className="sn-body-equal-half">
                                            <div className="recipe-detail-holder">
                                                <div className="recipe-detail-ingredients">
                                                    <h2>Ingredients</h2>
                                                    <div className="recipe-ingredients-content">
                                                        {recipeData.ingredients.map(
                                                            (
                                                                ingredient,
                                                                index
                                                            ) => (
                                                                <Ingredient
                                                                    key={index}
                                                                    ingredient={
                                                                        ingredient
                                                                    }
                                                                    position={
                                                                        index +
                                                                        1
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="recipe-detail-favourite-button"
                                                    onClick={() =>
                                                        setFavourite(!favourite)
                                                    }
                                                >
                                                    {favourite ? (
                                                        <FaHeart />
                                                    ) : (
                                                        <FaRegHeart />
                                                    )}
                                                    <p>Love it!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="recipe-detail-section">
                                    <div className="recipe-detail-steps">
                                        <h2>Steps</h2>
                                        <div className="recipe-steps-content">
                                            {recipeData.steps.map(
                                                (step, index) => (
                                                    <Step
                                                        key={index}
                                                        step={step}
                                                        position={index + 1}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="recipe-detail-section">
                                    <div className="recipe-detail-comments">
                                        <div className="user-comment">
                                            {/* <div className="creator-avatar">
                                                <img src={edamam}></img>
                                            </div> */}
                                            <textarea></textarea>
                                            <button className="btn-cmt">
                                                Post your comment
                                            </button>
                                        </div>
                                        <h2>
                                            {recipeData.comments.length +
                                                " Comments "}
                                        </h2>
                                        <div className="recipe-comments-content">
                                            {recipeData.comments.map(
                                                (comment, index) => (
                                                    <Comment
                                                        key={index}
                                                        comment={comment}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeInformationAPI;
