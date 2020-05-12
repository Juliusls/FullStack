import React from "react";

const Total = ({parts}) => {
    const total = parts.reduce((sum, exercises) => {
            return sum + exercises.exercises
        }, 0);
    return (
        <div>
            <p><b>total of {total} exercises</b></p>
        </div>
    )
};

export default Total;
