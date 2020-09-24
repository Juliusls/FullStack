import React from 'react'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        props.history.push('/')
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...content} reset='' />
                </div>
                <br/>
                <div>
                    author
                    <input name='author' {...author} reset='' />
                </div>
                <br/>
                <div>
                    url for more info
                    <input name='info' {...info} reset='' />
                </div>
                <br/>
                <button type='submit'>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew