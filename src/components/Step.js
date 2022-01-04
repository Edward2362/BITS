import React from "react";

const Step = ({ step, position }) => {
    return (
        <div className="step-body">
            <div className="step-header">
                <h3>{"#" + position}</h3>
            </div>
            <p>{step}</p>
        </div>
    );
};

export default Step;
