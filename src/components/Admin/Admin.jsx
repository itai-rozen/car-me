import React, { useState } from 'react'
import usersApi from '../../scripts/UsersApi'
import Spinner from '../Spinner/Spinner'
import './admin.css'

const Admin = ({ users, getUsers }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const remove = async (id) => {
        setIsLoading(true)
        try {
            await usersApi.removeUser(id)
            await getUsers()
            setIsLoading(false)
        } catch (err) {
            setError(err.message)
        }
    }

    return <div className='admin-container'>
        <h2>Admin Page - Manage your users</h2>
        {error && <h3>{error}</h3>}
        {isLoading && <Spinner />}
        <ul>

            {
                users.map(user => {
                    return <li key={user.id}>
                        <p>username: {user.userName}</p>
                        <p>password: {user.userPassword}</p>
                        <button onClick={() => remove(user.id)}>delete</button>
                    </li>
                })
            }
        </ul>
    </div>
}

export default Admin