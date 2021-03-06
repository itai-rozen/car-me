import React, { useState } from 'react'
import usersApi from '../../scripts/UsersApi'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import { BsTrash } from 'react-icons/bs'
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

    return <div className='user-selection-container'>
        <h2 className='user-header'>Admin Page - Manage your users</h2>
        {error && <h3>{error}</h3>}
        {isLoading && <Spinner />}
        <ul className='admin user-list'>

            {
                users.map(user => {
                    return <li className='user-item' key={user.id}>
                        <p>username: {user.userName}</p>
                        <p>password: {user.userPassword}</p>
                        <Button onClickFunction={remove} params={[user.id]} content={<BsTrash />} />
                        {/* <button onClick={() => remove(user.id)}>delete</button> */}
                    </li>
                })
            }
        </ul>
    </div>
}

export default Admin