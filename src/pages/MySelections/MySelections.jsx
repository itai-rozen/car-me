import React, {useState, useEffect} from 'react'
import Admin from '../../components/Admin/Admin'
import Form from '../../components/Form/Form'
import UserSelections from '../../components/UserSelections/UserSelections'
import './mySelections.css'

const MySelections = ({ currLoggedUser, getUsers, setCurrLoggedUser, setUsers,users}) => {
    const [loginStatus,setLoginStatus] = useState('')
    return <div>
{
    currLoggedUser.id &&
    <button onClick={() => setCurrLoggedUser('')}>Switch user</button>
}
{
     !currLoggedUser.id  &&  
     <div>
         <h2>To manage your own model selection. you must  &nbsp;
             <span className='log-link' onClick={() => setLoginStatus('login')}> Login </span>&nbsp; or &nbsp; 
             <span className='log-link' onClick={() => setLoginStatus('signup')}> Sign up </span>.</h2>
     </div>
}
{
    loginStatus && <Form getUsers={getUsers} 
                         setCurrLoggedUser={setCurrLoggedUser}  
                         users={users} 
                         setLoginStatus={setLoginStatus} 
                         loginStatus={loginStatus} />
}
{
    (currLoggedUser.userName && 
        currLoggedUser.userName !== 'admin' ) && 
    <UserSelections currLoggedUser={currLoggedUser} getUsers={getUsers} />
}
{
    currLoggedUser.userName === 'admin' && <Admin users={users} getUsers={getUsers}  />
}


    </div>
}

export default MySelections