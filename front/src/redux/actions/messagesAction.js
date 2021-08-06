import {Clearmessages} from '../constants/messagesConstant'

export const Clear_messages = () => dispatch => {
    dispatch({
        type:Clearmessages,
    });
}