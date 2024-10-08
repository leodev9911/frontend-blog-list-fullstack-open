import axios from 'axios'

let token

const baseUrl = 'http://localhost:8080/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const setToken = (t) => {
    token = t
}

const create = async (newBlog) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

export default { getAll, setToken, create }