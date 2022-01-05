import React from 'react'
import './message.css'

const Message = ({content}) => {

    return  <h3
    className='success-msg'>{content}</h3>
}

export default Message