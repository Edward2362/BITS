import test from "../img/edamam-logo.png";

const Signed = (prop) => {
    const load = () => {
        window.sessionStorage.removeItem("userID");

        window.sessionStorage.removeItem("userToken");
    };

    return (
        <ul className="flex-center">
            <li>
                <a href="/Signin" onClick={load}>
                    Sign out
                </a>
            </li>
            <li>
                <a href="/Profile" id="profile">
                    <img htmlFor="profile" src={prop.userImage}></img>
                </a>
            </li>
        </ul>
    );
};

export default Signed;
