
import axios from 'axios'
// import { BE_URL } from '../utils/URL'

// type >> 'admin', 'doctor', 'patient'
const registerUser = async (data, type) => {
    try {
        const response = await axios.post(`http://localhost:3500/user/${type}/signup`, data)
        return response
    } catch (error) {
        return { status: 500, error: error.message }
    }
}

export default registerUser