import {Getalladmins,Getadmin,Deleteadmin} from '../constants/adminConstant'

const INITIAL_STATE = {
    admins : []
}

const AdminReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getalladmins:
            return{
                ...state,
                admins: action.payload,
            };
        case Getadmin:
            return{
                admin : action.payload,
            };
        case Deleteadmin:
            return{
                admins : state.admins.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default AdminReducer;

