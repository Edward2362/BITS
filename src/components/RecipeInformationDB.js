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
import logo from "../img/Restcipe-4.svg";

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
    const [done, setDone] = useState(false);

    var endPoint = "/foodPlace/";
    var endPoint2 = "/customer/customerFoodIn/";
    var endPoint3 = "/customer/customerFoodInArray";
    var endPoint6 = "/customer/removeFavoriteRecipe";

    var endPoint4 = "/commentsAvoid/";

    var endPoint5 = "/avoidComment";
    var endPoint7 = "/customer/";
    
    const [favourite, setFavourite] = useState(false);

    const [customerStop, setCustomerStop] = useState(false);

    const [recipeData, setRecipeData] = useState({
        foodName: "",
        foodImage: "",
        foodId: "",
        foodDiets: [{ dietName: "" }],
        foodIngredients: [{ ingredientName: "", ingredientAmount: "" }],
        foodSteps: [
            {
                stepDescription: "",
            },
        ],
        customerId: "",
    });

    const [avoid, setAvoid] = useState([]);

    const [commentDescription, setCommentDescription] = useState("");

    const [customer, setCustomer] = useState({
        customerId: "",
        fullName: "",
        food: [],
        lastName: "",
        firstName: "",
        customerImage: "",
    });

    const [creator, setCreator] = useState({
        customerId: "",
        fullName: "",
        food: [],
        lastName: "",
        firstName: "",
        customerImage: "",
    });

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
                        .then((response2) => response2.json())
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
                setTimeout(setDone(true), 3000);
            });
    };

    const placeLoad = () => {
        fetch(endPoint4 + id)
            .then((response) => response.json())
            .then((data) => {
                setAvoid(data[0].result);
            });
    };

    const customerLoad = () => {
        fetch(endPoint7 + window.sessionStorage.getItem("userID"))
            .then((response) => response.json())
            .then((data) => {
                setCustomer(data[0]);
            });
    };

    const creatorLoad = () => {
        fetch(endPoint7 + recipeData.customerId)
        .then((response) => response.json())
        .then((data) => {
            setCreator(data[0]);
            setCustomerStop(true);
        });
    }

    if("" !== recipeData.foodId){
        if(customerStop){

        }else{
            creatorLoad();
        }
    }

    const isFavourite = () => {
        if (null === window.sessionStorage.getItem("userID")) {
            navigate("/Signin");
            prop.renew();
        } else {
            if (favourite) {
                fetch(endPoint6, {
                    method: "POST",
                    headers: {
                        "x-access-token":
                            window.sessionStorage.getItem("userToken"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        foodId: recipeData.foodId,
                        customerId: window.sessionStorage.getItem("userID"),
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (undefined !== data[0].invalid) {
                        } else {
                            setFavourite(false);
                        }
                    });
            } else {
                fetch(endPoint3, {
                    method: "POST",
                    headers: {
                        "x-access-token":
                            window.sessionStorage.getItem("userToken"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        foodId: recipeData.foodId,
                        customerId: window.sessionStorage.getItem("userID"),
                        foodName: recipeData.foodName,
                        foodImage: recipeData.foodImage,
                        provider: "customers",
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (undefined !== data[0].invalid) {
                        } else {
                            setFavourite(true);
                        }
                    });
            }
        }
    };

    const commentPost = () => {
        var commentDate = new Date();

        if (null === window.sessionStorage.getItem("userID")) {
            navigate("/Signin");
            prop.renew();
        } else {
            fetch(endPoint5, {
                method: "POST",
                headers: {
                    "x-access-token":
                        window.sessionStorage.getItem("userToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    commentDescription: commentDescription,
                    customerId: window.sessionStorage.getItem("userID"),
                    foodId: recipeData.foodId,
                    customerLastName: customer.lastName,
                    customerFirstName: customer.firstName,
                    commentDate: commentDate,
                    customerImage: customer.customerImage,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (undefined !== data[0].invalid) {
                    } else {
                        setAvoid(data[0].result);
                        setCommentDescription("");
                    }
                });
        }
    };

    useEffect(() => {
        load();
        placeLoad();
        customerLoad();
    }, []);

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
                            {!done ? (
                                <div className="loading-holder">
                                    <img src={logo}></img>
                                    <div className="loading"></div>
                                </div>
                            ) : (
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
                                                <img src={creator.customerImage}></img>
                                            </div>
                                            <div className="creator-name">
                                                {/* Fix to user name and avatar */}
                                                <p>{creator.firstName + " " + creator.lastName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="recipe-detail-section">
                                        <div className="recipe-detail-content">
                                            <div className="sn-body-equal-half">
                                                <div className="recipe-detail-img">
                                                    <img src={recipeData.foodImage}></img>
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
                                                                        key={
                                                                            index
                                                                        }
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
                                                        onClick={isFavourite}
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
                                                <textarea
                                                    value={commentDescription}
                                                    onChange={(e) => {
                                                        setCommentDescription(
                                                            e.target.value
                                                        );
                                                    }}
                                                ></textarea>
                                                <button
                                                    className="btn-cmt"
                                                    onClick={commentPost}
                                                    disabled={
                                                        commentDescription ===
                                                        ""
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    Post your comment
                                                </button>
                                            </div>
                                            <h2>
                                                {avoid.length + " Comments "}
                                            </h2>
                                            <div className="recipe-comments-content">
                                                {avoid.map(
                                                    (avoidPlace, index) => (
                                                        <Comment
                                                            key={index}
                                                            comment={avoidPlace}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeInformationDB;
