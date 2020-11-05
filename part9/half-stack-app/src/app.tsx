import React from "react";
import { CoursePart } from "./types"
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
            name: "State handling",
            exerciseCount: 23,
            description: "Must learn",
            exerciseType: "TeamWork"
        }
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts}/>
        </div>
    );
};

export default App;