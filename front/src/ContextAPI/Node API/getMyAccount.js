
import axios from 'axios'
// import { BE_URL } from '../utils/URL'

const getMyAccount = async (token, type) => {
  try {
    const response = await axios.post(`http://localhost:3500/user/${type}/me`, {
      token
    })
    return response;
  } catch (error) {
    return { status: 500, error: error.message }
  }
}

export default getMyAccount;