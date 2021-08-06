import {Getdisease , Getdiseases , Deletedisease} from '../constants/diseasesConstant'

const INITIAL_STATE = {
    diseases : []
}

const DiseaseReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getdiseases:
            return{
                ...state,
                diseases: action.payload,
            };
        case Getdisease:
            return{
                disease : action.payload,
            };
        case Deletedisease:
            return{
                diseases : state.diseases.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default DiseaseReducer;

