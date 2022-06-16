import React , { useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import carsApi from './scripts/carMakeIdApi'
import usersApi from './scripts/UsersApi'
import Util from './scripts/util'
import Homepage from './pages/Homepage/Homepage'
import './App.css';
import Nav from './components/Nav/Nav';
import ModelSelect from './pages/ModelSelect/ModelSelect'
import MySelections from './pages/MySelections/MySelections'

function App() {
  const [makerIds, setMakerIds] = useState([])
  const [modelYears, setModelYears] = useState([])
  const [users, setUsers] = useState([])
  const [currLoggedUser,setCurrLoggedUser] = useState({})

  const getIds = async () => {
    const ids  = await carsApi.getAllcarMakes()
    Util.saveToLocalStorage('car-maker-ids', ids.data.Results)
    setMakerIds(ids.data.results)
  }

  const getModelYears = async () => {
    const years = await carsApi.getModelYears()
    Util.saveToLocalStorage('model-years',years.data.results)
  }

  const getUsers = async () => {
    const usersData = await usersApi.getUsers()
    setUsers(usersData.data)
  }

  useEffect(() => {
    const ids = Util.loadFromLocalStorage('car-maker-ids')
    if (ids) setMakerIds(ids) 
    else  getIds()
    const years = Util.loadFromLocalStorage('model-years')
    if (years) setModelYears(years)
    else getModelYears()
    getUsers()
  },[])


  return (
    <div className="App">
      <BrowserRouter>
      <Nav currLoggedUser={currLoggedUser} setCurrLoggedUser={setCurrLoggedUser} />
      <Routes>
        <Route path="/"  element={<Homepage />} />
        <Route path="/select" element={<ModelSelect currLoggedUser={currLoggedUser} modelYears={modelYears} carMakers={makerIds} />} />
        <Route path="/user" element={<MySelections 
                                      getUsers={getUsers}
                                      users={users} 
                                      setUsers={setUsers}
                                      currLoggedUser={currLoggedUser}
                                      setCurrLoggedUser={setCurrLoggedUser} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
