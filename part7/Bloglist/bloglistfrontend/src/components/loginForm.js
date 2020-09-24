import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addUser } from '../reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        setUsername('')
        setPassword('')

        try {
            const user = await loginService.login({ username, password })
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(addUser(user))
        } catch (exception) {
            dispatch(setNotification('Wrong credentials', 'danger' ))
        }
    }

    const centerForm = {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 500,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 10,
        padding: 20
    }

    const centerText = {
        paddingBottom: 10
    }

    return (
        <Form style={centerForm} className='Center' onSubmit={handleLogin}>
            <h1 style={centerText}>Login</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default LoginForm