import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import img1 from "./img/bg.jpg";
import img2 from "./img/searchIcon.svg";
import img3 from "./img/logormit.png";
import HomepageBody from "./components/HomepageBody";
import Ad from "./components/Ad";
import Copyrights from "./components/Copyrights";
import Privacy from "./components/Privacy";
import TermsOfService from "./components/Tos";
import FAQ from "./components/FAQ";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";

function App() {
    return (
        <Router>
            <>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <>
                                <Ad />
                                <HomepageBody />
                            </>
                        }
                    />

                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Copyrights" element={<Copyrights />} />
                    <Route path="/PrivacyPolicy" element={<Privacy />} />
                    <Route
                        path="/ForgotPassword"
                        element={<ForgotPassword />}
                    />
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
