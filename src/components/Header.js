import logo from "../img/logormit.png";
import searchIcon from "../img/searchIcon.svg";
import NavBar from "./NavBar";
import { useState } from "react";

const Header = () => {
    const [background, setBackground] = useState("grid-transparent container");

    document.addEventListener("scroll", () => {
        const show = window.scrollY;
        if (show !== 0) {
            setBackground("grid-non-transparent container");
        } else {
            setBackground("grid-transparent container");
        }
    });

    return (
        <header className={background}>
            <div className="searchContainer">
                <div>
                    <img src={searchIcon} alt="search icon" />
                </div>
                <input type="text" placeholder="Search" />
            </div>
            <div className="logo-holder">
                <img className="logo-holder" src={logo} alt="hello" />
            </div>
            <NavBar />
        </header>
    );
};

export default Header;
