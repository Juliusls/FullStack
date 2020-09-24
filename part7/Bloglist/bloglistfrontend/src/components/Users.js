import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'
import { Table } from 'react-bootstrap'

const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
            <Table bordered hover>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(user =>
                        <User  key={String(user.id)} user={user}/>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Users