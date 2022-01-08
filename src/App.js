import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Ad from "./components/Ad";
import Results from "./components/Results";
import Homepage from "./components/Homepage";
import ForgotPassword from "./components/ForgotPassword";
import { useState } from "react";
import RecipeCRUD from "./components/RecipeCRUD";
import Profile from "./components/Profile";
import RecipeInformationAPI from "./components/RecipeInformationAPI";
import RecipeInformationDB from "./components/RecipeInformationDB";
import Copyrights from "./components/Copyrights";
import Privacy from "./components/Privacy";
import TermsOfService from "./components/Tos";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
    const [value, setValue] = useState(0);

    const load = () => {
        if (value) {
            setValue(0);
        } else {
            setValue(1);
        }
    };
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
                                <Homepage />
                            </>
                        }
                    />
                    <Route path="/About" element={<About />} />
                    <Route
                        path="/Signin"
                        element={
                            <Signin
                                renew={() => {
                                    load();
                                }}
                            />
                        }
                    />
                    <Route
                        path="/Signup"
                        element={
                            <Signup
                                renew={() => {
                                    load();
                                }}
                            />
                        }
                    />
                    <Route
                        path="/AlterRecipe"
                        element={
                            <RecipeCRUD
                                renew={() => {
                                    load();
                                }}
                            />
                        }
                    />
                    <Route
                        path="/Profile"
                        element={
                            <Profile
                                renew={() => {
                                    load();
                                }}
                            />
                        }
                    />
                    <Route
                        path="/Recipe-Edamam/:id"
                        element={
                            <RecipeInformationAPI
                                renew={() => {
                                    load();
                                }}
                            />
                        }
                    />
                    <Route
                        path="/Recipe-Restcipe/:id"
                        element={
                            <RecipeInformationDB
                                renew={() => {
                                    load();
                                }}
                            />
                        }
                    />
                    <Route path="/Result" element={<Results />} />
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
