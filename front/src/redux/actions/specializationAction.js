import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getspecialization , Getspecializations, Deletespecialization} from '../constants/specializationConstant'
import axios from 'axios'

export const GET_SPECIALIZATIONS = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/specialization')
        dispatch({type:Getspecializations , payload:response.data})
    } catch (err) {
        console.log("getspecializations error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}

export const GET_SPECIALIZATION = (specializationId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/specialization/get/${specializationId}`)
        dispatch({type:Getspecialization , payload:response.data})
    } catch (err) {
        console.log("getspecialization error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}

export const DELETE_SPECIALIZATION = specializationId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/specialization/${specializationId}`)
        dispatch({type:Deletespecialization , payload:response.data})
    } catch (err) {
        console.log("deletespecialization error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}