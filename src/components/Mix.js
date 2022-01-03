import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Mix(prop) {
    let navigate = useNavigate();
    var endPoint = "";
    var endPoint2 = "";
    var endPoint3 = "";

    const [value, setValue] = useState({
        foodId: "",
        foodCalories: "",
        foodName: "",
        foodSteps: [],
        foodIngredients: [],
        customerId: "",
    });

    const [isIn, setIsIn] = useState(0);

    if (null !== window.sessionStorage.getItem("")) {
    } else {
        navigate("/");
        prop.renew();
    }

    const load = () => {
        fetch(endPoint)
            .then((response) => response.json())
            .then((data) => {
                fetch(endPoint2, {
                    method: "GET",
                    headers: {
                        "x-access-token":
                            window.sessionStorage.getItem("userToken"),
                    },
                })
                    .then((response2) => response2.json())
                    .then((placeData) => {
                        if (undefined !== placeData[0].invalid) {
                        } else {
                            if (undefined !== placeData[0].customer) {
                                setIsIn(1);
                            } else {
                                setIsIn(0);
                            }
                            setValue(data[0].result);
                        }
                    });
            });
    };

    const likeButton = () => {
        if (!isIn) {
        } else {
            if (null === window.sessionStorage.getItem("userID")) {
                navigate("/");
                prop.renew();
            } else {
                fetch(endPoint3, {
                    method: "POST",
                    headers: {
                        "x-access-token":
                            window.sessionStorage.getItem("userToken"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        foodId: value.foodId,
                        foodName: value.foodName,
                        provider: "Customer",
                        customerId: window.sessionStorage.getItem("userID"),
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (undefined !== data[0].invalid) {
                        } else {
                            setIsIn(0);
                        }
                    });
            }
        }
    };

    useEffect(load, []);

    return <div></div>;
}
