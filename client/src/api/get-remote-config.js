import api from './api'

export default () => {
    return api({ url: '/config' })
}