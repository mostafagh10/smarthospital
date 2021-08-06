import {Getspecialization , Getspecializations , Deletespecialization} from '../constants/specializationConstant'

const INITIAL_STATE = {
    specializations : []
}

const SpecializationReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getspecializations:
            return{
                ...state,
                specializations: action.payload,
            };
        case Getspecialization:
            return{
                specialization : action.payload,
            };
        case Deletespecialization:
            return{
                specializations : state.specializations.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default SpecializationReducer;

