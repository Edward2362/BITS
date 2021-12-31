import React, { useState, useEffect } from "react";
import { Filter } from "./Filter";
import Recipe from "./Recipe";
import Course from "./Course";
import { recipes, courses } from "./fakedata";
import { choose } from "../functionsJS/checkbox";

const Results = () => {
    const [findByCourse, setFindByCourse] = useState(
        sessionStorage.getItem("findByCourse")
    );

    const findCourses = () => {
        sessionStorage.getItem("findByCourse") === "true"
            ? setFindByCourse("true")
            : setFindByCourse("");
    };

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
                            <Filter onChange={findCourses} />
                            <hr></hr>
                            <div className="results-section">
                                {findByCourse === "true" ? (
                                    <div className="grid-50">
                                        {courses.map((course, index) => (
                                            <Course
                                                key={index}
                                                recipes={course.recipes}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid-25">
                                        {recipes.map((recipe) => (
                                            <Recipe
                                                key={recipe.id}
                                                recipe={recipe}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Results;
