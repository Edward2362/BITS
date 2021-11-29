import React from "react";

const Ad = () => {
    const reveal = () => {
        var reveals = document.querySelectorAll(".reveal");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 250;

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
            <div className="bg">
                <div className="container overlay">
                    <div className="ad-body">
                        <div className="ad-text">
                            <h1>Restcipe</h1>
                            <p>The more </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ad;
