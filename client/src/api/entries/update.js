import { LOCAL_STORAGE_KEY } from '../constants'

export default (index, data) => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]')
    saved[index] = data
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved))
}