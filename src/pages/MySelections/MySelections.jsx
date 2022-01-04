import React, {useState, useEffect} from 'react'
import Admin from '../../components/Admin/Admin'
import Form from '../../components/Form/Form'
import './mySelections.css'

const MySelections = ({ currLoggedUser, getUsers, setCurrLoggedUser, setUsers,users}) => {
    const [loginStatus,setLoginStatus] = useState('')
    return <div>
{
     !currLoggedUser.id  &&  <div>
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
    currLoggedUser.id && <div>hi my selections</div>
}
{
    currLoggedUser.userName === 'admin' && <Admin users={users} getUsers={getUsers}  />
}


    </div>
}

export default MySelections