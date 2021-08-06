import axios from 'axios';

export const addadminprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/admin/signup' , data , config)

    return response
};

export const editadminprocess = async (data,adminId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/user/admin/${adminId}` , data , config)

    return response
};

export const getadminsprocess = async () => {
    const response = await axios.get('http://localhost:3500/user/admin')

    return response
};

export const getadminssearchprocess = async (data) => {

    const response = await axios.get('http://localhost:3500/user/admin/find',data)

    return response
};