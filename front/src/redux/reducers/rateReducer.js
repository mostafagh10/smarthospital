import {Getrates} from '../constants/rateConstant'

const INITIAL_STATE = {
    totalrates : []
}

const RateReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getrates:
            return{
                ...state,
                singlerates: action.payload,
            };
        default:
            return state
    }
}

export default RateReducer;

