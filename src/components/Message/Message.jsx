import React, { useState, useEffect} from 'react'
import './message.css'

const Message = ({content}) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    },[])
    return  <h3
    className={`success-msg ${mounted && 'stretch'}`}>{content}</h3>
}

export default Message