import axios, { API_VERSION } from '../config';
import { API_ADMIN as adminAxios } from '../config';
import storage from '../utility/storage';
import pureAxios from 'axios'

export const login = (credentials) => {
    return axios.post(API_VERSION + 'auth/login', credentials, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // defaultErrorHandler: false
    });
};

export const handleWordpressLogin = (credentials) => {
    return axios.get(API_VERSION + `auth/user?login=${credentials}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // defaultErrorHandler: false
    });
};

export const signup = (credentials) => {
    return axios.post(API_VERSION + 'auth/signup', credentials, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const googleAuth = (credentials) => {
    return axios.post(API_VERSION + 'auth/google', credentials, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const fbAuth = (credentials) => {
    return axios.post(API_VERSION + 'auth/facebook', credentials, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};


export const verifyOTP = (code) => {
    return axios.post(API_VERSION + 'auth/verify', code, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const refreshToken = () => {
    let refresh_token = storage.get('refresh_token', null)
    let headers = {
        'Accept': 'application/json',
        'x-refreshtoken': refresh_token
    }
    return axios.post(API_VERSION + 'auth/refresh_token', {}, {
        headers: headers,
        defaultErrorHandler: true
    })
};

export const resendOTP = () => {
    return axios.post(API_VERSION + 'auth/resend', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const fetchCurrentUser = () => {
    return axios.get(API_VERSION + 'user', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const forgotPassword = (email) => {

    return axios.post(API_VERSION + 'auth/forgotpassword', email, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // defaultErrorHandler: false
    });
};

export const resetPassword = (user) => {

    return axios.put(API_VERSION + 'auth/resetpassword', user, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // defaultErrorHandler: false
    });
};

export const updateAccountInfo = (user) => {
    return axios.put(API_VERSION + `user`, user, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // defaultErrorHandler: false
    });
}

export const changePassword = (password) => {
    return axios.put(API_VERSION + `auth/changepassword`, password, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // defaultErrorHandler: false
    });
}

export const refreshAuthToken = (refresh_token) => {
    return axios.post(API_VERSION + 'auth/refresh_token', {}, {
        headers: {
            'x-refreshtoken': refresh_token
        },
        // defaultErrorHandler: false
    });
}


const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    defaultErrorHandler: true
}

export const reportUser = (userId, channel_name) => {

    return axios.put(API_VERSION + `user/${userId}/report`, { "channel_name": channel_name }, headers);
}

export const blockUser = (userId, channel_name) => {

    return axios.put(API_VERSION + `user/${userId}/block`, { "channel_name": channel_name }, headers);
}

export const unblockUser = (userId) => {
    return axios.delete(API_VERSION + `user/${userId}/block`, headers);
}

export const verifyEduEmail = (token) => {
    return axios.post(API_VERSION + `auth/verify_email?token=${token}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const sendEduVerificationEmail = () => {
    return axios.post(API_VERSION + `auth/resend_email`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const signout = () => {
    return axios.post(API_VERSION + `signout`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};
