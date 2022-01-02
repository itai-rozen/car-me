import React, { useState, useEffect } from 'react'
import carsApi from './../../scripts/carMakeIdApi'
import './modelDetails.css'

const ModelDetails = ({maker, model, year}) => {
    const [vehicleId,setVehicleId] = useState('')
    const [carSafetyData,setCarSafetyData] = useState({})
    const [error,setError] = useState('')
    const getVehicleId = async () => {
        const id = await carsApi.getVehicleId(maker.MakeName,model.Model_Name,year)
        console.log('@getVehicleId: ',id.data.Results[0].VehicleId)
        setVehicleId(id.data.Results[0].VehicleId)
    }
    
    const getSafetyData = async () => {
        const safetyData = await carsApi.getSafetyRatings(vehicleId)
        console.log('vehicle id: ',vehicleId)
        console.log('safety data: ',safetyData)
    }

    useEffect(() => {
        getVehicleId()
        getSafetyData()
        if (!vehicleId) setError('No safety data for this year model.')
    },[])
    return <div></div>
}

export default ModelDetails