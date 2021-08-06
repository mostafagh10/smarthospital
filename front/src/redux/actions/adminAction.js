import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getalladmins,Getadmin,Deleteadmin} from '../constants/adminConstant'
import axios from 'axios'

export const GET_ALLADMINS = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/user/admin')
        dispatch({type:Getalladmins , payload:response.data})
    } catch (err) {
        console.log("getalladmins error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const GET_ADMIN = (adminId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/user/admin/get/${adminId}`)
        dispatch({type:Getadmin , payload:response.data})
    } catch (err) {
        console.log("getadmin error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const DELETE_ADMIN = adminId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/user/admin/${adminId}`)
        dispatch({type:Deleteadmin , payload:response.data})
    } catch (err) {
        console.log("deleteadmin error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}