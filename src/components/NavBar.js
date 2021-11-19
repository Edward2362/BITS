import Sign from "./Sign";

const NavBar = () => {
    return (
        <nav className="full-width">
            <ul className="block-70">
                <li>
                    <a href="#">Create Recipe</a>
                </li>
            </ul>
            <div className="block-30">
                <Sign />
            </div>
        </nav>
    );
};

export default NavBar;
