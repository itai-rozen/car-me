import React, { useState, useEffect } from 'react'
import carsApi from './../../../scripts/carMakeIdApi.js'
import { BiRightArrow } from 'react-icons/bi'
import './modelDataSet.css'

const ModelDataSet = ({ cptId,data, vehicleId, header, setImgUrl, setIsLoading }) => {
    const [safetyData, setSafetyData] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [dataError, setDataError] = useState('')
    const [complaintsShown, setComplaintsShown] = useState(5)
    const [recallsShown, setRecallsShown] = useState(5)

    const increaseDataShow = (isComplaint, length) => {
        if (isComplaint){
            if (complaintsShown + 5 < length) setComplaintsShown(complaintsShown+5)
            else setComplaintsShown(length) 
        } else {
            if (recallsShown + 5 < length) setRecallsShown(recallsShown+5)
            else setRecallsShown(length)
        }
    }
    const getSafetyData = async () => {
        setIsLoading(true)
        try {
            const carSafetyData = await carsApi.getSafetyRatings(vehicleId)
            setSafetyData(carSafetyData.data.Results[0])
            setImgUrl(carSafetyData.data.Results[0].VehiclePicture)
            setIsLoading(false)
        } catch(err) {
            setDataError(err.message)
        }
    }
    const handleChange = () => {
        setIsChecked(!isChecked)
        setRecallsShown(5)
        setComplaintsShown(5)
    }

    const renderButton = () => {
        const checkDisable = (header === 'Complaints' && complaintsShown === data.length) ||
                            (header === 'Recalls' && recallsShown === data.length)
        if (header === 'Safety Ratings') return
        return <button disabled={checkDisable} onClick={() => increaseDataShow(header==='Complaints', data.length)}>show more</button> 
    }

    const renderContent = () => {
        if (data) return <div>
            {
                data.slice(0,header === 'Complaints' ? complaintsShown : recallsShown).map(result => {
                    if (result.dateComplaintFiled) {
                        return <div key={result.odiNumber} className='complaint-container'>
                            <div className="data-field">
                                <h5>Vehicle Component: </h5>
                                <p>{result.components}</p>
                            </div>
                            <div className="data-field">
                                <h5>Date of complaint : </h5>
                                <p>{result.dateComplaintFiled}</p>
                            </div>
                            <div className="data-field">
                                <h5>Summary: </h5>
                                <p>{result.summary}</p>
                            </div>
                        </div>
                    } else {
                        return <div key={result.NHTSACampaignNumber} className='recall-container'>
                            <div className="data-field">
                                <h5>Vehicle Component: </h5>
                                <p>{result.Component}</p>
                            </div>
                            <div className="data-field">
                                <h5>Date of recall: </h5>
                                <p>{result.ReportReceivedDate}</p>
                            </div>
                            <div className="data-field">
                                <h5>Consequence : </h5>
                                <p>{result.Conequence}</p>
                            </div>
                            <div className="data-field">
                                <h5>Summary: </h5>
                                <p>{result.Summary}</p>
                            </div>
                          
                        </div>
                    }
                })
            }
        </div>
        else return <div className='rating-container'>
            <div className="data-field">
                <h5>Driver front Side: </h5>
                <p>{safetyData.FrontCrashDriversideRating}</p>
            </div>
            <div className="data-field">
                <h5>Passenger front Side: </h5>
                <p>{safetyData.FrontCrashPassengersideRating}</p>
            </div>
            <div className="data-field">
                <h5>Vehicle Side: </h5>
                <p>{safetyData.OverallSideCrashRating}</p>
            </div>
            <div className="data-field">
                <h5>Roll Over possibility: </h5>
                <p>{safetyData.RolloverPossibility}</p>
            </div>
        </div>
    }

    useEffect(() => {
        if (vehicleId) getSafetyData()
    // eslint-disable-next-line
    }, [vehicleId])

    return <div>

        <label htmlFor={cptId}>
            <input type="checkbox" onChange={() => handleChange()} id={cptId} />
            <h2>{header} <span className={`arrow-icon ${isChecked && `rotated`} ` }><BiRightArrow /></span> </h2>
            {dataError && <h2>{dataError}</h2> }
            <h3>
                {data ? `Total: ${data.length}` : `Overall: ${safetyData.OverallRating}`}
            </h3>
        </label>
        {
            isChecked && renderContent()
        }
        {
            isChecked  && renderButton()
        }

    </div>
}

export default ModelDataSet