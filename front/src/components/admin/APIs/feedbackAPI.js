import axios from 'axios';

export const addfeedbackprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/feedback' , data , config)

    return response
};

export const getfeedbacksprocess = async () => {
    const response = await axios.get('http://localhost:3500/feedback')

    return response
};