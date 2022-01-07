import Sign from "./Sign";
import React, { useState, useEffect } from "react";
import Signed from "./Signed";

const NavBar = () => {
    var endPoint = "http://localhost:9000/customer/";
    const [customer, setCustomer] = useState({
        customerId: "",
        customerEmail: "",
        address: "",
        firstName: "",
        lastName: "",
        fullName: "",
        customerImage: "",
        customerPassword: "",
        food: [],
    });

    var controlSign = <div></div>;
    if (null !== window.sessionStorage.getItem("userID")) {
        controlSign = <Signed userName={customer.lastName} />;
    } else {
        controlSign = <Sign />;
    }

    const load = () => {
        if ("" !== customer.lastName) {
        } else {
            if (null === window.sessionStorage.getItem("userID")) {
            } else {
                fetch(endPoint + window.sessionStorage.getItem("userID"))
                    .then((response) => response.json())
                    .then((data) => {
                        setCustomer(data[0]);
                    });
            }
        }
    };

    useEffect(load);

    return (
        <nav className="full-width">
            <ul className="block-65">
                <li>
                    <a
                        href="/AlterRecipe"
                        onClick={() => {
                            sessionStorage.removeItem("Existed");
                        }}
                    >
                        Create Recipe
                    </a>
                </li>
                <li>
                    <a href="/">About</a>
                </li>
            </ul>
            <div className="block-35">{controlSign}</div>
        </nav>
    );
};

export default NavBar;
