import React from 'react'
import { CoursePart } from "../types"
import { assertNever } from "../utils"

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch(part.name) {
    case "Fundamentals":
        return (
            <div>
                <strong>{part.name}</strong> 
                {part.description && <p>{part.description}</p>}
                <p>Exercises: <strong>{part.exerciseCount}</strong></p>
            </div>
        )
    case "Using props to pass data":
        return (
            <div>
                <strong>{part.name}</strong> 
                <p>Exercises: <strong>{part.exerciseCount}</strong></p>
                <p>Group Projects: <strong>{part.groupProjectCount}</strong></p>
            </div>
        )
    case "Deeper type usage":
        return (
            <div>
                <strong>{part.name}</strong>
                {part.description && <p>{part.description}</p>}
                <p>Exercises: <strong>{part.exerciseCount}</strong></p>
                <p>Submision Link: <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></p>
            </div>
        )
    case "State handling": 
        return (
            <div>
                <strong>{part.name}</strong>
                {part.description && <p>{part.description}</p>}
                <p>Exercises: <strong>{part.exerciseCount}</strong></p>
                <p>Exercises type: <strong>{part.exerciseType}</strong></p>
            </div>
        )
    default:
        return assertNever(part);
    }
};


export default Part;
