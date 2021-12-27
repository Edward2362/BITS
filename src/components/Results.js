import React from "react";
import { Filter } from "./Filter";
import Recipe from "./Recipe";
import Course from "./Course";
import { recipes } from "./fakedata";

const Results = () => {
    return (
        <>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <h1>Results</h1>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <Filter />
                            <hr></hr>
                            <div className="recipes-section">
                                {/* <Course key={1} data="first" />
                                <Course key={2} data="second" /> */}
                                {/* 

                                <div className="" data-carousel="second">
                                    <button
                                        id="prev"
                                        className="carousel-button prev"
                                        data-carousel-button="prev"
                                        onClick={() => handleClick("prev")}
                                    ></button>
                                    <button
                                        id="next"
                                        className="carousel-button next"
                                        data-carousel-button="next"
                                        onClick={() => handleClick("next")}
                                    ></button>
                                </div> */}
                                <div className="filter-section-grid">
                                    {recipes.map((recipe) => (
                                        <Recipe
                                            key={recipe.id}
                                            recipe={recipe}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Results;
