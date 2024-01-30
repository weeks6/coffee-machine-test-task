import { LOCAL_STORAGE_KEY } from '../constants'

export default ({
    machine,
    beverages
}) => {

    /**
     * @type {Array}
     */
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]')

    saved.push({
        machine,
        beverages,
        count: 1
    })

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved))
}