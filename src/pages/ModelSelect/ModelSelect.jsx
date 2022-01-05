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
            try {
                const makerModelsFromApi = await carsApi.getModelsForMake(chosenMaker.MakeId)
                Util.saveToLocalStorage(`${chosenMaker.MakeName}-models`, makerModelsFromApi.data.Results)
                setModels(makerModelsFromApi.data.Results)
            } catch (err) {
                setError(err.message)
            }
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

    const resetChoices = () => {
        setChosenMaker({})
        setChosenModel({})
        setChosenModelYear('')
        setError('')
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
        setMessage('')
    }, [chosenMaker, chosenModel, chosenModelYear, error])




    return <div>
        {isLoading && <Spinner />}
        {
            !chosenMaker.MakeId &&
            <Select dValue={'Choose Company'}
                arr={carMakers}
                error={error}
                setter={setChosenMaker}
                optionValue={'MakeId'}
                optionContent={'MakeName'}
                setError={setError} />
        }
        {
            !chosenModel.Model_ID &&
            chosenMaker.MakeId &&
            models.length > 0 &&
            <Select dValue={'Choose Model'}
                arr={models}
                error={error}
                setter={setChosenModel}
                optionValue={'Model_ID'}
                optionContent={'Model_Name'}
                setError={setError} />
        }
        {
            chosenMaker.MakeId &&
            chosenModel.Model_ID &&
            !chosenModelYear &&
            <Select
                dValue={'Choose Year'}
                arr={modelYears}
                error={error}
                setter={setChosenModelYear}
                optionValue={'modelYear'}
                optionContent={'modelYear'}
                setError={setError} />
        }
        {
            chosenMaker.MakeId &&
            chosenModel.Model_ID &&
            chosenModelYear &&
            currLoggedUser.id &&
            <Button
                content={'add to your models'}
                onClickFunction={addModelToUserList} />
        }
        {error && <h2>{error}</h2>}
        <div className="choices-container">
            <h5>{chosenMaker.MakeName}</h5>
            <h5>{chosenModel.Model_Name}</h5>
            <h5>{chosenModelYear}</h5>
        </div>

            <Button content={'New search'} onClickFunction={resetChoices} />
        {
            chosenMaker.MakeId &&
            chosenModel.Model_ID &&
            chosenModelYear &&
            <ModelDetails
                maker={chosenMaker}
                model={chosenModel}
                year={chosenModelYear}
                setError={setError}
            />
        }

        {
            message &&
            <Animated.h3
                show={isMounted}
                mountAnim={`0%{opacity: 0} 100%{opacity:1}`}
                className='success-msg'>{message}</Animated.h3>}


    </div>
}

export default ModelSelect