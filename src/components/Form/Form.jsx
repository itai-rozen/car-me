import React, { useState, useEffect, useRef } from 'react'
import usersApi from '../../scripts/UsersApi'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import './form.css'

const Form = ({  getUsers,loginStatus, setCurrLoggedUser,setLoginStatus ,users}) => {
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [error,setError] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [message,setMessage] = useState('')
    const inputRef = useRef()

    const addUser = async (userDetails) => {
        setIsLoading(true)
        try {
            await usersApi.addUser(userDetails)
            await getUsers()
            setIsLoading(false)
        } catch(err) {
            setError(err.message)
            setIsLoading(false)
        }
    }

    const validateFormDetails = () => {
        if (username.length < 1){
            setError('username must contain at least one character')
            return false
        } else if (password.trim().length < 8){
            setError('password must contain at least 8 charcters')
            return false
        } else if (password !== rePassword){
            setError('you must enter EXACTLY the same password twice for validation.')
            return false
        } else if (users.find(user => user.userName === username)){
            setError('a user with that username already exists')
            return false
        }
        return true
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (loginStatus === 'signup'){
            const isValidated = validateFormDetails()
            if (!isValidated) return
            let newUser = {}
                setError('')
                newUser.userPassword = password
                newUser.userName = username
                newUser.favoriteModels = [] 
                addUser(newUser)
                setMessage(`Welcome ${username}! please log in to manage your list`)
                setTimeout(() => {
                    setLoginStatus('login')
                },2000)
        } else {
            
            const oldUser =  users.find(user => user.userName === username)
            if (!oldUser){
                setError('username does not exist.')
                return
            }
            if (oldUser.userPassword !== password){
                setError('wrong username or password.')
                return
            } else {
                setError('')
                setCurrLoggedUser(oldUser)
                setLoginStatus('')
            }
        }

    }

    useEffect(() => {
        console.log('users:',users)
        setPassword('')
        setUserName('')
        setRePassword('')
        setError('')
        setMessage('')
        inputRef.current.focus()
    // eslint-disable-next-line
    },[loginStatus])
    
    return <div className='form-container'>
    { isLoading && <Spinner />}
    <form className='login-form' onSubmit={(e) => handleSubmit(e)}>

        <label className='form-label' htmlFor="username">User name</label>
        <input ref={inputRef} value={username} onChange={(e) => setUserName(e.target.value)} type="text" id="username" />
        
        <label className='form-label' htmlFor="pasword">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"  id="password" />
        {
            loginStatus === 'signup' && <>
            <label className='form-label' htmlFor="re-pass">Re-enter password</label>
            <input onChange={(e) => setRePassword(e.target.value)} value={rePassword} type="password" id="re-pass" />
            </>
        }
        <div className="btn-container">
        <input type="submit" value={loginStatus === 'signup'? 'Sign up' : 'Login'} />
        <Button content={'cancel'} onClickFunction={setLoginStatus} params={['']} />
        </div>
        <div className="error-container">
        { <h5 className='form-error'>{error}</h5> }
        { <h5 className='form-message'>{message}</h5> }
        </div>
    </form>
    </div>

}

export default Form