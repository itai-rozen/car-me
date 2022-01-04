import React, { useState, useEffect } from 'react'
import Animated from 'react-mount-animation'
import './select.css'

const Select = ({dValue, arr,setter, optionValue, optionContent, setError,setChosenModelYear}) => {

    const [isMounted, setIsMounted] = useState(false);
    const onChangeFunction = e => {
        if (!optionValue){
            setError('model is no longer supported')
            return
        }
        if (optionValue === 'modelYear'){
            setter(e.target.value)
        } else {
            setChosenModelYear('')
            setter(arr.find(item => item[optionValue] === +e.target.value))
        }
    }

    useEffect(() => {
        setIsMounted(true)
    },[])

    return <Animated.select className='select' defaultValue={dValue}
                   onChange={onChangeFunction} 
                   show={isMounted}
                   mountAnim={` 
                   0% {opacity: 0}
                   100% {opacity: 1}
               `}>
                <option disabled>{dValue}</option>
                {
                   (dValue !== 'modelYear') ? 
                    arr
                    .sort((a,b) => b[optionContent].toUpperCase() > a[optionContent].toUpperCase() ? -1 : 1)
                    .map(item => {
                        return <option key={item[optionValue]} value={item[optionValue]}>{item[optionContent]}</option>
                    }) : 
                    arr
                    .filter(item => item.modelYear !== '9999')
                    .sort((a,b) => b[optionContent] > a[optionContent] ? -1 : 1)
                    .map(item => {
                        return <option key={optionValue} value={optionValue}>{optionContent}</option>
                    })
                }
            </Animated.select>
}

export default Select