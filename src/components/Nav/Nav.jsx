import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = ({currLoggedUser}) => {
    return <nav>
        <Link to="/">
            <img src="car-logo.png" alt="car logo" />
        </Link>
        <Link to="/select">
            Select a Model
        </Link>
        <Link to="/user">
            My Models
        </Link>
        <div className="user-container">
        <h6>Hello {currLoggedUser.id ? currLoggedUser.userName : 'Guest'}!</h6>
        {!currLoggedUser.id && <Link to="/user">Login</Link>}
        </div>
    </nav>
}

export default Nav