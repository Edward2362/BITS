import React, { useEffect, useState } from "react";
import test from "../img/bg.jpg";
import Ingredient from "./Ingredient";
import Step from "./Step";
import edamam from "../img/edamam-logo.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const RecipeInformationDB = (prop) => {
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

    let { id } = useParams();
    let navigate = useNavigate();

    var endPoint = "http://localhost:9000/foodPlace/";
    var endPoint2 = "http://localhost:9000/customer/customerFoodIn/";

    const [favourite, setFavourite] = useState(false);

    const [recipeData, setRecipeData] = useState({
        foodName: "Chicken Nugget",
        foodDiets: [
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
            { dietName: "Vegetarian" },
        ],
        foodIngredients: [
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
            { ingredientName: "olive oil", ingredientAmount: "1/2 cup" },
        ],
        foodSteps: [
            {
                stepDescription:
                    "Remove pork blood from its container by cutting the seal between the pork blood and container with a long knife. Gently tilt container sideway to slide out pork blood into a large bowl then cut into cubes. Fill a small pot with 2-3 inches of water. Add salt, shallot and ginger. Heat pot to a low simmer. Add pork blood and cook for one hour. The low heat will prevent a honeycomb texture. After one hour, drain and rinse pork blood with cold running water. Store cooked pork blood in water and set aside.",
            },
            {
                stepDescription:
                    "Remove pork blood from its container by cutting the seal between the pork blood and container with a long knife. Gently tilt container sideway to slide out pork blood into a large bowl then cut into cubes. Fill a small pot with 2-3 inches of water. Add salt, shallot and ginger. Heat pot to a low simmer. Add pork blood and cook for one hour. The low heat will prevent a honeycomb texture. After one hour, drain and rinse pork blood with cold running water. Store cooked pork blood in water and set aside.",
            },
            {
                stepDescription:
                    "Remove pork blood from its container by cutting the seal between the pork blood and container with a long knife. Gently tilt container sideway to slide out pork blood into a large bowl then cut into cubes. Fill a small pot with 2-3 inches of water. Add salt, shallot and ginger. Heat pot to a low simmer. Add pork blood and cook for one hour. The low heat will prevent a honeycomb texture. After one hour, drain and rinse pork blood with cold running water. Store cooked pork blood in water and set aside.",
            },
        ],
    });

    const [avoid, setAvoid] = useState([]);

    const load = () => {
        fetch(endPoint + id)
            .then((response) => response.json())
            .then((data) => {
                if (null !== window.sessionStorage.getItem("userID")) {
                    fetch(
                        endPoint2 +
                            window.sessionStorage.getItem("userID") +
                            "/" +
                            id,
                        {
                            method: "GET",
                            headers: {
                                "x-access-token":
                                    window.sessionStorage.getItem("userToken"),
                            },
                        }
                    )
                        .then((response) => response.json())
                        .then((placeData) => {
                            if (undefined !== placeData[0].invalid) {
                                navigate("/");
                                prop.renew();
                            } else {
                                if (undefined === placeData[0].customer) {
                                    setFavourite(true);
                                } else {
                                    setFavourite(false);
                                }
                                setRecipeData(data[0].result);
                            }
                        });
                } else {
                    setRecipeData(data[0].result);
                }
            });
    };

    useEffect(load, []);

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
                                    <h1>{recipeData.foodName}</h1>
                                    <div className="diets">
                                        {recipeData.foodDiets.map(
                                            (diet, index) => (
                                                <p key={index}>
                                                    {diet.dietName}
                                                </p>
                                            )
                                        )}
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
                                                        {recipeData.foodIngredients.map(
                                                            (
                                                                ingredient,
                                                                index
                                                            ) => (
                                                                <Ingredient
                                                                    key={index}
                                                                    ingredientName={
                                                                        ingredient.ingredientName
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
                                            {recipeData.foodSteps.map(
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
                                        <h2>{avoid.length + " Comments "}</h2>
                                        <div className="recipe-comments-content">
                                            {avoid.map((avoidPlace, index) => (
                                                <Comment
                                                    key={index}
                                                    comment={avoidPlace}
                                                />
                                            ))}
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

export default RecipeInformationDB;
