import React from "react";
import { NewRecipe } from "./NewRecipe";

const CreateRecipe = () => {
    return (
        <>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <h1>New Recipe</h1>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <NewRecipe />
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRecipe;
