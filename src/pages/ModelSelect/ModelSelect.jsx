import React ,{ueState,useEffect, useState} from 'react'
import ModelDetails from '../../components/ModelDetails/ModelDetails'
import carsApi from './../../scripts/carMakeIdApi'
import Util from './../../scripts/util'
import './modelSelect.css'

const ModelSelect = ({carMakers, modelYears}) => {
    const [chosenMaker,setChosenMaker] = useState({})
    const [models,setModels] = useState([])
    const [chosenModel,setChosenModel] = useState({})
    const [chosenModelYear,setChosenModelYear] = useState('')

    const getModels = async () => {
        const makerModels = Util.loadFromLocalStorage(`${chosenMaker.MakeName}-models`)
        if (makerModels) setModels(makerModels)
        else {
            const makerModelsFromApi = await carsApi.getModelsForMake(chosenMaker.MakeId)
            Util.saveToLocalStorage(`${chosenMaker.MakeName}-models`, makerModelsFromApi.data.Results)
            setModels(makerModelsFromApi.data.Results)
        }     
    }

    useEffect(() => {
        console.log('chosen maker: ',chosenMaker)
        if (chosenMaker.MakeId) getModels()
        console.log('chosen model: ',chosenModel)
    },[chosenMaker,chosenModel,chosenModelYear])

    
    return <div>
        <select    defaultValue={'Choose Company'} onChange={(e) =>  setChosenMaker(carMakers.find(maker => maker.MakeId === +e.target.value) )}>
            <option disabled>Choose Company</option>
            {
                carMakers.map(maker => <option key={maker.MakeId} value={maker.MakeId}>{maker.MakeName}</option>)
            }
        </select>
        {chosenMaker.MakeId && <select  defaultValue={'Choose Model'} onChange={(e) => setChosenModel(models.find(model => model.Model_ID === +e.target.value))}>
            <option disabled>Choose Model</option>
            {
                models.map(model => {
                    return <option key={model.Model_ID} value={model.Model_ID}>{model.Model_Name}</option>
                })
            }
        </select>}
        {(chosenMaker.MakeId && chosenModel.Model_ID) && <select defaultValue={'Choose Model'} onChange={(e) => setChosenModelYear(e.target.value)} >
            <option disabled>Choose Year</option>
            {
                modelYears.filter(year => year.modelYear !== '9999')
                .map(year => <option key={year.modelYear} value={year.modelYear}>{year.modelYear}</option> )
            }
        </select>  } 
        {
        chosenMaker && chosenModel && chosenModelYear && <ModelDetails maker={chosenMaker} model={chosenModel} year={chosenModelYear} />
        }

        
    </div>
}

export default ModelSelect