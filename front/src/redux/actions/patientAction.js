import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getpatients , Getpatient , Deletepatient} from '../constants/patientConstant'
import axios from 'axios'

export const GET_PATIENTS = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/user/patient')
        dispatch({type:Getpatients , payload:response.data})
    } catch (err) {
        console.log("getpatients error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const GET_PATIENT = (patientId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/user/patient/get/${patientId}`)
        dispatch({type:Getpatient , payload:response.data})
    } catch (err) {
        console.log("getpatient error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const DELETE_PATIENT = patientId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/user/patient/${patientId}`)
        dispatch({type:Deletepatient , payload:response.data})
    } catch (err) {
        console.log("deletepatient error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}