import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ setFetchInProgress, blogFormRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const addNewBlog = (event) => {
        event.preventDefault()
        try {
            setFetchInProgress(true)
            blogFormRef.current.toggleVisibility()
            blogService.setToken(user.token)
            dispatch(createBlog({
                title: title,
                author: author,
                url: url
            }))
            dispatch(setNotification(`A new blog: '${title}' by ${author} added`, 'success' ))
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form onSubmit={addNewBlog}>
            <h2>Create new blog</h2>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    className='titleInput'
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Author</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter author"
                    className='authorInput'
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter url"
                    className='urlInput'
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </Form.Group>
            <Button variant='primary' type='submit'>Create</Button>
        </Form>
    )
}

export default BlogForm