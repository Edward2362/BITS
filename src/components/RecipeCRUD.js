import React from "react";
import { RecipeForm } from "./RecipeForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateRecipe = (prop) => {
    const [existedRecipe, setExistedRecipe] = useState(false);

    const checkExisted = () => {
        sessionStorage.getItem("Existed") === null
            ? setExistedRecipe(false)
            : setExistedRecipe(true);
    };

    useEffect(checkExisted, []);

    return (
        <>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <h1>{existedRecipe ? "Update" : "New"} Recipe</h1>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <RecipeForm
                                renew={() => {
                                    prop.renew();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRecipe;
