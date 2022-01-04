import React, { ueState, useEffect, useState } from 'react'
import ModelDetails from '../../components/ModelDetails/ModelDetails'
import carsApi from './../../scripts/carMakeIdApi'
import usersApi from '../../scripts/UsersApi'
import Util from './../../scripts/util'
import Animated from 'react-mount-animation'
import Spinner from '../../components/Spinner/Spinner'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import './modelSelect.css'

const ModelSelect = ({ carMakers, currLoggedUser, modelYears }) => {
    const [chosenMaker, setChosenMaker] = useState({})
    const [models, setModels] = useState([])
    const [chosenModel, setChosenModel] = useState({})
    const [chosenModelYear, setChosenModelYear] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false);

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
            await usersApi.updateUser(currLoggedUser.id, currLoggedUser)
            setIsLoading(false)
            setMessage('added successfully!')
            setIsMounted(true)
            setTimeout(() => {
                setMessage('')
                setIsMounted(false)
            }, 1000);
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        if (chosenMaker.MakeId) getModels()
        // setError('')
        console.log('chosen maker: ',chosenMaker)
        console.log('chosen model: ',chosenModel)
        console.log('chosen year: ',chosenModelYear)
        setMessage('')
    }, [chosenMaker, chosenModel, chosenModelYear])


    return <div>
        {isLoading && <Spinner />}


        <Select dValue={'Choose Company'} arr={carMakers} setChosenModelYear={setChosenModelYear}  setter={setChosenMaker}
                optionValue={'MakeId'} optionContent={'MakeName'} setError={setError} />

        {chosenMaker.MakeId && models.length > 0 &&
        <Select dValue={'Choose Model'} arr={models} setChosenModelYear={setChosenModelYear} setter={setChosenModel}
                optionValue={'Model_ID'} optionContent={'Model_Name'} setError={setError} />

        }
        {
        (chosenMaker.MakeId &&
         chosenModel.Model_ID) &&
        <Select dValue={'Choose Year'} arr={modelYears} setter={setChosenModelYear}
                optionValue={'modelYear'} optionContent={'modelYear'} setError={setError}/>
        }
        {
            chosenMaker &&
            chosenModel &&
            chosenModelYear &&
            currLoggedUser.id &&
            <Button content={'add to your models'} onClickFunction={addModelToUserList} />
        }
        {error && <h2>{error}</h2>}
        {
            chosenMaker &&
            chosenModel &&
            chosenModelYear &&
            <ModelDetails maker={chosenMaker} model={chosenModel} year={chosenModelYear} />
        }

        {message && <Animated.h3 show={isMounted} mountAnim={`0%{opacity: 0} 100%{opacity:1}`} className='success-msg'>{message}</Animated.h3> }


    </div>
}

export default ModelSelect