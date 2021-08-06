import axios from 'axios';

/*           patient                    */
export const sendverificationcodeprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/patient/password/forget' , data , config)

    return response
};


export const confirmverificationcodeprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/patient/password/code/verification' , data , config)

    return response
};

export const confirmpasswordprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/patient/password/reset' , data , config)

    return response
};

/* --------------------------------------------------------------------------------------------------- */

/*                    doctor                               */
export const doctorsendverificationcodeprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/doctor/password/forget' , data , config)

    return response
};


export const doctorconfirmverificationcodeprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/doctor/password/code/verification' , data , config)

    return response
};

export const doctorconfirmpasswordprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/doctor/password/reset' , data , config)

    return response
};

/* --------------------------------------------------------------------------------------------------- */

/*                    admin                               */


export const adminsendverificationcodeprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/admin/password/forget' , data , config)

    return response
};


export const adminconfirmverificationcodeprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/admin/password/code/verification' , data , config)

    return response
};

export const adminconfirmpasswordprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/admin/password/reset' , data , config)

    return response
};