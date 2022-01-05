import React from "react";

const Ingredient = ({ ingredient, position }) => {
    return (
        <div className="ingredient">
            <div className="ingredient-content">
                <p>{position + "."}</p>
                <p>{ingredient.ingredientName}</p>
            </div>
            <hr></hr>
        </div>
    );
};

export default Ingredient;
