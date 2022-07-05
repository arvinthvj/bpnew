import axios, { API_VERSION } from '../config';

export const fetchConfig = () => {
    return axios.get(API_VERSION + 'config', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

export const fetchSettings = () => {
    return axios.get(API_VERSION + 'settings', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

export const fetchCityList = () => {
    return axios.get(API_VERSION + 'cities', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

export const fetchSuccessStories = () => {
    return axios.get(API_VERSION + 'stories', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

export const fetchSuccessStoriesById = (id) => {
    return axios.get(API_VERSION + `stories/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};