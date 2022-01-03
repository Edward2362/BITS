import React, { useEffect, useState } from "react";
import test from "../img/bg.jpg";

const RecipeInformationDB = () => {
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

    const [recipeData, setRecipeData] = useState({
        name: "Chicken Nugget",
        ingredients: ["1/2 cup olive oil", "5 cloves garlic, peeled"],
        steps: [],
        comments: [
            {
                userName: "Hao",
                date: "1/1/2021",
                information: "Look good!",
            },
            {
                userName: "Hao",
                date: "1/1/2021",
                information: "Look good!",
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
                                    <div className="recipe-detail-content">
                                        <div className="sn-body-equal-half">
                                            <div className="recipe-detail-img">
                                                <img src={test}></img>
                                            </div>
                                        </div>
                                        <div className="sn-body-equal-half">
                                            <div className="">
                                                Hello đang ở Database nha
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeInformationDB;
