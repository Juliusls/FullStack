import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('library-user-token', token)
        }
      }, [result.data]) // eslint-disable-line

    const submit = (e) => {
        e.preventDefault()
        login({
            variables: { username, password }
        })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <h2>Login</h2>
                username<input
                    type="text"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
                <br/>
                password<input
                    type="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
                <br/>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm
