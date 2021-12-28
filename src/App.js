import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import img1 from "./img/bg.jpg";
import img2 from "./img/searchIcon.svg";
import img3 from "./img/logormit.png";
import Header from "./components/Header";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Ad from "./components/Ad";
import Restcipes from "./components/Recipes";
import HomepageBody from "./components/HomepageBody";
import Copyrights from "./components/Copyrights";
import Privacy from "./components/Privacy";
import TermsOfService from "./components/Tos";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import CreateRecipe from "./components/CreateRecipe";

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
                    <Route path="/CreateRecipe" element={<CreateRecipe />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Test" element={<Restcipes />} />
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
