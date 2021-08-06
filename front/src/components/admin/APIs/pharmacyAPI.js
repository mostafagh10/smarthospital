import axios from 'axios';

export const addpharmacyprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/pharmacy' , data , config)

    return response
};

export const editpharmacyprocess = async (data,pharmacyId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/pharmacy/${pharmacyId}` , data , config)

    return response
};

export const getpharmaciesprocess = async () => {
    const response = await axios.get('http://localhost:3500/pharmacy')

    return response
};