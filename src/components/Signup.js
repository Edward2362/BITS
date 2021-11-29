const Signup = () => {
    return (
        <div id="content" className="container">
            <div className="body">
                <div className="login-border grid-login container">
                    <div className="block-65-login">
                        <h1>placeholder</h1>
                        <h1>placeholder</h1>
                        <h1>placeholder</h1>
                        <h1>placeholder</h1>
                        <h1>placeholder</h1>
                    </div>

                    <div className="block-35-signup">
                        <p>Register</p>
                        <form>
                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>

                            <div className="form-control">
                                <input
                                    className="inputZone"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>

                            <input
                                type="submit"
                                value="Sign up"
                                className="btn"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
