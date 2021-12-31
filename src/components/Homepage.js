import React from "react";
import { FiHexagon } from "react-icons/fi";
import { BiDish } from "react-icons/bi";
import img1 from "../img/bg.jpg";

const HomepageBody = () => {
    const reveal = () => {
        const reveals = document.querySelectorAll(".reveal");

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

    const count_converter = (counter) => {
        var result = "";

        if (typeof counter == "string") {
            var arr = counter.split(" ");
            for (let i = 0; i < arr.length; i++) {
                result += arr[i];
            }
        } else {
            var string_counter = counter.toString();
            var arr = string_counter.split("");
            let count = arr.length;
            for (let i = 0; i < arr.length; i++) {
                if (arr.length >= 4) {
                    if (count % 3 == 0) {
                        result += " ";
                    }
                }
                count--;
                result += arr[i];
            }
        }
        return result;
    };

    window.addEventListener("scroll", () => {
        const counters = document.querySelectorAll(".counter");

        counters.forEach((counter) => {
            const updateCount = () => {
                const data = +count_converter(counter.getAttribute("data"));
                const count = +count_converter(counter.innerText);
                const speed = 250;

                const inc = Math.round(data / speed);

                if (count < data) {
                    counter.innerText = count_converter(count + inc);
                    setTimeout(updateCount, 12);
                } else {
                    counter.innerText = count_converter(data);
                }
            };

            var windowHeight = window.innerHeight;
            var elementTop = counter.getBoundingClientRect().top;
            var elementVisible = 220;

            if (
                elementTop < windowHeight - elementVisible &&
                elementTop > windowHeight - elementVisible - 40
            ) {
                updateCount();
            }
        });
    });

    return (
        <>
            <div className="homepage">
                <section className="container reveal">
                    <div className="section-content">
                        <div className="section-header">
                            <div className="sn-header-body">
                                <BiDish />
                                <h1>Core Features</h1>
                                <hr />
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="grid-25">
                                <div className="feature-body">
                                    <h2>1.</h2>
                                    <div className="feature-content">
                                        <p>
                                            Find various of recipes with
                                            available ingredients
                                        </p>
                                    </div>
                                </div>
                                <div className="feature-body">
                                    <h2>2.</h2>
                                    <div className="feature-content">
                                        <p>
                                            Provide diversity of choices for eat
                                            clean and healthy
                                        </p>
                                    </div>
                                </div>

                                <div className="feature-body">
                                    <h2>3.</h2>
                                    <div className="feature-content">
                                        <p>
                                            Help control the amount of calories
                                            consumed
                                        </p>
                                    </div>
                                </div>
                                <div className="feature-body">
                                    <h2>4.</h2>
                                    <div className="feature-content">
                                        <p>
                                            Create a community for sharing and
                                            learning new cooking experiences
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="hooker">
                    <div className="container hooker-overlay">
                        <div className="hooker-body">
                            <div>
                                <h1>UP TO</h1>
                                <div className="hooker-content">
                                    <div className="counter" data="2300000">
                                        0
                                    </div>
                                    <p>Recipes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container reveal">
                    <div className="section-content">
                        <div className="section-header">
                            <div className="sn-header-body">
                                <BiDish />
                                <h1>Restcipe</h1>
                                <hr />
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
                                            hello my Name Is Nguyen Vinh Quang
                                        </p>
                                    </div>
                                </div>
                                <div className="feature-body">
                                    <div className="feature-icon">
                                        <FiHexagon />
                                    </div>
                                    <div className="feature-content">
                                        <p>content</p>
                                        <p>
                                            hello my Name Is Nguyen Vinh Quang
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomepageBody;
