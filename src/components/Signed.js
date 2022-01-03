const Signed = (prop) => {
    const load = () => {
        window.sessionStorage.removeItem("userID");

        window.sessionStorage.removeItem("userToken");
    };

    return (
        <ul className="flex-center">
            <li>
                <a href="/Profile">{prop.userName}</a>
            </li>
            <li>
                <a href="/Signin" onClick={load}>
                    Sign out
                </a>
            </li>
        </ul>
    );
};

export default Signed;
