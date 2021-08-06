import {Getfeedbacks} from '../constants/feedbackConstant'

const INITIAL_STATE = {
    feedbacks : []
}

const FeedbackReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getfeedbacks:
            return{
                ...state,
                feedbacks: action.payload,
            };
        default:
            return state
    }
}

export default FeedbackReducer;

