import logo1 from "../img/Restcipe-1.svg";
import logo2 from "../img/Restcipe-2.svg";
import searchIcon from "../img/searchIcon.svg";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { choose } from "../functionsJS/checkbox";

const Header = () => {
    const [background, setBackground] = useState("grid-transparent container");
    const [findInCommunity, setFindInCommunity] = useState(false);
    const [value, setValue] = useState("");

    if (sessionStorage.getItem("findInCommunity")) {
        if (findInCommunity === false) {
            setFindInCommunity(true);
        }
    }

    useEffect(choose);

    const handleFindInCom = (e) => {
        if (sessionStorage.getItem("findInCommunity")) {
            sessionStorage.removeItem("findInCommunity");
            e.target.parentElement.classList.remove("checked");
            setFindInCommunity(false);
        } else {
            sessionStorage.setItem("findInCommunity", true);
            e.target.parentElement.classList.add("checked");
            setFindInCommunity(true);
        }
    };

    const load = () => {
        window.sessionStorage.setItem("place", value);
        






        
        window.sessionStorage.removeItem("foodIndex");
    };

    // sessionStorage.getItem("findInCommunity") ?

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
                    <form method="get" action="/Test" onSubmit={load}>
                        <div>
                            <input type="text" placeholder="Search" value={value} onChange={(e) => {setValue(e.target.value)}} />
                        </div>
                        <div className="vl"></div>
                        <label className="checkbox-label">
                            Find in community
                            <input
                                type="checkbox"
                                id="search-community"
                                checked={findInCommunity}
                                onClick={(e) => handleFindInCom(e)}
                                onChange={choose}
                            ></input>
                        </label>
                    </form>
                </div>
            </div>
            <div className="logo-holder">
                <a href="/">
                    <img
                        id="logo"
                        src={
                            background === "grid-transparent container"
                                ? logo2
                                : logo1
                        }
                        alt="hello"
                    />
                </a>
            </div>
            <NavBar />
        </header>
    );
};

export default Header;
