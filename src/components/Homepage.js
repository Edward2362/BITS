import React from "react";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { BiDish } from "react-icons/bi";
import { RiDoubleQuotesR } from "react-icons/ri";
import wife from "../img/wife.jpg";
import img1 from "../img/Laptop.png";

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
        var arr = [];

        if (typeof counter == "string") {
            arr = counter.split(".");
            for (let i = 0; i < arr.length; i++) {
                result += arr[i];
            }
        } else {
            var string_counter = counter.toString();
            arr = string_counter.split("");
            let count = arr.length;
            for (let i = 0; i < arr.length; i++) {
                if (arr.length >= 4) {
                    if (count % 3 === 0) {
                        result += ".";
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
                    setTimeout(updateCount, 9);
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

    // var a = "test";

    // a = a === "test" && "a Hao";

    // console.log("test nef", a);

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
                                    <h2>#1</h2>
                                    <div className="feature-content">
                                        <p>
                                            Find various of recipes with
                                            available ingredients
                                        </p>
                                    </div>
                                </div>
                                <div className="feature-body">
                                    <h2>#2</h2>
                                    <div className="feature-content">
                                        <p>
                                            Provide diversity of choices for eat
                                            clean and healthy
                                        </p>
                                    </div>
                                </div>

                                <div className="feature-body">
                                    <h2>#3</h2>
                                    <div className="feature-content">
                                        <p>
                                            Help control the amount of calories
                                            consumed
                                        </p>
                                    </div>
                                </div>
                                <div className="feature-body">
                                    <h2>#4</h2>
                                    <div className="feature-content">
                                        <p>
                                            Create a community for sharing and
                                            learning cooking experiences
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
                                <HiOutlinePresentationChartLine />
                                <h1>User About Messenger</h1>
                                <hr />
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="sn-body-equal-half">
                                <div className="img-holder">
                                    <img src={img1} alt="PC-demo"></img>
                                </div>
                            </div>
                            <div className="sn-body-equal-half">
                                <div className="feedback-body">
                                    <div className="feedback-img">
                                        <img src={wife} alt="user-avatar"></img>
                                    </div>
                                    <div className="user">
                                        <h2>Duong Nguyen</h2>
                                        <p>Angry Housewife</p>
                                    </div>
                                    <div className="feedback-content">
                                        <p>
                                            Restcipe is an amazing website with
                                            thousands of dishes from around the
                                            world. Moreover, it has just saved
                                            my husband from a flying knife.
                                        </p>
                                    </div>
                                    <div className="quote">
                                        <RiDoubleQuotesR />
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
