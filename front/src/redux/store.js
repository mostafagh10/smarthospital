import { combineReducers , applyMiddleware , createStore} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import messageReducer from '../redux/reducers/messagesReducer'
import SpecializationReducer from '../redux/reducers/specializationReducer'
import DiseaseReducer from '../redux/reducers/diseaseReducer'
import AdminReducer from '../redux/reducers/adminReducer'
import DoctorReducer from '../redux/reducers/doctorReducer'
import HospitalReducer from '../redux/reducers/hospitalReducer'
import PharmacyReducer from '../redux/reducers/pharmacyReducer'
import MedicineReducer from '../redux/reducers/medicineReducer'
import PatientReducer from '../redux/reducers/patientReducer'
import ReduestReducer from '../redux/reducers/requestReducer'
import FeedbackReducer from '../redux/reducers/feedbackReducer'
import RateReducer from '../redux/reducers/rateReducer'

const reducer = combineReducers({
    messages : messageReducer,
    specializations : SpecializationReducer,
    diseases : DiseaseReducer,
    admins:AdminReducer,
    doctors:DoctorReducer,
    hospitals:HospitalReducer,
    pharmacies:PharmacyReducer,
    medicines:MedicineReducer,
    patients:PatientReducer,
    requests:ReduestReducer,
    feedbacks:FeedbackReducer,
    totalrates:RateReducer
})

const initialstate = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))   
)

export default store;
