import axios, { API_VERSION } from '../config';

export const search = (search) => {
    return axios.get(API_VERSION + `search?${search}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

export const featuredTalent = () => {
    return axios.get(API_VERSION + `featured/profiles`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

export const fetchFAQ = () => {
    return axios.get(API_VERSION + `faqs`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

export const notifyRecepient = (receipientId) => {
    return axios.post(API_VERSION + `messages/notify`, {
        "recipient_id": receipientId
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};