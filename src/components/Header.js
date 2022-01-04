import logo from "../img/Restcipe.svg";
import searchIcon from "../img/searchIcon.svg";
import NavBar from "./NavBar";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { choose } from "../functionsJS/checkbox";
import SearchAPI from "../functionsJS/searchAPI"

const Header = () => {
    const [background, setBackground] = useState("grid-transparent container");
    const [valueReturn,setValueReturn] = useState(sessionStorage.getItem("value"))
    console.log(valueReturn)
    const load = () =>{
        window.sessionStorage.setItem("value", valueReturn);
        window.sessionStorage.setItem("currentPage", 0);
        SearchAPI(valueReturn)
    }

    return (
        <header className={background}>
            <div className="searchContainer">
                <div>
                    <FiSearch />
                </div>
                <div className="input-holder">
                    <form>
                        <div>
                            <input type="text" placeholder="Search" onChange={(e) => { setValueReturn(e.target.value) }} value={valueReturn} />
                        </div>
                        <div className="vl"></div>
                        <label className="checkbox-label">
                            Find in community
                            <input
                                type="checkbox"
                                id="search-community"
                            ></input>
                        </label>
                        <button className="btn btn-outline-primary" onClick={load()}>Submit</button>
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
