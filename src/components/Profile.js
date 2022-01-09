import React from "react";
import Recipe from "./Recipe";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import logo from "../img/Restcipe-4.svg";

const Profile = (prop) => {
    let navigate = useNavigate();
    var endPoint = "http://localhost:9000/customerFood/";


















    var endPoint2 = "http://localhost:9000/customer/";
    var endPoint3 = "http://localhost:9000/customer/customerUpdate";
    


    const [createdRecipeList, setCreatedRecipeList] = useState([]);
    const [customer, setCustomer] = useState({
        customerId: "",
        fullName: "",
        food: [],
        lastName: "",
        firstName: "",
        customerImage: "",
    });
    const [done, setDone] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);


    const [place, setPlace] = useState(true);
    var source = customer.customerImage;

    const customerAvoid = () => {

        
        















































        fetch(endPoint3, {
            method: "POST",
            headers: {
                "x-access-token": window.sessionStorage.getItem("userToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({customerImage: source, customerId: customer.customerId})
        }).then(response=>response.json())
        .then(data => {

            
            setPlace(true);
            setCustomer(data[0].result);
            window.location.reload();
        });
    };

    if (selectedFile === null) {
    } else {
        
        






































































































































        if (place) {

        } else {
            source = selectedFile.profileImg;
            customerAvoid();
        }
    }
    var imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setSelectedFile({ profileImg: reader.result });
                setPlace(false);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

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
                        setTimeout(setDone(true), 3000);
                    });
            });
    };






















































































































































































































































    





























    

    useEffect(load, [endPoint, endPoint2, navigate, prop]);

    return (
        <>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <div className="avatar-section">
                            <div className="ava-border">
                                <img
                                    src={source}
                                    alt="default avatar"
                                ></img>
                                <div className="change-avatar">
                                    <input type="file" id="new-avatar" onChange={imageHandler}></input>
                                    <label htmlFor="new-avatar">
                                        <BiEdit />
                                    </label>
                                </div>
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
                            {!done ? (
                                <div className="loading-holder">
                                    <img src={logo} alt="loading-gif"></img>
                                    <div className="loading"></div>
                                </div>
                            ) : (
                                <div className="profile-body">
                                    <div className="profile-section">
                                        <h1>Created Recipes</h1>
                                        <div className="results-section">
                                            {createdRecipeList.length === 0 ? (
                                                <div className="notification">
                                                    You have not created any
                                                    recipe yet!
                                                </div>
                                            ) : (
                                                <div className="grid-25">
                                                    {createdRecipeList.map(
                                                        (recipe, index) => (
                                                            <div
                                                                className="created-recipe"
                                                                key={index}
                                                            >
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
                                                                    key={
                                                                        recipe.foodId
                                                                    }
                                                                    recipeName={
                                                                        recipe.foodName
                                                                    }
                                                                    recipeImage={
                                                                        recipe.foodImage
                                                                    }
                                                                    recipeId={
                                                                        recipe.foodId
                                                                    }
                                                                    url="Recipe-Restcipe"
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="profile-section">
                                        <h1>Favorite Recipes</h1>
                                        <div className="results-section">
                                            {customer.food.length === 0 ? (
                                                <div className="notification">
                                                    Your favourite list is
                                                    empty!
                                                </div>
                                            ) : (
                                                <div className="grid-25">
                                                    {customer.food.map(
                                                        (recipe) => {
                                                            var recipeName =
                                                                recipe.foodName;
                                                            var recipeImage =
                                                                recipe.foodImage;
                                                            var recipeId =
                                                                recipe.foodId;
                                                            var recipeURL = "";
                                                            if (
                                                                recipe.provider ===
                                                                "edamam"
                                                            ) {
                                                                recipeURL =
                                                                    "Recipe-Edamam";
                                                            } else {
                                                                recipeURL =
                                                                    "Recipe-Restcipe";
                                                            }

                                                            return (
                                                                <Recipe
                                                                    key={
                                                                        recipe.foodId
                                                                    }
                                                                    recipeName={
                                                                        recipeName
                                                                    }
                                                                    recipeImage={
                                                                        recipeImage
                                                                    }
                                                                    recipeId={
                                                                        recipeId
                                                                    }
                                                                    url={
                                                                        recipeURL
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
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

export default Profile;
