import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'


const NavBar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(removeUser())
        window.localStorage.removeItem('loggedBlogappUser')
    }

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">Blogs App</Navbar.Brand>
            <Nav className="mr-auto" defaultActiveKey="/" as="ul" lg='6'>
                <Nav.Item as="li">
                    <Nav.Link as={Link} to="/">Blogs</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link as={Link} to="/users">Users</Nav.Link>
                </Nav.Item>
            </Nav>
            <Navbar.Text className="mr-sm-2" lg='4'>
                {`${user.name} logged in`}
            </Navbar.Text>
            <Button  className="mr-sm-2" variant="outline-primary" onClick={handleLogout} lg='2'>log out</Button>
        </Navbar>
    )
}

export default NavBar
