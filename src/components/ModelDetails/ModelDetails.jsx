import React, { useState, useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import carsApi from './../../scripts/carMakeIdApi'
import ModelDataSet from './ModeDataSet/ModelDataSet'
import './modelDetails.css'


const ModelDetails = ({maker, model, year}) => {
    const [vehicleId,setVehicleId] = useState('')
    const [imgUrl,setImgUrl] = useState('')
    const [recalls,setRecalls] = useState([])
    const [complaints, setComplaints] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] = useState('')

    const getVehicleId = async () => {
        setIsLoading(true)
        try {
            const id = await carsApi.getVehicleId(maker.MakeName,model.Model_Name,year)
            setVehicleId(id.data.Results[0].VehicleId)
            setIsLoading(false)
            setError('')
        } catch(err) {
            setError('no data for this model year')
            setIsLoading(false)
        }
    }
    
    const getComplaints = async () => {
        setIsLoading(true)
        try {
            const complaintsData = await carsApi.getComplaintsByCar(maker.MakeName,model.Model_Name,year)
            setComplaints(complaintsData.data.results)
            setIsLoading(false) 
        } catch(err) {
            setError(err.message)
            setIsLoading(false) 
        }
    }
    const getRecalls = async () => {
        setIsLoading(true)
        try {
            const recallsData = await carsApi.getRecallsByCar(maker.MakeName,model.Model_Name,year)
            setRecalls(recallsData.data.results)
            setIsLoading(false)
        } catch(err){
            setError(err.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getVehicleId()
        getComplaints()
        getRecalls()
    },[maker,model,year])

    return <div>
        { isLoading && <Spinner />}
        {error && <h1>{error}</h1>}
        <div className="img-container">
        {imgUrl ? <img src={imgUrl} alt={`vehicle: ${maker} ${model} ${year}`}  /> : <h5>image not available</h5> }
        </div>
        <ModelDataSet header={'Complaints'} data={complaints} cptId={"id1"} />
        <ModelDataSet header={'Recalls'} data={recalls} cptId={"id2"} />
        <ModelDataSet header={'Safety Ratings'} cptId={"id3"} setImgUrl={setImgUrl} setIsLoading={setIsLoading} vehicleId={vehicleId} />
    </div>
}

export default ModelDetails