export default class Util {
    static saveToLocalStorage = (storageName, storageValue) => {
        localStorage.setItem(storageName, JSON.stringify(storageValue))
    }

    static loadFromLocalStorage = storageName => {
        const loadedData =  localStorage.getItem(storageName)
        const parsedData = JSON.parse(loadedData)
        console.log('data after parsing @ util: ',parsedData )
        return parsedData ? parsedData : false
    }
}