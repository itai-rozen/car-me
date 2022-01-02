import axios from 'axios'
const proxy = 'https://intense-mesa-62220.herokuapp.com/'
const carsApi = axios.create({baseURL: 'https://vpic.nhtsa.dot.gov/api/vehicles/'})
const nhtsaApi = axios.create({baseURL: proxy+'https://api.nhtsa.gov/'})
export default class CarsApi {
    static getAllcarMakes =  () => {
        return carsApi.get('GetMakesForVehicleType/car?format=json')
    }

    static getModelsForMake = id => {
        return carsApi.get(`GetModelsForMakeId/${id}?format=json`)
    }

    static getModelYears = () => {
        return nhtsaApi.get('products/vehicle/modelYears?issueType=c/')
    }

    static getComplaintsByCar = (maker,model,year) => {
        return nhtsaApi.get(`complaints/complaintsByVehicle?make=${maker}&model=${model}&modelYear=${year}`)
    }

    static getRecallsByCar = (maker,model,year) => {
        return nhtsaApi.get(`/recalls/recallsByVehicle?make=${maker}&model=${model}&modelYear=${year}`)
    }

    static getVehicleId = (maker,model,year) => {
        return nhtsaApi.get(`/SafetyRatings/modelyear/${year}/make/${maker}/model/${model}`)
    }
    static getSafetyRatings = (vehicleId) => {
        return nhtsaApi.get(`/SafetyRatings/VehicleId/${vehicleId}`)
    }
}