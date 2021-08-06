import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getmedicines , Getmedicine , Deletmedicine} from '../constants/medicineConstant'
import axios from 'axios'

export const GET_MEDICINES = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/medicine')
        dispatch({type:Getmedicines , payload:response.data})
    } catch (err) {
        console.log("getmedicines error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const GET_MEDICINE = (medicineId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/medicine/get/${medicineId}`)
        dispatch({type:Getmedicine , payload:response.data})
    } catch (err) {
        console.log("getmedicine error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const DELETE_MEDICINE = medicineId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/medicine/${medicineId}`)
        dispatch({type:Deletmedicine , payload:response.data})
    } catch (err) {
        console.log("deletemedicine error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}