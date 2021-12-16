import logo from "../img/Restcipe.svg";
import searchIcon from "../img/searchIcon.svg";
import NavBar from "./NavBar";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Header = () => {
    const [background, setBackground] = useState("grid-transparent container");

    document.addEventListener("scroll", () => {
        const show = window.scrollY;
        if (show > 120) {
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
                <div className="input-holder">
                    <form>
                        <input type="text" placeholder="Search" />
                    </form>
                </div>
            </div>
            <div className="logo-holder">
                <a href="/">
                    <img id="logo" src={logo} alt="hello" />
                </a>
            </div>
            <NavBar />
        </header>
    );
};

export default Header;
