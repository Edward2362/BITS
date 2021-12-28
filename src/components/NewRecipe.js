import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export const NewRecipe = (prop) => {
    


    let navigate = useNavigate();
    var endPoint = "";
    var endPoint2 = "";
    const [ingredientList, setIngredientList] = useState([
        { ingredientName: "", ingredientAmount: "" },
    ]);



    








    
    const [calories, setCalories] = useState("");
    const [name, setName] = useState("");
    const [stepList, setStepList] = useState([{  stepDescription: "" }]);






    const [foodId, setFoodId] = useState("");
    const [customerId, setCustomerId] = useState("");
    
    








    if (null !== window.sessionStorage.getItem("userID")) {

    } else {
        navigate('/signin');
        prop.renew();
    }


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










   











    const placeRecipe = () => {
        fetch(endPoint, {
            method: "POST",
            headers: {
                "x-access-token": window.sessionStorage.getItem("userToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({foodCalories: calories, foodName: name, foodSteps: stepList, foodIngredients: ingredientList, customerId: window.sessionStorage.getItem("userID")})
        }).then(response=>response.json())
        .then(data => {
            if (undefined !== data[0].invalid) {

            } else {

            }
        });
        




        

        




        if (null === window.sessionStorage.getItem("")) {

        } else {
            

            




            

            


















            fetch(endPoint2, {
                method: "POST",
                headers: {
                    "x-access-token": window.sessionStorage.getItem("userToken"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({foodId: foodId, foodCalories: calories, foodName: name, foodSteps: stepList, foodIngredients: ingredientList, customerId: customerId})
            }).then(response=> response.json())
            .then(data => {
                



                if (undefined !== data[0].invalid) {

                } else {
                    
                }
            });
        }
    }; 








    



    
    
    const load = () => {
        if (null === window.sessionStorage.getItem("")) {

        } else {
            fetch(endPoint2)
            .then(response=>response.json())
            .then(data => {
                
                setFoodId(data[0].result.foodId);
                


                setCalories(data[0].result.foodCalories);
                setName(data[0].result.foodName);
                
                setStepList(data[0].result.foodSteps);
                
                

                








                setIngredientList(data[0].result.foodIngredients);
                setCustomerId(data[0].result.customerId);
            });
        }
    };

    useEffect(
        load
    , []);

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
                        onChange={(e) => {setName(e.target.value)}}
                    ></input>
                </div>
                <div className="new-res-body">
                    <label>Calories</label>
                    <input id="Calories" placeholder="Calories" value={calories} onChange={(e) => {setCalories(e.target.value)}}></input>
                    
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
