import React from "react";
import { FiHexagon } from "react-icons/fi";
import { BiDish } from "react-icons/bi";
import img1 from "../img/bg.jpg";

const HomepageBody = () => {
    const reveal = () => {
        var reveals = document.querySelectorAll(".reveal");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 170;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    };

    window.addEventListener("scroll", reveal);

    return (
        <>
            <section className="container reveal">
                <div className="section-header">
                    <div className="sn-header-body">
                        <BiDish />
                        <h1>Core Features</h1>
                    </div>
                </div>
                <div className="section-body">
                    <div className="sn-body-equal-half">
                        <div className="img-holder">
                            <img src={img1}></img>
                        </div>
                    </div>
                    <div className="sn-body-equal-half">
                        <div className="feature-body">
                            <div className="feature-icon">
                                <FiHexagon />
                            </div>
                            <div className="feature-content">
                                <p>content</p>
                                <p>
                                    hello my Name Is Nguyen Vinh Quanghello my
                                    Name Is Nguyen Vinh Quanghello my Name Is
                                    Nguyen Vinh Quanghello my Name Is Nguyen
                                    Vinh Quang
                                </p>
                            </div>
                        </div>
                        <div className="feature-body">
                            <div className="feature-icon">
                                <FiHexagon />
                            </div>
                            <div className="feature-content">
                                <p>content</p>
                                <p>hello my Name Is Nguyen Vinh Quang</p>
                            </div>
                        </div>
                        <div className="feature-body">
                            <div className="feature-icon">
                                <FiHexagon />
                            </div>
                            <div className="feature-content">
                                <p>content</p>
                                <p>hello my Name Is Nguyen Vinh Quang</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container reveal">
                <div className="section-header">
                    <div className="sn-header-body">
                        <BiDish />
                        <h1>Core Features</h1>
                    </div>
                </div>
                <div className="section-body">
                    <div className="sn-body-equal-half">
                        <div className="img-holder">
                            <img src={img1}></img>
                        </div>
                    </div>
                    <div className="sn-body-equal-half">
                        <div className="feature-body">
                            <div className="feature-icon">
                                <FiHexagon />
                            </div>
                            <div className="feature-content">
                                <p>content</p>
                                <p>hello my Name Is Nguyen Vinh Quang</p>
                            </div>
                        </div>
                        <div className="feature-body">
                            <div className="feature-icon">
                                <FiHexagon />
                            </div>
                            <div className="feature-content">
                                <p>content</p>
                                <p>hello my Name Is Nguyen Vinh Quang</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomepageBody;
