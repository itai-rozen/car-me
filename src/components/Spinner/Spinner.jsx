import React from 'react'
// import Animated from 'react-mount-animation'
import './spinner.css'

const Spinner = () => {
    // const [ setIsMounted] = useState(false)
    // useEffect(() => {
    //     setIsMounted(true)
    // },[])
    return <div className='spinner-container'           
                        //  show={isMounted}
                        //  mountAnim={`
                        //     0% { opacity:0 }
                        //     100% { opacity:1 }
                        //  `}
                         >
        <img className="spinner" src='spinner.png' alt='car wheel loader' />
    </div>
}

export default Spinner