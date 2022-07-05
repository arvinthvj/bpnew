import axios, { API_VERSION } from '../config';
import { CategoriesList, routes } from '../utility/constants/constants';
import { removeEmptyStringKeys } from '../utility/utility';

const pureAxios = require('axios');

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    defaultErrorHandler: true
}

export const getServicesList = (profileId, categorieId) => {
    // return axios.get(API_VERSION + `services?profile=${profileId}&category=${categorieId}`)
    return axios.get(API_VERSION + `services`)
}

export const getServiceById = (serviceId) => {
    return axios.get(API_VERSION + `services/${serviceId}`)
}

export const getClassifiedById = (classifiedId) => {
    return axios.get(API_VERSION + `classifieds/${classifiedId}`)
}

export const addService = (service) => {

    removeEmptyStringKeys(service);
    return axios.post(API_VERSION + 'services', { service }, headers);
}

export const updateService = (id, service) => {

    removeEmptyStringKeys(service);
    return axios.put(API_VERSION + `services/${id}`, { service }, headers);
}

export const getPresignedUrl = (extentions) => {
    return axios.patch(API_VERSION + `presignedUrl`, { ext: extentions }, headers);
}

export const uploadImageToS3 = (url, arrayBuffer) => {
    return pureAxios.put(url, arrayBuffer);
}

export const deleteService = (id) => {
    return axios.delete(API_VERSION + `services/${id}`, headers);
}

export const deleteDeck = (id) => {
    return axios.delete(API_VERSION + `decks/?deck_id=${id}`, headers);
}

export const toggleActiveOrInactive = (val, id) => {
    const active = val;
    return axios.put(API_VERSION + `services/${id}/toggle`, { active }, headers)
}

export const toggleActiveOrInactiveClassified = (val, id) => {
    const active = val;
    return axios.put(API_VERSION + `classifieds/${id}/toggle`, { active }, headers)
}

export const addPortfolioImages = (profileId, photo_paths, link_url, videoLink) => {
    let portfolio = {
        photo_paths: photo_paths,
        link_url: link_url ? link_url : '',
        video_url: videoLink ? videoLink : ''
    }
    // removeEmptyStringKeys(portfolio);
    return axios.post(API_VERSION + `user/profile/${profileId}/portfolio`, { portfolio }, headers);
}

export const getFeaturedProfile = (profileId) => {
    return axios.get(API_VERSION + `featured/profile/${profileId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const getProfileById = (userId) => {
    //calling profile update api for creating or editing skills
    return axios.get(API_VERSION + `user/${userId}/profiles`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        defaultErrorHandler: true
    });
};

export const getDeckList = () => {
    return axios.get(API_VERSION + `decks`, headers);
}

export const deleteParticularOfferFromDecks = (deckId, offerId) => {
    return axios.delete(API_VERSION + `decks/${deckId}?service_id=${offerId}`, headers);
}

export const createDeck = (deck) => {

    return axios.post(API_VERSION + 'decks', { deck }, headers);
}

export const addServiceToDeck = (deckIds, serviceId, history) => {
    let deck = {
        ids: deckIds.map(d => parseInt(d)),
        service_id: serviceId
    }
    if(history.location.pathname.includes('business')){
        deck = {
            ids: deckIds.map(d => parseInt(d)),
            profile_id: serviceId
        }
    }
    return axios.post(API_VERSION + `decks/add_service`, { deck }, headers)
}

export const getClassifiedList = (profileId) => {
    // return axios.get(API_VERSION + `classifieds?profile=${profileId}`, headers)
    return axios.get(API_VERSION + `classifieds`, headers)
}

export const deleteClassified = (id) => {
    return axios.delete(API_VERSION + `classifieds/${id}`, headers);
}

export const addClassified = (classified) => {
    removeEmptyStringKeys(classified);
    return axios.post(API_VERSION + 'classifieds', { classified }, headers)
}

export const updateClassified = (id, classified) => {
    return axios.put(API_VERSION + `classifieds/${id}`, { classified }, headers);
}

export const updateUserSettings = (settings) => {
    return axios.put(API_VERSION + `user/settings`, settings, headers);
}

export const searchUserByName = (name) => {
    return axios.get(API_VERSION + `user/search?name=${name}`, {}, headers);
}

export const fetchReportedAndBlockedUsers = () => {
    return axios.get(API_VERSION + `user/blocks`, headers);
}
