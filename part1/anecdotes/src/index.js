import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0));

    const handleNextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    };

    const handleVote = (position) => {
        const copy = [...points];
        copy[position] += 1;
        setPoints(copy);
    };

    let indexOfMaxValue = points.indexOf(Math.max(...points));

    return (
        <div>
            <h1>Anecdotes of the day</h1>
            {props.anecdotes[selected]}
            <p>has {points[selected]} votes</p>
            <button onClick={() => {handleVote(selected)}}>vote</button>
            <button onClick={handleNextAnecdote}>next anecdote</button>

            <h2>Anecdote with most votes</h2>
            {props.anecdotes[indexOfMaxValue]}
            <p>has {points[indexOfMaxValue]} votes</p>
        </div>
    )
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
);
