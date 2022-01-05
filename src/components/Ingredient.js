import React from "react";

const Ingredient = ({ ingredientName, position }) => {
    return (
        <div className="ingredient">
            <div className="ingredient-content">
                <p>{position + "."}</p>
                <p>{ingredientName}</p>
            </div>
            <hr></hr>
        </div>
    );
};

export default Ingredient;
