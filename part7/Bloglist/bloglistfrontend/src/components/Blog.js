import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, addLikeToBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { ListGroup, Form, Button, Card } from 'react-bootstrap'

const Blog = ({ blogs, setFetchInProgress }) => {
    const [value, setValue] = useState('')
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const history = useHistory()

    if (!blog) {
        return null
    }

    // console.log(blog.comments)

    const updateLikes = id => {
        const blog = blogs.filter(b => b.id === id)
        setFetchInProgress(true)
        dispatch(addLikeToBlog(blog, user.token))
        dispatch(setNotification(`A blog: ${blog[0].title} by ${blog[0].author} liked`, 'success' ))
    }

    const deleteBlog = id => {
        const blog = blogs.filter(b => b.id === id)[0]
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
            setFetchInProgress(true)
            blogService.setToken(user.token)
            dispatch(removeBlog(id))
            dispatch(setNotification('Blog removed', 'success'))
            history.push('/')
        }
    }

    const addComment = (event) => {
        event.preventDefault()
        setFetchInProgress(true)
        const newComment = { comment: value }
        blogService.createComment(newComment, blog.id)
        setValue('')
    }

    return (
        <div className='blog'>
            <div className='viewDetails'>
                <Card style={{ width: 1000 }}>
                    <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text><a href={blog.url}>{blog.url}</a></Card.Text>
                        <Card.Text>{blog.likes} likes <Button onClick={() => updateLikes(blog.id)}>like</Button></Card.Text>
                        <Card.Text>added by {blog.author}</Card.Text>
                        <Button onClick={() => deleteBlog(blog.id)} variant="secondary">Remove</Button>
                    </Card.Body>
                </Card>
            </div>
            <br/>
            <div className='comments'>
                <h3>Comments</h3>
                <Form.Group controlId="formGroupComments">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Add comment"
                        value={value}
                        onChange={({ target }) => setValue(target.value)}
                    />
                    <Button onClick={addComment} variant="primary" type="submit">
                        Add comment
                    </Button>
                </Form.Group>
                <ListGroup>
                    {blog.comments.map(comment =>
                        <ListGroup.Item key={comment.id}>{comment.comment}</ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object,
    updateLikes: PropTypes.func,
    deleteBlog: PropTypes.func
}

export default Blog
