import {Getrequests , Approverequest} from '../constants/requestConstant'

const INITIAL_STATE = {
    requests : []
}

const ReduestReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getrequests:
            return{
                ...state,
                requests: action.payload,
        };
        case Approverequest:
            return{
                ...state,
                requests: action.payload,
        };
        default:
            return state
    }
}

export default ReduestReducer;

