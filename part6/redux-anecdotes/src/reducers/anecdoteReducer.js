import anecdotesService from '../services/anecdotes'

const anecdotesReducer = (state = [], action) => {
    // console.log('ACTION:', action)
    switch (action.type) {
    case 'NEW_ANECDOTE':
        return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    case 'ADD_VOTE': {
        return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    }
    default:
        return state
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch ({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

export const addingVoteToAnecdote = (anecdote) => {
    return async dispatch => {
        const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        const updatedAnecdote = await anecdotesService.update(anecdote.id, votedAnecdote)
        dispatch ({
            type: 'ADD_VOTE',
            data: updatedAnecdote
        })
    }

}

export const addingNewAnecdote = (data) => {
    return async dispatch => {
        const newAndecdote = await anecdotesService.create(data)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAndecdote
        })
    }
}

export default anecdotesReducer