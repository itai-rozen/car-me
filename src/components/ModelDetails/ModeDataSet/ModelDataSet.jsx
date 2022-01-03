import React, { useState, useEffect } from 'react'
import carsApi from './../../../scripts/carMakeIdApi.js'
import './modelDataSet.css'

const ModelDataSet = ({ data, vehicleId, header, setImgUrl }) => {
    const [safetyData, setSafetyData] = useState([])
    const [isChecked, setIsChecked] = useState(false)

    const getSafetyData = async () => {
        const carSafetyData = await carsApi.getSafetyRatings(vehicleId)
        console.log('vehicle id @dataset cpt: ', vehicleId)
        console.log('safety data: ', safetyData)
        setSafetyData(carSafetyData.data.Results[0])
        setImgUrl(carSafetyData.data.Results[0].VehiclePicture)
    }

    const renderContent = () => {
        if (data) return <div>
            {
                data.map(result => {
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
    }, [vehicleId])
    return <div>
        <header>
            <input type="checkbox" onChange={() => setIsChecked(!isChecked)} id="" />
            <h2>{header}</h2>
            <h3>
                {data ? `Total: ${data.length}` : `Overall: ${safetyData.OverallRating}`}
            </h3>
        </header>
        {
            isChecked && renderContent()
        }
    </div>
}

export default ModelDataSet