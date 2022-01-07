import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (prop) => {
    let navigate = useNavigate();
    const [customerUsername, setCustomerUsername] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    const [confirmCustomerPassword, setConfirmCustomerPassword] = useState("");
    const [customerFirstName, setCustomerFirstName] = useState("");
    const [customerLastName, setCustomerLastName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    var source = "";
    var endPoint = "http://localhost:9000/customer/register";

    if (selectedFile === null) {

    } else {
        source = selectedFile.profileImg;
    }
    var imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setSelectedFile({ profileImg: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
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

    return (
        <div id="content" className="container">
            <div className="body">
                <div className="container">
                    <div className="sign-up-block">
                        <p>Register</p>
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

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmCustomerPassword}
                                    onChange={(e) => {
                                        setConfirmCustomerPassword(
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="First Name"
                                    value={customerFirstName}
                                    onChange={(e) => {
                                        setCustomerFirstName(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="Last Name"
                                    value={customerLastName}
                                    onChange={(e) => {
                                        setCustomerLastName(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-control">
                                <img src={source} width="400px" />
                                <input type="file" className="" onChange={imageHandler}></input>
                            </div>

                            <input
                                type="submit"
                                value="Sign up"
                                className="btn"
                                onClick={signup}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
