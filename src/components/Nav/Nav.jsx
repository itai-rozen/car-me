import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = ({currLoggedUser, setCurrLoggedUser}) =>  {
    const [greet, setGreet] = useState('Good morning ')
    const greeting = () => {
        const hourTime = new Date().getHours()
        if (hourTime < 12 && hourTime > 5) setGreet('Good morning ')
        else if (hourTime > 12 && hourTime < 18) setGreet('Good afternoon ')
        else if (hourTime >= 18 && hourTime < 23) setGreet('Good evening ')
        else setGreet('Good night')
    }
    useEffect(() => {
        greeting()
    },[])
    return <nav>
        <div className="logo-container">
        <Link to="/">
            <img src="car-logo.png" alt="car logo" />
        </Link>
        <h6 className='greet'>{greet} {currLoggedUser.id ? currLoggedUser.userName : ' Guest'}!</h6>
        </div>
        <Link to="/select">
            Select a Model
        </Link>
        <Link to="/user">
            My Models
        </Link>
        <div className="user-container">
        {!currLoggedUser.id ? <Link to="/user">Login</Link> : <span onClick={() => setCurrLoggedUser({} )}>Logout</span>}
        </div>
    </nav>
}

export default Nav