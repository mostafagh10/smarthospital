import axios from 'axios';

export const adddoctorprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/doctor/signup' , data , config)

    return response
};

export const editdoctorprocess = async (data,doctorId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/user/doctor/${doctorId}` , data , config)

    return response
};

export const getdoctorsprocess = async () => {
    const response = await axios.get('http://localhost:3500/user/doctor')

    return response
};

export const getrequestsprocess = async () => {
    const response = await axios.get('http://localhost:3500/user/doctor/request')

    return response
};