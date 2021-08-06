import {Getpharmacies , Getpharmacy , Deletepharmacy} from '../constants/pharmacyConstant'

const INITIAL_STATE = {
    pharmacies : []
}

const PharmacyReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getpharmacies:
            return{
                ...state,
                pharmacies: action.payload,
            };
        case Getpharmacy:
            return{
                pharmacy : action.payload,
            };
        case Deletepharmacy:
            return{
                pharmacies : state.pharmacies.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default PharmacyReducer;

