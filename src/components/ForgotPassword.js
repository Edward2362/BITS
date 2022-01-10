import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
    let navigate = useNavigate();
    const [customerEmail, setCustomerEmail] = useState("");
    var endPoint = "/customers/reset/email";
    const resetpw = () => {
        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerEmail: customerEmail }),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate("/signin");
            });
    };

    return (
        <div id="content" className="container">
            <div className="body-forgot">
                <div className="ForgotZone">
                    <p>Forgot Password</p>
                    <div className="width-forgot-input">
                        <div>
                            <input
                                className="forgotInput"
                                type="text"
                                placeholder="Enter your email"
                                value={customerEmail}
                                onChange={(e) => {
                                    setCustomerEmail(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Reset"
                        className="btn btn-forgot"
                        onClick={resetpw}
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
