import React from "react";
import { Filter } from "./Filter";

const Recipes = () => {
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recipes;
