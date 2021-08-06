import {Showerrormessage,Showsuccessmessage,Clearmessages} from '../constants/messagesConstant'

const INITIAL_STATE = {
    succesmsg:'',
    failedmsg:''
}

const messageReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Showerrormessage:
            return{
                ...state,
                failedmsg: action.payload
            }
        case Showsuccessmessage:
            return{
                ...state,
                succesmsg: action.payload
            }
        case Clearmessages:
            return{
                succesmsg:'',
                failedmsg:''
            }
        default:
            return state
    }
}

export default messageReducer;