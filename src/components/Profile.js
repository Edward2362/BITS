import React from "react";
import Recipe from "./Recipe";
import { recipes } from "./fakedata";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import test from "../img/bg.jpg";

const Profile = (prop) => {
    let navigate = useNavigate();
    var endPoint = "http://localhost:9000/customerFood/";

    var endPoint2 = "http://localhost:9000/customer/";

    const [createdRecipeList, setCreatedRecipeList] = useState([]);
    const [customer, setCustomer] = useState({
        customerId: "",
        fullName: "",
        food: [],
        lastName: "",
        firstName: "",
    });

    if (null !== sessionStorage.getItem("userID")) {
    } else {
        navigate("/Signin");
        prop.renew();
    }

    const load = () => {
        fetch(endPoint2 + window.sessionStorage.getItem("userID"))
            .then((response) => response.json())
            .then((data) => {
                fetch(endPoint + sessionStorage.getItem("userID"), {
                    method: "GET",
                    headers: {
                        "x-access-token":
                            window.sessionStorage.getItem("userToken"),
                    },
                })
                    .then((response2) => response2.json())
                    .then((placeData) => {
                        if (undefined !== placeData[0].invalid) {
                            navigate("/");
                            prop.renew();
                        } else {
                            setCreatedRecipeList(placeData[0].result);
                            setCustomer(data[0]);
                        }
                    });
            });
    };
    useEffect(load, []);
    return (
        <>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <div className="avatar-section">
                            <div className="ava-border">
                                <img
                                    src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                    alt="default avatar"
                                ></img>
                            </div>
                            <div className="name-bar">
                                {customer.firstName + " " + customer.lastName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <div className="profile-body">
                                <div className="profile-section">
                                    <h1>Created Recipes</h1>
                                    <div className="results-section">
                                        <div className="grid-25">
                                            {createdRecipeList.map((recipe) => (
                                                <div className="created-recipe">
                                                    <div
                                                        className="icon-holder"
                                                        onClick={() => {
                                                            sessionStorage.setItem(
                                                                "Existed",
                                                                recipe.foodId
                                                            );
                                                        }}
                                                    >
                                                        <a href="/AlterRecipe">
                                                            <BiEdit />
                                                        </a>
                                                    </div>
                                                    <Recipe
                                                        key={recipe.foodId}
                                                        recipeName={
                                                            recipe.foodName
                                                        }
                                                        recipeImage={test}
                                                        recipeId={recipe.foodId}
                                                        url="Recipe-Restcipe"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-section">
                                    <h1>Favorite Recipes</h1>
                                    <div className="results-section">
                                        <div className="grid-25">
                                            {customer.food.map((recipe) => (
                                                <Recipe
                                                    key={recipe.id}
                                                    recipe={recipe}
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

export default Profile;
