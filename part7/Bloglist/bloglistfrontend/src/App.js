import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import Blog from './components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Container from 'react-bootstrap/Container'

const App = () => {
    const [fetchInProgress, setFetchInProgress] = useState(true)
    const dispatch = useDispatch()
    const message = useSelector(state => state.notifications.message)
    const messageType = useSelector(state => state.notifications.messageType)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)

    useEffect(() => {
        async function getAllUsers() {
            await dispatch(initUsers())
        }
        getAllUsers()
    }, [dispatch])

    useEffect(() => {
        async function updateBlogsData() {
            await dispatch(initBlogs())
            setFetchInProgress(false)
        }
        updateBlogsData()
        // eslint-disable-next-line
    }, [fetchInProgress])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(addUser(user))
        }
    }, [dispatch])

    const blogFormRef = useRef()

    return (
        <Router>
            <Container>
                {user === null ?
                    <div>
                        <Notification message={message} messageType={messageType} />
                        <LoginForm />
                    </div>
                    : <div>
                        <NavBar />
                        <Notification message={message} messageType={messageType} />
                        <Switch>
                            <Route exact path='/'>
                                <Togglable buttonLabel='New blog' ref={blogFormRef}>
                                    <BlogForm setFetchInProgress={setFetchInProgress} blogFormRef={blogFormRef} />
                                </Togglable>
                                <BlogList
                                    fetchInProgress={fetchInProgress}
                                />
                            </Route>
                            <Route exact path='/users'>
                                <h2>Users</h2>
                                <Users/>
                            </Route>
                            <Route path='/users/:id'>
                                <UserBlogs users={users}/>
                            </Route>
                            <Route path='/blogs/:id'>
                                <Blog
                                    blogs={blogs}
                                    setFetchInProgress={setFetchInProgress}
                                />
                            </Route>
                        </Switch>
                    </div> }
            </Container>
        </Router>
    )
}

export default App