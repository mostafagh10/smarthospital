import axios from 'axios';

export const addspecificationprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/specialization' , data , config)

    return response
};

export const getspecializationprocess = async () => {
    const response = await axios.get('http://localhost:3500/specialization')

    return response
};

export const editspecializationprocess = async (data,specializationId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/specialization/${specializationId}` , data , config)

    return response
};