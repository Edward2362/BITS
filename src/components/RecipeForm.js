import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { choose } from "../functionsJS/checkbox";

export const RecipeForm = (prop) => {
    let navigate = useNavigate();
    var endPoint = "http://localhost:9000/food";
    var endPoint2 = "http://localhost:9000/foodUpdate";
    var endPoint3 = "http://localhost:9000/food";
    var endPoint4 = "http://localhost:9000/foodPlace";
    const [ingredientList, setIngredientList] = useState([
        { ingredientName: "", ingredientAmount: "" },
    ]);
    const [diets, setDiets] = useState([]);

    const [calories, setCalories] = useState("");
    const [name, setName] = useState("");
    const [stepList, setStepList] = useState([{ stepDescription: "" }]);

    const [foodId, setFoodId] = useState("");
    const [customerId, setCustomerId] = useState("");

    const [existedRecipe, setExistedRecipe] = useState(false);

    if (null !== window.sessionStorage.getItem("userID")) {
    } else {
        navigate("/signin");
        prop.renew();
    }

    const handleChoose = (e) => {
        if (e.target.checked) {
            e.target.parentElement.classList.add("checked");
            setDiets([...diets, e.target.value]);
        } else {
            e.target.parentElement.classList.remove("checked");
            setDiets(diets.filter((diet) => diet !== e.target.value));
        }
    };

    const handleCheckedDiet = () => {
        var checkboxs = document.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < checkboxs.length; i++) {
            if (diets.includes(checkboxs[i].value)) {
                checkboxs[i].checked = true;
            }
        }
    };

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
        setStepList([...stepList, { stepDescription: "" }]);
    };

    const addOrUpdatedRecipe = () => {
        if (null === window.sessionStorage.getItem("Existed")) {
            fetch(endPoint, {
                method: "POST",
                headers: {
                    "x-access-token":
                        window.sessionStorage.getItem("userToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    foodCalories: calories,
                    foodName: name,
                    foodSteps: stepList,
                    foodIngredients: ingredientList,
                    customerId: window.sessionStorage.getItem("userID"),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (undefined !== data[0].invalid) {
                    } else {
                        navigate("/Profile");
                        prop.renew();
                    }
                });
        } else {
            fetch(endPoint2, {
                method: "POST",
                headers: {
                    "x-access-token":
                        window.sessionStorage.getItem("userToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    foodId: foodId,
                    foodCalories: calories,
                    foodName: name,
                    foodSteps: stepList,
                    foodIngredients: ingredientList,
                    customerId: customerId,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (undefined !== data[0].invalid) {
                    } else {
                        navigate("/Profile");
                        prop.renew();
                    }
                });
        }
    };

    const load = () => {
        if (null === window.sessionStorage.getItem("Existed")) {
        } else {
            fetch(endPoint4 + "/" + sessionStorage.getItem("Existed"))
                .then((response) => response.json())
                .then((data) => {
                    setFoodId(data[0].result.foodId);

                    setCalories(data[0].result.foodCalories);
                    setName(data[0].result.foodName);

                    setStepList(data[0].result.foodSteps);

                    setIngredientList(data[0].result.foodIngredients);
                    setCustomerId(data[0].result.customerId);
                });
        }
    };

    const checkExisted = () => {
        sessionStorage.getItem("Existed") === null
            ? setExistedRecipe(false)
            : setExistedRecipe(true);
    };

    const handleEffect = () => {
        handleCheckedDiet();
        choose();
        checkExisted();
        load();
    };

    const deleteRecipe = () => {
        fetch(endPoint3, {
            method: "DELETE",
            headers: {
                "x-access-token": window.sessionStorage.getItem("userToken"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                foodId: foodId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (undefined !== data[0].invalid) {
                } else {
                    navigate("/Profile");
                    prop.renew();
                }
            });
    };
    useEffect(handleEffect, []);

    return (
        <div className="new-res">
            <h2>Information</h2>
            <div className="new-res-section">
                <div className="new-res-body">
                    <label>Name</label>
                    <input
                        className="new-res-name"
                        placeholder="Name of your recipe"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="new-res-body">
                    <label>Calories</label>
                    <input
                        id="Calories"
                        placeholder="Calories"
                        value={calories}
                        onChange={(e) => {
                            setCalories(e.target.value);
                        }}
                    ></input>
                </div>

                <div className="new-res-body">
                    <label className="ingre-label">Ingredients</label>

                    {ingredientList.map((x, i) => {
                        return (
                            <div className="ingredient" key={i}>
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
                    <div className="diet-choice">
                        <label>Diet</label>
                        <div className="grid-25">
                            <label className="checkbox-label">
                                Vegetarian
                                <input
                                    type="checkbox"
                                    id="vegetarian"
                                    value="vegetarian"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Vegan
                                <input
                                    type="checkbox"
                                    id="vegan"
                                    value="vegan"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Paleo
                                <input
                                    type="checkbox"
                                    id="paleo"
                                    value="paleo"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                High-Fiber
                                <input
                                    type="checkbox"
                                    id="high-fiber"
                                    value="high-fiber"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>

                            <label className="checkbox-label">
                                High-Protein
                                <input
                                    type="checkbox"
                                    id="high-protein"
                                    value="high-protein"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Carb
                                <input
                                    type="checkbox"
                                    id="low-carb"
                                    value="low-carb"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Fat
                                <input
                                    type="checkbox"
                                    id="low-fat"
                                    value="low-fat"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Low-Sodium
                                <input
                                    type="checkbox"
                                    id="low-sodium"
                                    value="low-sodium"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>

                            <label className="checkbox-label">
                                Low-Sugar
                                <input
                                    type="checkbox"
                                    id="low-sugar"
                                    value="low-sugar"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Alcohol-Free
                                <input
                                    type="checkbox"
                                    id="alcohol-free"
                                    value="alcohol-free"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Balanced
                                <input
                                    type="checkbox"
                                    id="balanced"
                                    value="balanced"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                            <label className="checkbox-label">
                                Immunity
                                <input
                                    type="checkbox"
                                    id="immunity"
                                    value="immunity"
                                    onChange={(e) => handleChoose(e)}
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="new-res-body">
                    <label className="step-label">Steps</label>
                    {stepList.map((y, i) => {
                        return (
                            <div className="step" key={i}>
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

            {existedRecipe ? (
                <div className="btns">
                    <div className="btn-submit">
                        <input
                            type="submit"
                            value="Update"
                            onClick={addOrUpdatedRecipe}
                        ></input>
                    </div>

                    <div className="btn-delete">
                        <input
                            type="submit"
                            value="Delete"
                            onClick={deleteRecipe}
                        ></input>
                    </div>
                </div>
            ) : (
                <div className="btns">
                    <div className="btn-submit">
                        <input
                            type="submit"
                            value="Create"
                            onClick={addOrUpdatedRecipe}
                        ></input>
                    </div>
                </div>
            )}
        </div>
    );
};
