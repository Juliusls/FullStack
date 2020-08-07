import React from 'react'
import { connect } from 'react-redux'
import { addingVoteToAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

let timeOutID

const AnecdoteList = (props) => {
    const vote = async (anecdote) => {
        props.addingVoteToAnecdote(anecdote)
        timeOutID = await props.setNotification(`you voted '${anecdote.content}'`, 5, timeOutID)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes)
            .filter(anecdote => anecdote.content.toString().toLowerCase().includes(state.filter.toLowerCase())),
        filter: state.filter
    }
}

const mapDispatchToProps = {
    addingVoteToAnecdote,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)