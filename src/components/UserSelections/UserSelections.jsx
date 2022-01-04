import React, {useState,useEffect} from 'react'
import usersApi from '../../scripts/UsersApi'
import Spinner from '../Spinner/Spinner'
import './userSelections.css'

const UserSelections = ({currLoggedUser,getUsers}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const deleteFromFavorites = async (index) => {
        setIsLoading(true)
        const userCopy = {...currLoggedUser}
        userCopy.favoriteModels.splice(index,1)
        try {
            await usersApi.updateUser(currLoggedUser.id, userCopy )
            await getUsers()
            setIsLoading(false)
        } catch(err) {
            setError(err.message)
        }
    }
    useEffect(() => {
        console.log('current logged user: ',currLoggedUser)
        getUsers()
    },[])
    return <div>
        <h2>{currLoggedUser.userName}'s model list</h2>
        { isLoading && <Spinner /> }
        { error && <h2>{error}</h2> }
        <ul>
        {
            currLoggedUser.favoriteModels.map((currModel,i) => {
                return <li key={currModel.maker+currModel.model+currModel.year}>
                    <p>{currModel.maker}</p>
                    <p>{currModel.model}</p>
                    <p>{currModel.year}</p>
                    <button onClick={() => deleteFromFavorites(i)}>delete</button>
                </li>
            })
        }
        </ul>
    </div>
}

export default UserSelections