import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirthyear from './components/SetBirthyear'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()        
    }

    const Notify = ({ errorMessage }) => {
        if ( !errorMessage ) {
            return null
        }
      
        return (
            <div style={{color: 'red'}}>
                {errorMessage}
            </div>
        )
    }

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

    const updateCacheWith = (bookAdded) => {
        const includedIn = (set, object) => 
          set.map(p => p.id).includes(object.id)  
    
        const dataInStore = client.readQuery({ query: ALL_BOOKS })
        if (!includedIn(dataInStore.allBooks, bookAdded)) {
          client.writeQuery({
            query: ALL_BOOKS,
            data: { allBooks : dataInStore.allBooks.concat(bookAdded) }
          })
        }   
      }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const bookAdded = subscriptionData.data.bookAdded
            window.alert(`${bookAdded.title} added`);
            updateCacheWith(bookAdded)
          }
      })
    
    return (
        <div>
            <Router>
                <Link to="/authors"><button type="button">authors</button></Link>
                <Link to="/books"><button type="button">books</button></Link>
                {token === null 
                    ? <Link to="/login"><button type="button">login</button></Link>
                    : <>
                        <Link to="/addbook"><button type="button">add book</button></Link>
                        <Link to='recommended'><button type="button">recommended</button></Link>
                        <Link to="/setbirthyear"><button type="button">set birthyear</button></Link>
                        <button onClick={logout}>log out</button>
                      </>
                }
                <Notify errorMessage={errorMessage} />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/authors" />
                    </Route>
                    <Route path='/authors'>
                        <Authors />
                    </Route>
                    <Route path='/books'>
                        <Books />
                    </Route>
                    <Route path='/addbook'>
                        {token !== null ? <NewBook setError={notify}/> : <Redirect to="/login" />}
                    </Route>
                    <Route path='/recommended'>
                        {token !== null ? <Recommended /> : <Redirect to="/login" />}
                    </Route>
                    <Route path='/setbirthyear'>
                        {token !== null ? <SetBirthyear setError={notify} /> : <Redirect to="/login" />}
                    </Route>
                    <Route path='/login'>
                        {token === null ?  <LoginForm setError={notify} setToken={setToken}/> :  <Redirect to="/authors" />}
                    </Route>
                </Switch>
                
            </Router>
        </div>
    )
}

export default App