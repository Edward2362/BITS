import React from "react";
import Recipe from "./Recipe";
import { recipes } from "./fakedata";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";

const Profile = (prop) => {
    let navigate = useNavigate();
    var endPoint = "http://localhost:9000/customerFood/";

    const [createdRecipeList, setCreatedRecipeList] = useState([]);
    if (null !== sessionStorage.getItem("userID")) {
    } else {
        navigate("/Signin");
        prop.renew();
    }

    const load = () => {
        fetch(endPoint + sessionStorage.getItem("userID"), {
            method: "GET",
            headers: {
                "x-access-token": window.sessionStorage.getItem("userToken"),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCreatedRecipeList(data[0].result);
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
                            <div className="name-bar">Quang Nguyen</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <div className="profile-body">
                                {/* <div className="profile-bio">
                                    <textarea
                                        id="bio-desc"
                                        placeholder="Tell others something about you."
                                    ></textarea>
                                    <div className="update-bio">
                                        <input
                                            className="btn-update-bio"
                                            type="submit"
                                            value="Update"
                                        ></input>
                                    </div>
                                </div> */}
                                <div className="profile-created-recipe">
                                    <h1>Created Recipes</h1>
                                    <div className="recipes-section">
                                        <div className="created-recipe-section-grid">
                                            {createdRecipeList.map((recipe) => (
                                                <div className="">
                                                    <Recipe />
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
                                                            <GrUpdate />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-created-recipe">
                                    <h1>Liked Recipes</h1>
                                    <div className="recipes-section">
                                        <div className="liked-recipe-section-grid">
                                            {recipes.map((recipe) => (
                                                <Recipe
                                                    key={recipe.id}
                                                    recipe={recipe}
                                                />
                                            ))}
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

export default Profile;
