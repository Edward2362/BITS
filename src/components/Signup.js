import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import anonymous from "../img/anonymous-avatar.png";

const Signup = (prop) => {
    let navigate = useNavigate();
    const [customerUsername, setCustomerUsername] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    const [confirmCustomerPassword, setConfirmCustomerPassword] = useState("");
    const [customerFirstName, setCustomerFirstName] = useState("");
    const [customerLastName, setCustomerLastName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    var source = anonymous;
    var endPoint = "/customer/register";

    if (selectedFile === null) {
    } else {
        source = selectedFile.profileImg;
    }
    var imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setSelectedFile({ profileImg: reader.result });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    if (sessionStorage.getItem("userID")) {
        navigate("/Profile");
        prop.renew();
    }

    const signup = () => {
        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerUsername: customerUsername,
                customerPassword: customerPassword,
                customerFirstName: customerFirstName,
                customerLastName: customerLastName,
                customerImage: source,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate("/signin");
            });
    };

    const [passedEmail, setPassedEmail] = useState(false);
    const [passedPassword, setPassedPassword] = useState(false);
    const [passedConfirmPassword, setPassedConfirmPassword] = useState(false);
    const [passedFirstName, setPassedFirstName] = useState(false);
    const [passedLastName, setPassedLastName] = useState(false);

    const [emailError, setEmailError] = useState("");
    const validateEmail = (e) => {
        setCustomerUsername(e.target.value);
        var customerUsername = e.target.value;

        if (validator.isEmail(customerUsername)) {
            setEmailError("");
            setPassedEmail(true);
        } else {
            setEmailError("Invalid Email!");
            setPassedEmail(false);
        }
    };

    const [passwordError, setPasswordError] = useState("");
    const validatePassword = (e) => {
        setCustomerPassword(e.target.value);
        var customerPassword = e.target.value;

        if (validator.isStrongPassword(customerPassword)) {
            setPasswordError("");
            setPassedPassword(true);
        } else {
            setPasswordError(
                "Password must have at least 8 characters, 1 Uppercase, 1 lowercase, a number and a special symbol."
            );
            setPassedPassword(false);
        }
    };

    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const validateConfirmPassword = (e) => {
        setConfirmCustomerPassword(e.target.value);
        var confirmCustomerPassword = e.target.value;

        if (confirmCustomerPassword === customerPassword) {
            setConfirmPasswordError("");
            setPassedConfirmPassword(true);
        } else {
            setConfirmPasswordError("Passwords must be the same.");
            setPassedConfirmPassword(false);
        }
    };

    const [firstNameError, setFirstNameError] = useState("");
    const validateFirstName = (e) => {
        setCustomerFirstName(e.target.value);
        var customerFirstName = e.target.value;

        if (customerFirstName === "") {
            setFirstNameError("Cannot be empty!");
            setPassedFirstName(false);
        } else {
            setFirstNameError("");
            setPassedFirstName(true);
        }
    };

    const [lastNameError, setLastNameError] = useState("");
    const validateLastName = (e) => {
        setCustomerLastName(e.target.value);
        var customerLastName = e.target.value;

        if (customerLastName === "") {
            setLastNameError("Cannot be empty!");
            setPassedLastName(false);
        } else {
            setLastNameError("");
            setPassedLastName(true);
        }
    };

    return (
        <div id="content" className="container">
            <div className="body">
                <div className="container">
                    <div className="sign-up-block">
                        <p>Register</p>
                        <div>
                            <div required className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="Email"
                                    value={customerUsername}
                                    onChange={(e) => validateEmail(e)}
                                />
                                <div className="error-msg">{emailError}</div>
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="password"
                                    placeholder="Password"
                                    value={customerPassword}
                                    onChange={(e) => validatePassword(e)}
                                />
                                <div className="error-msg">{passwordError}</div>
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmCustomerPassword}
                                    onChange={(e) => validateConfirmPassword(e)}
                                />
                                <div className="error-msg">
                                    {confirmPasswordError}
                                </div>
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="First Name"
                                    value={customerFirstName}
                                    onChange={(e) => validateFirstName(e)}
                                />
                                <div className="error-msg">
                                    {firstNameError}
                                </div>
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="Last Name"
                                    value={customerLastName}
                                    onChange={(e) => validateLastName(e)}
                                />
                                <div className="error-msg">{lastNameError}</div>
                            </div>

                            <div className="form-control">
                                <img src={source} width="400px" />
                                <div className="input-avatar-holder">
                                    <input
                                        type="file"
                                        onChange={imageHandler}
                                        id="file"
                                    ></input>
                                    <label htmlFor="file">
                                        Choose Your Avatar
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn"
                                disabled={
                                    !passedEmail ||
                                    !passedPassword ||
                                    !passedConfirmPassword ||
                                    !passedFirstName ||
                                    !passedLastName
                                }
                                onClick={signup}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
