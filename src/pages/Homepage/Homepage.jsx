import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'

const Homepage = () => {
    return <div className='homepage-container'>
        <div className="center-container">

        <div className="about">
            <h1>Car Me</h1>
            <div className="secondary-header-container">
            <h2>Helping you find your next car</h2> 
                <h2>with minimum effort.</h2>
            </div>
        </div>
        <aside className='aside'>
            <div className="description">
            Find complaints, recalls, safety ratings & reviews on your next car.
                Start <Link to="/select"> browsing our database</Link>. <br /> <br />  you can also <Link to="/user">Sign in </Link> 
                and manage your favorite models. 
            </div>
        </aside>
        </div>

    </div>
}

export default Homepage