import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = () => {
    return <nav>
        <Link to="/select">
            Select a Model
        </Link>
        <Link to="/user">
            My Models
        </Link>
    </nav>
}

export default Nav