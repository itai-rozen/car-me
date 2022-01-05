import React from 'react'
import './button.css'

const Button = ({content, onClickFunction,params, disableFunc}) => {
    
    return <button disabled={disableFunc} className='btn' onClick={() => onClickFunction(...params || '')}>{content}</button>
}

export default Button
