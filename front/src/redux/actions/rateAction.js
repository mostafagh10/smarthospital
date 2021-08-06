import {Getrates} from '../constants/rateConstant'
import axios from 'axios'


export const GET_Rates = (doctorId,userId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/user/doctor/rate/${doctorId}/${userId}`)
        dispatch({type:Getrates , payload:response.data})
    } catch (err) {
        console.log("getdoctor error is ",err)
    }
}