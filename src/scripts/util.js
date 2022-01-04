export default class Util {
    static saveToLocalStorage = (storageName, storageValue) => {
        localStorage.setItem(storageName, JSON.stringify(storageValue))
    }

    static loadFromLocalStorage = storageName => {
        const loadedData =  localStorage.getItem(storageName)
        const parsedData = JSON.parse(loadedData)
        return parsedData ? parsedData : false
    }
}