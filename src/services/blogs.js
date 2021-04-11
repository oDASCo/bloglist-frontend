import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    let config = {
        headers: {
            Authorization: token,
        }
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: {Authorization: token},
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject, id) => {
    const config = {
        headers: {Authorization: token},
    }

    const response = await axios.put(baseUrl + `/${id}`, newObject, config)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: {Authorization: token},
    }

    const response = await axios.delete(baseUrl + `/${id}`, config)
    return response.data
}


export default {setToken, getAll, create, update, deleteBlog}
