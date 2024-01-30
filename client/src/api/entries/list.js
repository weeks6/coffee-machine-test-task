import { LOCAL_STORAGE_KEY } from '../constants'

/**
 * @returns {Array}
 */
export default () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]')
}