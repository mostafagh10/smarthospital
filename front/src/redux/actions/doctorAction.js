import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getdoctors , Getdoctor , Deletedoctor} from '../constants/doctorConstant'
import axios from 'axios'

export const GET_DOCTORS = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/user/doctor')
        dispatch({type:Getdoctors , payload:response.data})
    } catch (err) {
        console.log("getdoctors error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const GET_DOCTOR = (doctorId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/user/doctor/get/${doctorId}`)
        dispatch({type:Getdoctor , payload:response.data})
    } catch (err) {
        console.log("getdoctor error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}

/*
export const DELETE_DOCTOR = doctorId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/user/doctor/${doctorId}`)
        dispatch({type:Deletedoctor , payload:response.data})
    } catch (err) {
        console.log("deletedoctor error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
*/

export const DELETE_DOCTOR = doctorId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/user/doctor/reject/${doctorId}`)
        dispatch({type:Deletedoctor , payload:response.data})
    } catch (err) {
        console.log("deletedoctor error is ",err)
    }
}