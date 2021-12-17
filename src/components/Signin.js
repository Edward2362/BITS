import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const Signin = (prop) => {
    let navigate = useNavigate();
    const [customerUsername, setCustomerUsername] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    var endPoint = "http://localhost:9000/customer/signin";
    const signin = () => {
        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerUsername: customerUsername,
                customerPassword: customerPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                
                window.sessionStorage.setItem("userID", data[0].customerId);
                window.sessionStorage.setItem("userToken", data[0].token);
                navigate("/");
                prop.refresh();
                
            });
    };

    const handleLogin = async (googleData) => {
        const res = await fetch("http://localhost:9000/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        navigate("/");

        // store returned user somehow
    };

    return (
        <div id="content" className="container">
            <div className="body">
                <div className="login-border grid-login container">
                    <div className="block-65-login">
                        <h1>placeholder</h1>
                    </div>

                    <div className="block-35-login">
                        <p>Account Login</p>
                        <div>
                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="Username"
                                    value={customerUsername}
                                    onChange={(e) => {
                                        setCustomerUsername(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="password"
                                    placeholder="Password"
                                    value={customerPassword}
                                    onChange={(e) => {
                                        setCustomerPassword(e.target.value);
                                    }}
                                />
                            </div>

                            <input
                                type="submit"
                                value="Login"
                                className="btn"
                                onClick={signin}
                            />
                            <input
                                type="submit"
                                value="Forgot Password"
                                className="btn"
                            />
                            <div>
                                <GoogleLogin
                                    clientId={
                                        process.env.REACT_APP_GOOGLE_CLIENT_ID
                                    }
                                    buttonText="Log in with Google"
                                    onSuccess={handleLogin}
                                    onFailure={handleLogin}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
