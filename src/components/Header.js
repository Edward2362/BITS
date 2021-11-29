import logo from "../img/logormit.png";
import searchIcon from "../img/searchIcon.svg";
import NavBar from "./NavBar";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Header = () => {
    const [background, setBackground] = useState("grid-transparent container");

    document.addEventListener("scroll", () => {
        const show = window.scrollY;
        if (show > 250) {
            setBackground("grid-non-transparent container");
        } else {
            setBackground("grid-transparent container");
        }
    });

    return (
        <header className={background}>
            <div className="searchContainer">
                <div>
                    <FiSearch />
                </div>
                <input type="text" placeholder="Search" />
            </div>
            <div className="logo-holder">
                <img id="logo" src={logo} alt="hello" />
            </div>
            <NavBar />
        </header>
    );
};

export default Header;
