import { UserActionType } from '../../actions/usersActions/actionType';
import storage from '../../../utility/storage';


export const initialState = {
    isServiceloading: false,
    isPortfolioLoading: false,
    addOrUpdateOrDeleteServiceLoading: false,
    servicesList: null,
    showAddToDeck: false,
    isDeckLoading: false,
    classifiedList: null,
    isClassifiedloading: false,
    addDeckOrServiceLoading: false,
    addOrUpdateOrDeleteClassifiedLoading: false,
    deckList: null,
    navigateToDetails: false,
    serviceDetail: null,
    receiver: null,
    selectedChatChannel: null,
    blockedByMe: [],
    blockedMe: [],
    reportedByMe: [],
    createClassifiedAddClicked: false,
    manageClassifiedAddClicked: false,
    isUserSettingsLoading: false,
    searchUserByNameResults: [],
    isSearchByNameLoading: false,
    stopRender: false
}

const updateObject = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case UserActionType.GET_SERVICE_LIST_PENDING:

            return updateObject(state, {
                isServiceloading: true
            })
        case UserActionType.GET_SERVICE_LIST_FULFILLED:
            return updateObject(state, {
                isServiceloading: false, servicesList: action.payload
            })

        case UserActionType.UPDATE_CONVERSATION_RECEIVER:

            return updateObject(state, {
                receiver: action.payload
            })

        case UserActionType.UPDATE_SELECTED_CHAT_CHANNEL:
            return updateObject(state, {
                selectedChatChannel: action.payload
            })

        case UserActionType.GET_OFFERS_BY_ID_PENDING:
            return updateObject(state, {
                isServiceloading: true
            })
        case UserActionType.GET_OFFERS_BY_ID_FULFILLED:
            return updateObject(state, {
                isServiceloading: false,
                serviceDetail:
                    action.payload
                        ? action.payload.service
                            ? action.payload.service
                            : action.payload.classified
                        : null
            })

        case UserActionType.ADD_SERVICE_PENDING:

            return updateObject(state, {
                addOrUpdateOrDeleteServiceLoading: true
            })
        case UserActionType.ADD_SERVICE_FULFILLED:

            return updateObject(state, {
                addOrUpdateOrDeleteServiceLoading: false, servicesList: action.payload
            })

        case UserActionType.GET_PROFILE_BY_ID_PENDING:
            return updateObject(state, { isloading: true, isServiceloading: true })
        case UserActionType.GET_PROFILE_BY_ID_FULFILLED:
            return updateObject(state, {
                isloading: false,
                isServiceloading: false,
                serviceDetail:
                    action.payload && action.payload.profile
                        ? { profile: action.payload.profile }
                        : null
            })

        case UserActionType.SEARCH_USER_BY_NAME_PENDING:
            return updateObject(state, { isSearchByNameLoading: true })
        case UserActionType.SEARCH_USER_BY_NAME_FULFILLED:
            return updateObject(state, {
                isSearchByNameLoading: false,
                searchUserByNameResults:
                    action.payload && action.payload.users
                        ? action.payload.users
                        : []
            })

        case UserActionType.UPDATE_SERVICE_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteServiceLoading: true })
        case UserActionType.UPDATE_SERVICE_FULFILLED:
            return updateObject(state, { addOrUpdateOrDeleteServiceLoading: false, servicesList: action.payload })

        case UserActionType.DELETE_SERVICE_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteServiceLoading: true })
        case UserActionType.DELETE_SERVICE_FULFILLED:
            return updateObject(state, { addOrUpdateOrDeleteServiceLoading: false, servicesList: action.payload })


        case UserActionType.GET_SERVICE_PRESIGNED_URL_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteServiceLoading: true })
        case UserActionType.GET_SERVICE_PRESIGNED_URL_FULFILLED:
            return updateObject(state, {})

        case UserActionType.GET_CLASSIFIED_PRESIGNED_URL_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteClassifiedLoading: true })
        case UserActionType.GET_CLASSIFIED_PRESIGNED_URL_FULFILLED:
            return updateObject(state, {})

        case UserActionType.GET_PRESIGNED_URL_PENDING:
            return updateObject(state, { isPortfolioLoading: true })
        // addOrUpdateOrDeleteClassifiedLoading: true, addOrUpdateOrDeleteServiceLoading: true,
        case UserActionType.GET_PRESIGNED_URL_FULFILLED:
            return updateObject(state, { isPortfolioLoading: action.payload && action.payload.stopLoader ? false : true })


        case UserActionType.UPLOAD_IMAGE_TO_S3_PENDING:
            return updateObject(state, { isPortfolioLoading: true })
        case UserActionType.UPLOAD_IMAGE_TO_S3_FULFILLED:
            return updateObject(state, { isPortfolioLoading: action.payload && action.payload.stopLoader ? false : true })


        case UserActionType.ADD_PORTFOLIO_IMAGES_PENDING:
            return updateObject(state, { isPortfolioLoading: true })
        case UserActionType.ADD_PORTFOLIO_IMAGES_FULFILLED:
            return updateObject(state, { isPortfolioLoading: false })

        case UserActionType.UPDATE_TOGGLE_SERVICE:
            if (action.payload.isClassified) {
                return updateObject(state, { servicesList: action.payload.Services })
            } else {
                return updateObject(state, { servicesList: action.payload.Services })
            }
        case UserActionType.TOGGLE_ACTIVE_INACTIVE_SERVICE_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteServiceLoading: true })
        case UserActionType.TOGGLE_ACTIVE_INACTIVE_SERVICE_FULFILLED:
            if (action.payload.isClassified) {
                return updateObject(state, { addOrUpdateOrDeleteServiceLoading: false, classifiedList: action.payload.list })
            } else {
                return updateObject(state, { addOrUpdateOrDeleteServiceLoading: false, servicesList: action.payload.list })
            }

        case UserActionType.GET_PRESIGNED_URL_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteServiceLoading: true, addOrUpdateOrDeleteClassifiedLoading: true })

        case UserActionType.ADD_DECK_CLICKED:
            return updateObject(state, { service: action.payload, showAddToDeck: true })

        case UserActionType.GET_DECK_LIST_PENDING:
            return updateObject(state, { isDeckLoading: true })
        case UserActionType.GET_DECK_LIST_FULFILLED:
            return updateObject(state, { isDeckLoading: false, deckList: action.payload ? action.payload.deckList : null, deck: action.payload ? action.payload.deck : null })

        case UserActionType.CREATE_DECK_PENDING:
            return updateObject(state, { addDeckOrServiceLoading: true })
        case UserActionType.CREATE_DECK_FULFILLED:
            return updateObject(state, { addDeckOrServiceLoading: false, deckList: action.payload })

        case UserActionType.ADD_SERVICE_TO_DECK_PENDING:
            return updateObject(state, { addDeckOrServiceLoading: true })
        case UserActionType.ADD_SERVICE_TO_DECK_FULFILLED:
            return updateObject(state, { addDeckOrServiceLoading: false, deck: action.payload.deck })

        case UserActionType.DELETE_DECK_PENDING:
            return updateObject(state, { addDeckOrServiceLoading: true })
        case UserActionType.DELETE_DECK_FULFILLED:
            return updateObject(state, { addDeckOrServiceLoading: false, deckList: action.payload, deck: null })

        case UserActionType.FILTER_DECK_CLICKED:
            return updateObject(state, { deck: action.payload })

        case UserActionType.GET_CLASSIFIED_LIST_PENDING:
            return updateObject(state, { isClassifiedloading: true, })
        case UserActionType.GET_CLASSIFIED_LIST_FULFILLED:
            return updateObject(state, { isClassifiedloading: false, classifiedList: action.payload })

        case UserActionType.ADD_CLASSIFIED_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteClassifiedLoading: true })
        case UserActionType.ADD_CLASSIFIED_FULFILLED:
            return updateObject(state, { createClassifiedAddClicked: false, addOrUpdateOrDeleteClassifiedLoading: false, classifiedList: action.payload })

        case UserActionType.UPDATE_CLASSIFIED_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteClassifiedLoading: true })
        case UserActionType.UPDATE_CLASSIFIED_FULFILLED:
            return updateObject(state, { addOrUpdateOrDeleteClassifiedLoading: false, classifiedList: action.payload })

        case UserActionType.DELETE_CLASSIFIED_PENDING:
            return updateObject(state, { addOrUpdateOrDeleteClassifiedLoading: true })
        case UserActionType.DELETE_CLASSIFIED_FULFILLED:
            return updateObject(state, { addOrUpdateOrDeleteClassifiedLoading: false, classifiedList: action.payload })

        case UserActionType.NAVIGATE_TO_DETAILS:
            return updateObject(state, {
                navigateToDetails: action.payload ? action.payload.navigateToDetails : false
            })

        case UserActionType.STORE_SERVICE_DETAILS:
            return updateObject(state, {
                serviceDetail: action.payload ? action.payload.details : null
            })

        case UserActionType.GET_FEATURED_PROFILE_PENDING:
            return updateObject(state, {
                isServiceloading: true,
            })

        case UserActionType.GET_FEATURED_PROFILE_FULFILLED:
            return updateObject(state, {
                isServiceloading: false,
                serviceDetail: action.payload ? action.payload.profile : null
            })

        case UserActionType.FETCH_REPORTED_USERS_FULFILLED:
            const { reportedByMe, blockedMe, blockedByMe } = action.payload;
            return updateObject(state, {
                reportedByMe: reportedByMe, blockedMe: blockedMe, blockedByMe: blockedByMe
            })

        case UserActionType.UPDATE_USER_SETTINGS_PENDING:
            return updateObject(state, {
                isUserSettingsLoading: true
            })
        case UserActionType.UPDATE_USER_SETTINGS_FULFILLED:
            return updateObject(state, {
                isUserSettingsLoading: false
            })

        case UserActionType.SEARCH_USER_BY_NAME_EMPTY:
            return updateObject(state, {
                searchUserByNameResults: []
            })

        case UserActionType.CREATE_CLASSIFIED_CLICKED:
            return updateObject(state, {
                manageClassifiedAddClicked: false,
                createClassifiedAddClicked: action.payload
            })

        case UserActionType.MANAGE_CLASSIFIED_CLICKED:
            return updateObject(state, {
                createClassifiedAddClicked: false,
                manageClassifiedAddClicked: action.payload
            })
        default: return state;
    }
}