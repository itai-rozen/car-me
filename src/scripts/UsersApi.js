import axios from 'axios'
const registeredUsersApi = axios.create({baseURL: 'https://61d17a48da87830017e59262.mockapi.io/cars'})

export default class usersApi {

    static getUsers = () => {
        return registeredUsersApi.get()
    }

    static addUser = (user) => {
        return registeredUsersApi.post('/', user)
    }

    static removeUser = id => {
        return registeredUsersApi.delete(`/${id}`)
    }

    static updateUser = (id, newData) => {
        return registeredUsersApi.put(`/${id}`, newData)
    }
 } 