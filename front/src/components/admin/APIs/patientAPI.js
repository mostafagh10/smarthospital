import axios from 'axios';

export const addpatientprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/patient/signup' , data , config)

    return response
};

export const editpatientprocess = async (data,patientId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/user/patient/${patientId}` , data , config)

    return response
};

export const getpatientsprocess = async () => {
    const response = await axios.get('http://localhost:3500/user/patient')

    return response
};

export const loginpatientprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }

    const response = await axios.post('http://localhost:3500/user/patient/login', data , config)

    return response
};

export const logoutdataprocess = async () => {

    const response = await axios.post('http://localhost:3500/user/patient/login')

    return response
};