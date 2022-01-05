import React, {useState,useEffect} from 'react'
import Animated from 'react-mount-animation'
import './spinner.css'

const Spinner = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    },[])
    return <Animated.div className='spinner-container'           
                         show={isMounted}
                         mountAnim={`
                            0% { opacity:0 }
                            100% { opacity:1 }
                         `}>
        <img className="spinner" src='spinner.png' />
    </Animated.div>
}

export default Spinner