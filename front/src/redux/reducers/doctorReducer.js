import {Getdoctors , Getdoctor, Deletedoctor} from '../constants/doctorConstant'

const INITIAL_STATE = {
    doctors : []
}

const DoctorReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getdoctors:
            return{
                ...state,
                doctors: action.payload,
            };
        /*
        case Getrequests:
            return{
                ...state,
                doctors: action.payload,
        };
        case Approverequest:
            return{
                ...state,
                doctors: action.payload,
        };
        */
        case Getdoctor:
            return{
                doctor : action.payload,
            };
        case Deletedoctor:
            return{
                doctors : state.doctors.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default DoctorReducer;

