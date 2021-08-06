import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getrequests , Approverequest} from '../constants/requestConstant'
import axios from 'axios'

export const GET_REQUESTS = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/user/doctor/request')
        dispatch({type:Getrequests , payload:response.data})
    } catch (err) {
        console.log("getrequests error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}

/*
export const APPROVE_REQUEST = (doctorId) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:3500/user/doctor/activate-status/${doctorId}`)
        dispatch({type:Approverequest , payload:response.data})
    } catch (err) {
        console.log("approverequest error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
*/

export const APPROVE_REQUEST = (doctorId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/user/doctor/activate-status/${doctorId}`)
        dispatch({type:Approverequest , payload:response.data})
    } catch (err) {
        console.log("approverequest error is ",err)
    }
}