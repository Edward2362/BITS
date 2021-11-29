import img1 from '../img/bg.jpg'

const Signin = () => {
    return (
        <div id="content" className="container">
            {/* <div className="sign-img"><img source={img1} alt="background"></img></div> */}
            <div className="body">
                <div className="login-border grid-login container">
                    
                    <div className="block-65-login">
                        <h1>placeholder</h1>
                        
                    </div>

                    <div className="block-35-login">
                        <p>Account Login</p>
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

                            <input
                                type="submit"
                                value="Login"
                                className="btn"
                            />
                            <input
                                type="submit"
                                value="Forgot Password"
                                className="btn"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
