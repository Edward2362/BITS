const Signed = (prop) => {
    return (
        <ul className="flex-center">
            <li>
                <a href="/Signin">Sign out</a>
            </li>
            <li>
                <a href="/Signup">
                    {prop.userName}
                </a>
            </li>
        </ul>
    );
};

export default Signed;