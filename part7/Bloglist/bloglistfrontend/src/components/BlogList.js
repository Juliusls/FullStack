import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'


const BlogList = ({ fetchInProgress }) => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const filterBlogs = (blogs) => {
        return blogs
            .filter(blog => blog.user !== null)
            .filter(blog => blog.user.username === user.username)
    }

    return (
        <ListGroup style={{ marginTop: 15 }}>
            {fetchInProgress
                ? <p>Loading</p>
                :  filterBlogs(blogs)
                    .map(blog =>
                        <ListGroup.Item key={String(blog.id)}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
                    )
            }
        </ListGroup>
    )
}

export default BlogList