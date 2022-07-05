import { OffersActionsTypes, UserActionType } from './actionType';
import * as API from '../../../api/userAPI';
import storage from '../../../utility/storage';
import { toastMsg, closeModel } from '../../../utility/utility';
import { routes, STATUS } from '../../../utility/constants/constants';
import store from '../../../redux/store/store';
import { updatePortfolio } from './profileAction';
import { fetchCurrentUser } from './authAction';
const cloneDeep = require('clone-deep');

function getHistory() {
    const storeState = store.getState();
    const history = storeState.historyReducer.history;
    return history;
}

export const getServicesList = (profileId, categorieId) => dispatch => dispatch({
    type: UserActionType.GET_SERVICE_LIST,
    payload: API.getServicesList(profileId, categorieId)
        .then(response => {
            if (!response.data.error) {
                return response.data.services
            }
        })
        .catch(error => {
            console.log(error);
        })
})

export const updateConversationReceiver = (receiver) => {
    return {
        type: UserActionType.UPDATE_CONVERSATION_RECEIVER,
        payload: receiver
    }
}

export const updateSelectedChatChannel = (channel) => {
    return {
        type: UserActionType.UPDATE_SELECTED_CHAT_CHANNEL,
        payload: channel
    }
}

export const getServiceById = (serviceId) => dispatch => dispatch({
    type: UserActionType.GET_OFFERS_BY_ID,
    payload: API.getServiceById(serviceId)
        .then(response => {
            if (!response.data.error) {
                return response.data
            }
        })
        .catch(error => {
            console.log(error);
        })
})

export const getClassifiedById = (classifiedId) => dispatch => dispatch({
    type: UserActionType.GET_OFFERS_BY_ID,
    payload: API.getClassifiedById(classifiedId)
        .then(response => {
            if (!response.data.error) {
                return response.data
            }
        })
        .catch(error => {
            console.log(error);
        })
})

export const addService = (service) => {
    return (dispatch, getState) => {
        const servicesList = cloneDeep(getState().userReducer.servicesList);
        dispatch({
            type: UserActionType.ADD_SERVICE,
            payload: API.addService(service)
                .then(response => {
                    if (!response.data.error) {
                        servicesList.push(response.data.service[0]);
                        return servicesList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const addServiceWithImages = (service, extentions, arrayBuffer) => {
    let photo_paths = [];
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.GET_SERVICE_PRESIGNED_URL,
            payload: API.getPresignedUrl(extentions)
                .then(response => {
                    if (!response.data.error) {
                        let totalAttachments = 0;
                        const presigned_urls = response.data.urls;
                        if (service.defaultBase64Index) {
                            service.default_image_path = presigned_urls[service.defaultBase64Index].photo_path
                            delete service.defaultBase64Index
                        }
                        presigned_urls.forEach((url, i) => {
                            dispatch({
                                type: UserActionType.UPLOAD_IMAGE_TO_S3,
                                payload: API.uploadImageToS3(url.presigned_url, arrayBuffer[i])
                                    .then(response => {
                                        photo_paths.push(url.photo_path);
                                        if (service.profilePicPath) {
                                            photo_paths.push(service.profilePicPath)
                                            delete service.profilePicPath
                                        }
                                        totalAttachments++;
                                        if (presigned_urls.length === totalAttachments) {
                                            service['photo_paths'] = photo_paths;
                                            dispatch(addService(service))
                                        }
                                        return { stopLoader: true }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return { stopLoader: true }
                                    })
                            })
                        })
                    }
                })
        })
    }
}

export const updateService = (id, service) => {
    return (dispatch, getState) => {
        const servicesList = cloneDeep(getState().userReducer.servicesList);
        dispatch({
            type: UserActionType.UPDATE_SERVICE,
            payload: API.updateService(id, service)
                .then(response => {
                    if (!response.data.error) {
                        const service = cloneDeep(response.data.service);
                        const index = servicesList.findIndex(s => s.id === service.id)
                        servicesList[index] = service;

                        return servicesList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const updateServiceWithImage = (id, service, extentions, arrayBuffer) => {
    let photo_paths = [];
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.GET_SERVICE_PRESIGNED_URL,
            payload: API.getPresignedUrl(extentions)
                .then(response => {
                    if (!response.data.error) {
                        let totalAttachments = 0;
                        const presigned_urls = response.data.urls;
                        if (service.defaultBase64Index) {
                            service.default_image_path = presigned_urls[service.defaultBase64Index].photo_path
                            delete service.defaultBase64Index
                        }
                        presigned_urls.forEach((url, i) => {
                            dispatch({
                                type: UserActionType.UPLOAD_IMAGE_TO_S3,
                                payload: API.uploadImageToS3(url.presigned_url, arrayBuffer[i])
                                    .then(response => {
                                        photo_paths.push(url.photo_path);
                                        if (service.profilePicPath) {
                                            photo_paths.push(service.profilePicPath)
                                            delete service.profilePicPath
                                        }
                                        totalAttachments++;
                                        if (presigned_urls.length === totalAttachments) {
                                            service['new_photo_paths'] = photo_paths;
                                            dispatch(updateService(id, service))
                                        }
                                        return { stopLoader: true }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return { stopLoader: true }
                                    })
                            })
                        })
                    }
                })
        })
    }
}

export const deleteService = (id) => {
    return (dispatch, getState) => {
        const servicesList = cloneDeep(getState().userReducer.servicesList);
        dispatch({
            type: UserActionType.DELETE_SERVICE,
            payload: API.deleteService(id)
                .then(response => {
                    if (!response.data.error) {
                        const index = servicesList.findIndex(s => s.id === id)
                        servicesList.splice(index, 1);
                        return servicesList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const updateToggleService = (val, id, servicesList) => {
    const Services = cloneDeep(servicesList);
    const index = Services.findIndex(service => service.id === id);
    Services[index].active_status = val ? STATUS.ACTIVE : STATUS.IN_ACTIVE;
    let history = getHistory()
    let isClassified = false
    if (history.location.pathname.includes(routes.CLASSIFIEDS)) {
        isClassified = true
    }
    return {
        type: UserActionType.UPDATE_TOGGLE_SERVICE,
        payload: {
            Services: Services,
            isClassified: isClassified
        }
    }
}

export const toggleActiveOrInactive = (val, id) => {
    return (dispatch, getState) => {
        const servicesList = cloneDeep(getState().userReducer.servicesList);
        const classifiedList = cloneDeep(getState().userReducer.classifiedList)
        let history = getHistory()
        if (history.location.pathname.includes(routes.CLASSIFIEDS)) {
            dispatch(updateToggleService(val, id, classifiedList));
            dispatch({
                type: UserActionType.TOGGLE_ACTIVE_INACTIVE_SERVICE,
                payload: API.toggleActiveOrInactiveClassified(val, id)
                    .then(response => {
                        console.log(response, "responseToggle")
                        if (!response.data.error && !response.data.code) {
                            const index = classifiedList.findIndex(classified => classified.id === id);
                            classifiedList[index] = response.data.classified;
                            return { list: [...classifiedList], isClassified: true };
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
        } else {
            dispatch(updateToggleService(val, id, servicesList));
            dispatch({
                type: UserActionType.TOGGLE_ACTIVE_INACTIVE_SERVICE,
                payload: API.toggleActiveOrInactive(val, id)
                    .then(response => {
                        if (!response.data.error && !response.data.code) {
                            const index = servicesList.findIndex(service => service.id === id);
                            servicesList[index] = response.data.service;
                            return { list: [...servicesList], isClassified: false };
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
        }
    }
}

export const addPortfolioImages = (profileId, photo_paths, link_url, videoLink) => {

    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.ADD_PORTFOLIO_IMAGES,
            payload: API.addPortfolioImages(profileId, photo_paths, link_url, videoLink)
                .then(response => {
                    if (!response.data.code) {
                        const history = getHistory();
                        dispatch(fetchCurrentUser())
                            .then(response => {
                                console.log(response)
                            }).catch(error => {
                                console.log(error)
                            })
                        if (history.location.pathname.includes(routes.ADD_PORTFOLIO)) {
                            history.push(routes.ADD_SKILLS, { isSigningUp: true })
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}


export const getProfileById = (userId, profileId) => dispatch => dispatch({
    type: UserActionType.GET_PROFILE_BY_ID,
    payload: API.getProfileById(userId)
        .then(response => {
            //  
            let selectedProfile = null
            if (response.data.profiles && response.data.profiles.length > 0) {
                response.data.profiles.map((profile, index) => {
                    if (profile.id.toString() === profileId) {
                        selectedProfile = profile
                    }
                })
            }
            return { ...response.data, profile: selectedProfile }
        }).catch(error => {

            return error
        })
})

export const getFeaturedProfile = (profileId) => dispatch => dispatch({
    type: UserActionType.GET_FEATURED_PROFILE,
    payload: API.getFeaturedProfile(profileId)
        .then(response => {
            return response.data
        }).catch(error => {

            return error
        })
})

export const getPortfolioPresignedUrls = (profileId, extentions, arrayBuffer, portfolioId, link_url, videoLink) => {
    let photo_paths = [];
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.GET_PRESIGNED_URL,
            payload: API.getPresignedUrl(extentions)
                .then(response => {
                    if (!response.data.error) {
                        let totalAttachments = 0;
                        const presigned_urls = response.data.urls;
                        presigned_urls.forEach((url, i) => {
                            dispatch({
                                type: UserActionType.UPLOAD_IMAGE_TO_S3,
                                payload: API.uploadImageToS3(url.presigned_url, arrayBuffer[i])
                                    .then(response => {
                                        photo_paths.push(url.photo_path);
                                        totalAttachments++;
                                        if (presigned_urls.length === totalAttachments) {
                                            if (portfolioId) {
                                                dispatch(updatePortfolio(profileId, portfolioId, { portfolio: { new_photo_paths: photo_paths, link_url: link_url, videoLink: videoLink } }))
                                                return { stopLoader: true }
                                            } else {
                                                if (link_url || link_url !== '' || videoLink || videoLink !== '') {
                                                    dispatch(addPortfolioImages(profileId, photo_paths, link_url, videoLink))
                                                } else {
                                                    dispatch(addPortfolioImages(profileId, photo_paths))
                                                }
                                                return { stopLoader: false }
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return { stopLoader: true }
                                    })
                            })
                        })
                    }
                    if (portfolioId) {
                        return { stopLoader: false }
                    } else {
                        return { stopLoader: false }
                    }
                }).catch(error => {
                    return { stopLoader: true }
                })
        })
    }
}

export const addDeckClicked = (service) => {
    return {
        type: UserActionType.ADD_DECK_CLICKED,
        payload: service
    }
}

export const deleteParticularOfferFromDeckList = (deckId, offerId) => {
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.DELETE_PARTICULAR_OFFER_FROM_DECKS,
            payload: API.deleteParticularOfferFromDecks(deckId, offerId)
                .then(response => {
                    if (!response.data.error || !response.data.code) {
                        dispatch(getDeckList())
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const getDeckList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.GET_DECK_LIST,
            payload: API.getDeckList()
                .then(response => {
                    if (!response.data.error || !response.data.code) {
                        const deckList = cloneDeep(response.data.decks);
                        const deck = getState().userReducer.deck;

                        if (deck) {
                            const index = deckList.findIndex(d => d.id === deck.id);
                            return { deckList, deck: deckList[index] }
                        } else {
                            return { deckList, deck: null }
                        }

                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const addServiceToDeck = (deckIds, serviceId, resetForm) => {
    return (dispatch, getState) => {
        let history = getHistory()
        dispatch({
            type: UserActionType.ADD_SERVICE_TO_DECK,
            payload: API.addServiceToDeck(deckIds, serviceId, history)
                .then(response => {
                    if (!response.data.error) {
                        let deckList = getState().userReducer.deckList;
                        const index = deckList.findIndex(deck => deck.id === parseInt(deckIds[0]));
                        const history = getHistory();
                        // history.push(routes.DECKS);
                        closeModel();
                        resetForm();
                        return { deck: deckList[index] }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const createDeck = (deck, serviceId, resetForm) => {

    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.CREATE_DECK,
            payload: API.createDeck(deck.deck)
                .then(response => {

                    if (!response.data.error) {
                        let DeckList = getState().userReducer.deckList;

                        deck.deckId.unshift(response.data.deck.id);
                        dispatch(addServiceToDeck(deck.deckId, serviceId, resetForm));
                        DeckList.push(response.data.deck);
                        return DeckList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const deleteDeck = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.DELETE_DECK,
            payload: API.deleteDeck(id)
                .then(response => {
                    if (!response.data.error || !response.data.code) {
                        const deckList = cloneDeep(getState().userReducer.deckList);
                        const index = deckList.findIndex(deck => deck.id === parseInt(id));
                        deckList.splice(index, 1);
                        return deckList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const filterDeckClicked = (deck) => {
    return {
        type: UserActionType.FILTER_DECK_CLICKED,
        payload: deck
    }
}

export const getClassifiedList = (profileId) => {
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.GET_CLASSIFIED_LIST,
            payload: API.getClassifiedList(profileId)
                .then(response => {
                    if (!response.data.error) {
                        return response.data.classifieds
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}


export const updateClassified = (id, classified) => {
    return (dispatch, getState) => {
        const classifiedList = cloneDeep(getState().userReducer.classifiedList);
        dispatch({
            type: UserActionType.UPDATE_CLASSIFIED,
            payload: API.updateClassified(id, classified)
                .then(response => {
                    if (!response.data.error) {

                        const classified = cloneDeep(response.data.classified);
                        const index = classifiedList.findIndex(c => c.id === classified.id)
                        classifiedList[index] = classified;

                        return classifiedList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

}

export const updateClassifiedWithImages = (id, classified, extentions, arrayBuffer) => {
    let photo_paths = [];
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.GET_CLASSIFIED_PRESIGNED_URL,
            payload: API.getPresignedUrl(extentions)
                .then(response => {
                    if (!response.data.error) {
                        let totalAttachments = 0;
                        const presigned_urls = response.data.urls;
                        presigned_urls.forEach((url, i) => {
                            dispatch({
                                type: UserActionType.UPLOAD_IMAGE_TO_S3,
                                payload: API.uploadImageToS3(url.presigned_url, arrayBuffer[i])
                                    .then(response => {
                                        photo_paths.push(url.photo_path);
                                        if (classified.profilePicPath) {
                                            photo_paths.push(classified.profilePicPath)
                                            delete classified.profilePicPath
                                        }
                                        totalAttachments++;
                                        if (presigned_urls.length === totalAttachments) {
                                            classified['new_photo_paths'] = photo_paths;

                                            dispatch(updateClassified(id, classified))
                                        }
                                        return { stopLoader: true }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return { stopLoader: true }
                                    })
                            })
                        })
                    }
                })
        })
    }
}



export const addClassifiedWithImages = (classified, extentions, arrayBuffer) => {
    let photo_paths = [];
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.GET_CLASSIFIED_PRESIGNED_URL,
            payload: API.getPresignedUrl(extentions)
                .then(response => {
                    if (!response.data.error) {
                        let totalAttachments = 0;
                        const presigned_urls = response.data.urls;
                        presigned_urls.forEach((url, i) => {
                            dispatch({
                                type: UserActionType.UPLOAD_IMAGE_TO_S3,
                                payload: API.uploadImageToS3(url.presigned_url, arrayBuffer[i])
                                    .then(response => {
                                        photo_paths.push(url.photo_path);
                                        totalAttachments++;
                                        if (presigned_urls.length === totalAttachments) {
                                            classified['photo_paths'] = photo_paths;
                                            dispatch(addClassified(classified))
                                        }
                                        return { stopLoader: true }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return { stopLoader: true }
                                    })
                            })
                        })
                    }
                })
        })
    }
}


export const addClassified = (classified) => {

    return (dispatch, getState) => {
        const classifiedList = cloneDeep(getState().userReducer.classifiedList);
        dispatch({
            type: UserActionType.ADD_CLASSIFIED,
            payload: API.addClassified(classified)
                .then(response => {
                    if (!response.data.error) {
                        classifiedList.push(response.data.classified[0]);
                        return classifiedList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const deleteClassified = (id) => {
    return (dispatch, getState) => {
        const classifiedList = cloneDeep(getState().userReducer.classifiedList);
        dispatch({
            type: UserActionType.DELETE_CLASSIFIED,
            payload: API.deleteClassified(id)
                .then(response => {
                    if (!response.data.error) {
                        const index = classifiedList.findIndex(c => c.id === id)
                        classifiedList.splice(index, 1);
                        return classifiedList;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const navigateToDetails = (flag) => {
    return (dispatch) => {
        dispatch({
            type: UserActionType.NAVIGATE_TO_DETAILS,
            payload: {
                navigateToDetails: flag
            }
        })
    }
}

export const storeServiceDetails = (details) => {
    return (dispatch) => {
        dispatch({
            type: UserActionType.STORE_SERVICE_DETAILS,
            payload: {
                details: details
            }
        })
    }
}

export const searchUserByNameEmpty = () => {
    return (dispatch) => {
        dispatch({
            type: UserActionType.SEARCH_USER_BY_NAME_EMPTY,
            payload: {
                makeSearchUserResultsEmpty: true
            }
        })
    }
}

export const fetchReportedUsers = () => dispatch => dispatch({
    type: UserActionType.FETCH_REPORTED_USERS,
    payload: API.fetchReportedAndBlockedUsers()
        .then(response => {
            if (!response.data.error) {
                return response.data
            }
        })
        .catch(error => {
            console.log(error);
        })
})

export const updateUserSettings = (setting) => {
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.UPDATE_USER_SETTINGS,
            payload: API.updateUserSettings(setting)
                .then(response => {
                    dispatch(fetchCurrentUser())
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                })
        })
    }
}

export const searchUserByName = (name) => {
    return (dispatch, getState) => {
        dispatch({
            type: UserActionType.SEARCH_USER_BY_NAME,
            payload: API.searchUserByName(name)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                })
        })
    }
}

export const createClassifiedAddClicked = (val) => {

    return {
        type: UserActionType.CREATE_CLASSIFIED_CLICKED,
        payload: val
    }
}


export const manageClassifiedAdd = (val) => {

    return {
        type: UserActionType.MANAGE_CLASSIFIED_CLICKED,
        payload: val
    }
}

export const setSelectedCategory = (selectedCategory) => {
    return {
        type: OffersActionsTypes.SET_SELECTED_CATEGORY,
        payload: selectedCategory
    }
}