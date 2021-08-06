import axios from 'axios';

export const addmedicineprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/medicine' , data , config)

    return response
};

export const editmedicineprocess = async (data,medicineId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/medicine/${medicineId}` , data , config)

    return response
};

export const getmedicinesprocess = async () => {
    const response = await axios.get('http://localhost:3500/medicine')

    return response
};