import React, { ueState, useEffect, useState } from 'react'
import ModelDetails from '../../components/ModelDetails/ModelDetails'
import carsApi from './../../scripts/carMakeIdApi'
import usersApi from '../../scripts/UsersApi'
import Util from './../../scripts/util'
import './modelSelect.css'
import Spinner from '../../components/Spinner/Spinner'

const ModelSelect = ({ carMakers, currLoggedUser, modelYears }) => {
    const [chosenMaker, setChosenMaker] = useState({})
    const [models, setModels] = useState([])
    const [chosenModel, setChosenModel] = useState({})
    const [chosenModelYear, setChosenModelYear] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const getModels = async () => {
        const makerModels = Util.loadFromLocalStorage(`${chosenMaker.MakeName}-models`)
        if (makerModels) setModels(makerModels)
        else {
            const makerModelsFromApi = await carsApi.getModelsForMake(chosenMaker.MakeId)
            Util.saveToLocalStorage(`${chosenMaker.MakeName}-models`, makerModelsFromApi.data.Results)
            setModels(makerModelsFromApi.data.Results)
        }
    }

    const checkDuplicate = () => {
        const matches = currLoggedUser.favoriteModels.filter(favorite => {
            return (favorite.maker === chosenMaker &&
                favorite.model === chosenModel &&
                favorite.year === chosenModelYear)
        })
        console.log('matches: ', matches)
        return matches.length > 0
    }

    const addModelToUserList = async () => {
        const isDuplicate = checkDuplicate()
        if (isDuplicate) {
            setError('this model is already in your list')
            return
        }
        setIsLoading(true)
        try {
            const newFavoriteModel = {
                maker: chosenMaker.MakeName,
                model: chosenModel.Model_Name,
                year: chosenModelYear
            }
            const newFavorites = [...currLoggedUser.favoriteModels, newFavoriteModel]
            currLoggedUser.favoriteModels = newFavorites
            console.log('new favorites:',newFavorites)
            await usersApi.updateUser(currLoggedUser.id, currLoggedUser)
            setIsLoading(false)
            setMessage('added successfully!')
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        console.log('render')
        if (chosenMaker.MakeId) getModels()
        setError('')
        setMessage('')
    }, [chosenMaker, chosenModel, chosenModelYear])


    return <div>
        {isLoading && <Spinner />}
        {error && <h2>{error}</h2>}
        <select defaultValue={'Choose Company'} onChange={(e) => setChosenMaker(carMakers.find(maker => maker.MakeId === +e.target.value))}>
            <option disabled>Choose Company</option>
            {
                carMakers.sort((a, b) => b.MakeName > a.MakeName ? -1 : 1).map(maker => <option key={maker.MakeId} value={maker.MakeId}>{maker.MakeName}</option>)
            }
        </select>
        {chosenMaker.MakeId && <select defaultValue={'Choose Model'} onChange={(e) => setChosenModel(models.find(model => model.Model_ID === +e.target.value))}>
            <option disabled>Choose Model</option>
            {
                models
                    .sort((a, b) => b.Model_Name > a.Model_Name ? -1 : 1)
                    .map(model => {
                        return <option key={model.Model_ID}
                            value={model.Model_ID}>
                            {model.Model_Name}
                        </option>
                    })
            }
        </select>
        }
        {
            (chosenMaker.MakeId &&
             chosenModel.Model_ID) &&
            <select defaultValue={'Choose Year'}
                onChange={(e) => setChosenModelYear(e.target.value)} >
                <option disabled>Choose Year</option>
                {
                    modelYears
                        .sort((a, b) => +a.modelYear - +b.modelYear)
                        .filter(year => year.modelYear !== '9999')
                        .map(year => <option key={year.modelYear} value={year.modelYear}>{year.modelYear}</option>)
                }
            </select>
        }
        {
            chosenMaker &&
            chosenModel &&
            chosenModelYear &&
            currLoggedUser.id &&
            <button onClick={() => addModelToUserList()}>add to your models</button>
        }
        {
            chosenMaker &&
            chosenModel &&
            chosenModelYear &&
            <ModelDetails maker={chosenMaker} model={chosenModel} year={chosenModelYear} />
        }

        {message && <h3 className='success-msg'>{message}</h3> }


    </div>
}

export default ModelSelect