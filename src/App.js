import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import img1 from "./img/bg.jpg";
import img2 from "./img/searchIcon.svg";
import img3 from "./img/logormit.png";
import Copyrights from "./components/Copyrights";
import Privacy from "./components/Privacy";
import TermsOfService from "./components/Tos";
import FAQ from "./components/FAQ";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
    return (
        <Router>
            <>
                <Header />

                {/* <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <>
                                <div className="bg"></div>
                                <div className="container">
                                    <p>Text holder for homepage</p>
                                </div>
                            </>
                        }
                    />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Copyrights" element={<Copyrights />} />
                    <Route path="/PrivacyPolicy" element={<Privacy />} />
                    <Route
                        path="/TermsOfService"
                        element={<TermsOfService />}
                    />
                    <Route path="/FAQ" element={<FAQ />} />
                </Routes>
                <Footer />
            </>
        </Router>
    );
}

export default App;
