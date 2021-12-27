import logo from "../img/Restcipe.svg";
import searchIcon from "../img/searchIcon.svg";
import NavBar from "./NavBar";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { choose } from "../functionsJS/checkbox";


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
                    <form onChange={choose} method="get">
                        <div>
                            <input type="text" placeholder="Search" />
                        </div>
                        <div className="vl"></div>
                        <label className="checkbox-label">
                            Find in community
                            <input
                                type="checkbox"
                                id="search-community"
                            ></input>
                        </label>
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
