import React from 'react'

const Anecdote = ({ anecdote }) => (
    <div>
        <h1>some text</h1>
        <h2>{anecdote.content}</h2>
        <div>has {anecdote.votes} votes</div>
        <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
)

export default Anecdote