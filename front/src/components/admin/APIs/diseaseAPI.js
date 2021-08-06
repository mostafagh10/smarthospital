import axios from 'axios';

export const adddiseaseprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/disease' , data , config)

    return response
};

export const getdiseaseprocess = async () => {
    const response = await axios.get('http://localhost:3500/disease')

    return response
};

export const editdiseaseprocess = async (data,diseaseId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/disease/${diseaseId}` , data , config)

    return response
};