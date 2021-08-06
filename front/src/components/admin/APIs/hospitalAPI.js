import axios from 'axios';

export const addhospitalprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/hospital' , data , config)

    return response
};

export const edithospitalprocess = async (data,hospitalId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/hospital/${hospitalId}` , data , config)

    return response
};

export const gethospitalprocess = async () => {
    const response = await axios.get('http://localhost:3500/hospital')

    return response
};

