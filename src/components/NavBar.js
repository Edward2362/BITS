import Sign from "./Sign";

const NavBar = () => {
    return (
        <nav className="full-width">
            <ul className="block-65">
                <li>
                    <a href="#">Create Recipe</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
            </ul>
            <div className="block-35">
                <Sign />
            </div>
        </nav>
    );
};

export default NavBar;
