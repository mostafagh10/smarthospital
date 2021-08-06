import {Getpatients , Getpatient , Deletepatient} from '../constants/patientConstant'

const INITIAL_STATE = {
    patients : []
}

const PatientReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getpatients:
            return{
                ...state,
                patients: action.payload,
            };
        case Getpatient:
            return{
                patient : action.payload,
            };
        case Deletepatient:
            return{
                patients : state.patients.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default PatientReducer;

