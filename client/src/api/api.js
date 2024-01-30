import { API_URL } from './constants'

/**
 * 
 * @param {Object} options 
 * @param {string} options.url 
 * @param {'get'|'post'} options.method 
 * @param {FormData?} options.body 
 */
const api = async ({
    url,
    method = 'get',
    body,
    ...rest
}) => {
    const response = await fetch(`${API_URL}${url}`, {
        method,
        body: body,
        ...rest
    })

    if (response.ok) {
        return await response.json()
    } else {
        throw response
    }
}

export default api