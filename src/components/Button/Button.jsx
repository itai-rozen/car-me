import React from 'react'
import './button.css'

const Button = ({content, onClickFunction}) => {
    return <button className='btn' onClick={() => onClickFunction()}>{content}</button>
}

export default Button
