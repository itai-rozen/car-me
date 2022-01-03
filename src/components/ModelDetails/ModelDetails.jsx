import React, { useState, useEffect } from 'react'
import carsApi from './../../scripts/carMakeIdApi'
import ModelDataSet from './ModeDataSet/ModelDataSet'
import './modelDetails.css'


const ModelDetails = ({maker, model, year}) => {
    const [vehicleId,setVehicleId] = useState('')
    const [imgUrl,setImgUrl] = useState('')
    const [recalls,setRecalls] = useState([])
    const [complaints, setComplaints] = useState([])
    const [error,setError] = useState('')

    const getVehicleId = async () => {
        const id = await carsApi.getVehicleId(maker.MakeName,model.Model_Name,year)
        console.log('@getVehicleId: ',id.data.Results[0].VehicleId)
        setVehicleId(id.data.Results[0].VehicleId)
    }
    


    const getComplaints = async () => {
        const complaintsData = await carsApi.getComplaintsByCar(maker.MakeName,model.Model_Name,year)
        console.log('complaints: ',complaintsData) 
        setComplaints(complaintsData.data.results)
    }
    const getRecalls = async () => {
        const recallsData = await carsApi.getRecallsByCar(maker.MakeName,model.Model_Name,year)
        console.log('recalls: ',recallsData) 
        setRecalls(recallsData.data.results)
    }

    useEffect(() => {
        getVehicleId()
        getComplaints()
        getRecalls()
    },[])

    return <div>
        {imgUrl && <img src={imgUrl} alt={`vehicle: ${maker} ${model} ${year}`} />}
        <ModelDataSet header={'Complaints'} data={complaints} />
        <ModelDataSet header={'Recalls'} data={recalls} />
        <ModelDataSet header={'Safety Ratings'} setImgUrl={setImgUrl} vehicleId={vehicleId} />
    </div>
}

export default ModelDetails