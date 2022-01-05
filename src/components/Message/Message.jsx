import React, { useState,useEffect } from 'react'
import Animated from 'react-mount-animation'
import './message.css'

const Message = ({content}) => {
    const [isMounted,setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    },[])
    return  <Animated.h3
    show={isMounted}
    mountAnim={`0%{opacity: 0} 100%{opacity:1}`}
    className='success-msg'>{content}</Animated.h3>
}

export default Message