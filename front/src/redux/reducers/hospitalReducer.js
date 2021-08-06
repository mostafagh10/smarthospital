import {Gethospitals , Gethospital , DeleteHospital} from '../constants/hospitalConstant'

const INITIAL_STATE = {
    hospitals : []
}

const HospitalReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Gethospitals:
            return{
                ...state,
                hospitals: action.payload,
            };
        case Gethospital:
            return{
                hospital : action.payload,
            };
        case DeleteHospital:
            return{
                hospitals : state.hospitals.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default HospitalReducer;

