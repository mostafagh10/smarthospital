import {Getmedicines , Getmedicine , Deletmedicine} from '../constants/medicineConstant'

const INITIAL_STATE = {
    medicines : []
}

const MedicineReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getmedicines:
            return{
                ...state,
                medicines: action.payload,
            };
        case Getmedicine:
            return{
                medicine : action.payload,
            };
        case Deletmedicine:
            return{
                medicines : state.medicines.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default MedicineReducer;

