import React, { useState } from 'react'
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory
} from 'react-router-dom'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link to='/' style={padding}>anecdotes</Link>
            <Link to='/create' style={padding}>create new</Link>
            <Link to='/about' style={padding}>about</Link>
        </div>
    )
}

const App = () => {
    const history = useHistory()
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`a new anecdote ${anecdote.content} created`)
        setTimeout(() => {
            setNotification('')
        }, 10000)
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    const match = useRouteMatch('/anecdotes/:id')
    const oneAnecdote = match
        ? anecdoteById(match.params.id)
        : null

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            {notification}
            <Switch>
                <Route exact path='/'>
                    <AnecdoteList anecdotes={anecdotes} />
                </Route>
                <Route path='/create'>
                    <CreateNew addNew={addNew} history={history}/>
                </Route>
                <Route path='/about'>
                    <About />
                </Route>
                <Route exact path='/anecdotes/:id'>
                    <Anecdote anecdote={oneAnecdote} />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App
