import { useState } from "react";
import {Filter} from "./Filter";
import {FoodFills} from "./FoodFills";

export default function Food(prop) {
    
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
                            <FoodFills renew={() => {prop.renew();}} />
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}