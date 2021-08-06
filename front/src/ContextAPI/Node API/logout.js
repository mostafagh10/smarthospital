
import axios from 'axios'
// import { BE_URL } from '../utils/URL'

// type >> 'admin', 'doctor', 'patient'
const logoutUser = async (type , token) => {
    console.log(`Bearer ${token}`);
    try {
        console.log("done2")
        const response = await axios.post(`http://localhost:3500/user/${type}/logout`,{
            token
        })
        console.log("done")
        return response;
    } catch (error) {
        return { status: 500, error: error.message }
    }
}

export default logoutUser