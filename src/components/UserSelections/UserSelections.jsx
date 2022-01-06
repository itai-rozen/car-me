import React, {useState,useEffect} from 'react'
import usersApi from '../../scripts/UsersApi'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import { BsTrash } from 'react-icons/bs'
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
    // eslint-disable-next-line
    },[])
    return <div className='user-selection-container'>
        <h2 className='user-header'>{currLoggedUser.userName}'s model list</h2>
        { isLoading && <Spinner /> }
        { error && <h2 className='error'>{error}</h2> }
        <ul className='user-list'>
        {
            currLoggedUser.favoriteModels.map((currModel,i) => {
                return <li className='user-item' key={currModel.maker+currModel.model+currModel.year}>
                    <p>{currModel.maker}</p>
                    <p>{currModel.model}</p>
                    <p>{currModel.year}</p>
                    <Button onClickFunction={deleteFromFavorites} params={[i]} content={<BsTrash />} />
                    {/* <button onClick={() => deleteFromFavorites(i)}><BsTrash /></button> */}
                </li>
            })
        }
        </ul>
    </div>
}

export default UserSelections