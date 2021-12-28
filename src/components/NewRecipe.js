import React from "react";
import { useState } from "react";

export const NewRecipe = () => {
    const [ingredientList, setIngredientList] = useState([
        { ingredientName: "", ingredientAmount: "" },
    ]);

    const [stepList, setStepList] = useState([{  stepDescription: "" }]);

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredientList];
        list[index][name] = value;
        setIngredientList(list);
    };

    const handleRemoveClickIngredient = (index) => {
        const list = [...ingredientList];
        list.splice(index, 1);
        setIngredientList(list);
    };

    const handleAddClickIngredient = () => {
        setIngredientList([
            ...ingredientList,
            { ingredientName: "", ingredientAmount: "" },
        ]);
    };

    const handleStepChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...stepList];
        list[index][name] = value;
        setStepList(list);
    };

    const handleRemoveClickStep = (index) => {
        const list = [...stepList];
        list.splice(index, 1);
        setStepList(list);
    };

    const handleAddClickStep = () => {
        setStepList([...stepList, {  stepDescription: "" }]);
    };

    return (
        <div className="new-res">
            <h2>Information</h2>
            <div className="new-res-section">
                <div className="new-res-body">
                    <label>Name</label>
                    <input
                        className="new-res-name"
                        placeholder="Name of your recipe"
                    ></input>
                </div>
                <div className="new-res-body">
                    <label>Calories</label>
                    <input id="from" placeholder="From"></input>
                    <input id="to" placeholder="To"></input>
                </div>

                <div className="new-res-body">
                    <label className="ingre-label">Ingredients</label>

                    {ingredientList.map((x, i) => {
                        return (
                            <div className="ingredient">
                                <input
                                    name="ingredientName"
                                    id="ingredient-name"
                                    placeholder="Name"
                                    value={x.ingredientName}
                                    onChange={(e) =>
                                        handleIngredientChange(e, i)
                                    }
                                />
                                <input
                                    name="ingredientAmount"
                                    id="ingredient-amount"
                                    placeholder="Amount"
                                    value={x.ingredientAmount}
                                    onChange={(e) =>
                                        handleIngredientChange(e, i)
                                    }
                                />
                                <div className="btn-box">
                                    {ingredientList.length !== 1 && (
                                        <button
                                            className="btn-remove"
                                            onClick={() =>
                                                handleRemoveClickIngredient(i)
                                            }
                                        >
                                            -
                                        </button>
                                    )}
                                    {ingredientList.length - 1 === i && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAddClickIngredient}
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {/* <div style={{ marginTop: 20 }}>
                        {JSON.stringify(ingredientList)}
                    </div> */}
                </div>

                <div className="new-res-body">
                    <label className="step-label">Steps</label>
                    {stepList.map((y, i) => {
                        return (
                            <div className="step">
                                <textarea
                                    name="stepDescription"
                                    id="step-desc"
                                    value={y.stepDescription}
                                    onChange={(e) => handleStepChange(e, i)}
                                ></textarea>
                                <div className="btn-box-step">
                                    {stepList.length !== 1 && (
                                        <button
                                            className="btn-remove"
                                            onClick={() =>
                                                handleRemoveClickStep(i)
                                            }
                                        >
                                            -
                                        </button>
                                    )}
                                    {stepList.length - 1 === i && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAddClickStep}
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {/* <div style={{ marginTop: 20 }}>
                        {JSON.stringify(stepList)}
                    </div> */}
                </div>
            </div>

            <div className="btn-submit">
                <input type="submit" value="Create"></input>
            </div>
        </div>
    );
};
