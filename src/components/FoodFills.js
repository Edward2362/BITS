


import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {choose} from "../functionsJS/checkbox";



export const FoodFills = (prop) => {




    let navigate = useNavigate();
    var endPoint = "http://localhost:9000/food";
    var endPoint2 = "";
    var endPoint3 = "";
    
    const [foodCalories, setFoodCalories] = useState("");
    const [foodName, setFoodName]= useState("");
    const [foodIngredients, setFoodIngredients] = useState({result: [{ingredientName: "", ingredientNum: "", ingredientLast: ""}]});
    const [foodSteps, setFoodSteps] = useState({result: [{stepNum: 0, stepDetail: ""}]});
    const [foodId, setFoodId] = useState("");
    const [customerId, setCustomerId] = useState("");







    if (null !== window.sessionStorage.getItem("userID")) {

    } else {
        



        
        navigate("/Signin");
        prop.renew();
    }

    const ingredientIn = () => {
        var place = foodIngredients.result;
        var placeIngredient = {ingredientName: "", ingredientNum: "", ingredientLast: ""};
        
        place.push(placeIngredient);
        setFoodIngredients({result: place});
    };



    const stepIn = () => {
        var count = 0;
        var place = foodSteps.result;
        var placeStep = {};
        for (let i = 0; i < foodSteps.result.length; ++i) {
            if (count < foodSteps.result[i].stepNum) {
                count = foodSteps.result[i].stepNum;
            }
        }
        count = count + 1;
        placeStep.stepNum = count;
        placeStep.stepDetail = "";
        

        place.push(placeStep);
        setFoodSteps({result: place});
        
    };

    const load = () => {
        
        




























        if (null === window.sessionStorage.getItem("")) {
            fetch(endPoint, {
                method: "POST",
                headers: {
                    "x-access-token": window.sessionStorage.getItem("userToken"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({foodCalories: foodCalories, foodName: foodName, foodIngredients: foodIngredients, foodSteps: foodSteps, customerId: window.sessionStorage.getItem("userID")})
            }).then(response=>response.json())
            .then(data => {
                
                
    
    
    
    
                if (undefined !== data[0].invalid) {
    
                } else {
                    navigate("/");
                    prop.renew();
                }
            });
        } else {
            fetch(endPoint3, {
                method: "POST",
                headers: {
                    "x-access-token": window.sessionStorage.getItem("userToken"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({foodId: foodId, foodCalories: foodCalories, foodName: foodName, foodIngredients: foodIngredients, foodSteps: foodSteps, customerId: customerId})
            }).then(response=>response.json())
            .then(data => {
                if (undefined !== data[0].invalid) {

                } else {
                    navigate("/");
                    prop.renew();
                }
            });
        }
    };









    const placeLoad = () => {
        if (null === window.sessionStorage.getItem("")) {

        } else {
            fetch(endPoint2)
            .then(response=>response.json())
            .then(data => {
                setFoodCalories(data[0].result.foodCalories);
                

                setFoodIngredients({result: data[0].result.foodIngredients});
                setFoodSteps({result: data[0].result.foodSteps});
                setFoodId(data[0].result.foodId);
                setCustomerId(data[0].result.customerId);
                setFoodName(data[0].result.foodName);
            });
        }
    };
    


    useEffect(
        placeLoad
    , []);

    return (
        <div className="filter">
            <h2>Filter</h2>
            
                <div className="filter-section">
                    <div id="food-calories" className="filter-section-body">
                        <label>Calories</label>
                        <input id="input-food-calories" placeholder="Calories" value={foodCalories} onChange={(e) => {setFoodCalories(e.target.value)}}></input>
                    </div>
                </div>
                <div className="filter-section">
                    <div id="food-name" className="filter-section-body">
                        <label>Name</label>
                        <input id="input-food-name" placeholder="Name" value={foodName} onChange={(e) => {setFoodName(e.target.value)}}></input>
                    </div>
                </div>
                <div className="filter-section">
                    
                    
                    
                    <div id="food-ingredients" className="filter-section-body">
                        
                        
                        <div><label>Ingredients</label></div>

                        
                        {foodIngredients.result.map((foodIngredient, index) => {














                            var place = <div></div>;
                            if (index != (foodIngredients.result.length - 1)) {
                                place = <div><input placeholder="Ingredient Name" value={foodIngredient.ingredientName} onChange={(e) => {var placeIngredients = []; placeIngredients = foodIngredients.result;  placeIngredients[index].ingredientName = e.target.value; setFoodIngredients({result: placeIngredients}); }}></input>
                                <input placeholder="Ingredient Number" value={foodIngredient.ingredientNum} onChange={(e) => {var placeIngredients= []; placeIngredients = foodIngredients.result; placeIngredients[index].ingredientNum = e.target.value; setFoodIngredients({result: placeIngredients});}}></input>
                                <input placeholder="Ingredient Last" value={foodIngredient.ingredientLast} onChange={(e) => {var placeIngredients = []; placeIngredients = foodIngredients.result; placeIngredients[index].ingredientLast = e.target.value; setFoodIngredients({result: placeIngredients});}}></input>
                                
                                </div>;
                            } else {
                                place = <div><input placeholder="Ingredient Name" value={foodIngredient.ingredientName} onChange={(e) => {var placeIngredients = []; placeIngredients = foodIngredients.result;  placeIngredients[index].ingredientName = e.target.value; setFoodIngredients({result: placeIngredients}); }}></input>
                                <input placeholder="Ingredient Number" value={foodIngredient.ingredientNum} onChange={(e) => {var placeIngredients= []; placeIngredients = foodIngredients.result; placeIngredients[index].ingredientNum = e.target.value; setFoodIngredients({result: placeIngredients});}}></input>
                                <input placeholder="Ingredient Last" value={foodIngredient.ingredientLast} onChange={(e) => {var placeIngredients = []; placeIngredients = foodIngredients.result; placeIngredients[index].ingredientLast = e.target.value; setFoodIngredients({result: placeIngredients});}}></input>
                                <button onClick={ingredientIn}>Ingredient In</button>
                                </div>;
                            }
                            return place;
                        })}

                        
                    </div>
                    
                </div>
                <div className="filter-section">
                    <div id="food-steps" className="filter-section-body">
                        <div>
                            <label>Steps</label>
                        </div>
                        
                        {foodSteps.result.map((foodStep, index) => {














var place = <div></div>;
if (index != (foodSteps.result.length - 1)) {
    place = <div>
    <input placeholder="Step Detail" value={foodStep.stepDetail} onChange={(e) => {var placeSteps = []; placeSteps = foodSteps.result; placeSteps[index].stepDetail = e.target.value; setFoodSteps({result: placeSteps});}}></input>
    
</div>;
} else {
    place = <div>
    <input placeholder="Step Detail" value={foodStep.stepDetail} onChange={(e) => {var placeSteps = []; placeSteps = foodSteps.result; placeSteps[index].stepDetail = e.target.value; setFoodSteps({result: placeSteps});}}></input>
    <button onClick={stepIn}>Step In</button>
</div>;
}
return place;
})}
                    </div>
                </div>
                
                <div className="submit">
                    <input type="submit" value="APPLY" formMethod="" onClick={load}></input>
                </div>
            
        </div>
    );
};