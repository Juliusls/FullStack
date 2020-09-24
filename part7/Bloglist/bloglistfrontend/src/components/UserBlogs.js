import React from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const UserBlogs = ({ users }) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)
    if (!user) {
        return null
    }

    return (
        <div>
            <h2 style={{ color: 'blue' }}>{user.name}</h2>
            <h4 className='mt-5 mb-3'>Added blogs</h4>
            <ListGroup>
                {(user.blogs.length === 0)
                    ? <div>No Blogs added</div>
                    : user.blogs.map(blog =>
                        <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                    )}
            </ListGroup>
        </div>
    )
}

export default UserBlogs