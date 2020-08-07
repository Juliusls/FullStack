import React from 'react'
import { connect } from 'react-redux'
import { addingNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

let timeOutID

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addingNewAnecdote(content)
        timeOutID = await props.setNotification(`new anecdote created ${content}`, 5, timeOutID)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    setNotification,
    addingNewAnecdote
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)