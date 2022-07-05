import { MiscActionTypes } from '../../actions/usersActions/actionType';
import storage from '../../../utility/storage';

export const initialState = {
    searchResult: null,
    isloading: false,
    featuredTalent: null,
    shareURL: null,
    selectedCompensation: [],
    selectedFilter: [],
    selectedQuery: null,
    selectedCity: null,
    selectedClassified: false,
    selectedCompany: false,
    faqs: [],
    fullDescription: null,
    service: null,
    descriptionTitle: null,
    isSharingViaMsg: false,
    error: null,
}

const updateObject = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    }
}

export const miscReducer = (state = initialState, action) => {
    switch (action.type) {

        case MiscActionTypes.SEARCH_PENDING:
            return updateObject(state, { isloading: true });
        case MiscActionTypes.SEARCH_FULFILLED:
            if (action.payload && (action.payload.success || action.payload.success === true)) {
                return updateObject(state, {
                    isloading: false,
                    searchResult: action.payload ? action.payload.services : null,
                    error: null
                });
            } else {
                return updateObject(state, {
                    isloading: false,
                    error: action.payload ? action.payload : null,
                    searchResult: null,
                });
            }

        case MiscActionTypes.FEATURED_TALENT_PENDING:
            return updateObject(state, { isloading: true });
        case MiscActionTypes.FEATURED_TALENT_FULFILLED:
            return updateObject(state, {
                isloading: false,
                featuredTalent: action.payload ? action.payload.profiles : null
            });

        case MiscActionTypes.FETCH_FAQ_PENDING:
            return updateObject(state, { isloading: true });
        case MiscActionTypes.FETCH_FAQ_FULFILLED:
            return updateObject(state, {
                isloading: false,
                faqs: action.payload ? action.payload.faqs : null
            });

        case MiscActionTypes.LOAD_MORE_PENDING:
            return updateObject(state, { isloading: false });
        case MiscActionTypes.LOAD_MORE_FULFILLED:
            console.log(state, "loadmore state")
            if (state.searchResult) {
                return updateObject(state, {
                    isloading: false,
                    searchResult: action.payload ? [...state.searchResult, ...action.payload.services] : null
                });
            }
            else {
                return updateObject(state, {
                    isloading: false,
                    searchResult: action.payload ? action.payload.services : null
                });
            }

        case MiscActionTypes.SHUFFLE_SEARCH_RESULTS:
            return updateObject(state, { searchResult: action.payload ? action.payload.shuffleResultArray : null })

        case MiscActionTypes.SHARE_URL:
            return updateObject(state, {
                shareURL: action.payload ? action.payload.shareURL : null,
                service: action.payload ? action.payload.service : null
            })

        case MiscActionTypes.IS_SHARING_VIA_MSG:
            return updateObject(state, {
                isSharingViaMsg: action.payload.isSharingViaMsg,
            })

        case MiscActionTypes.STORE_FULL_DESCRIPTION:
            return updateObject(state, {
                fullDescription: action.payload ? action.payload.description : null,
                descriptionTitle: action.payload ? action.payload.descriptionTitle : null
            })

        case MiscActionTypes.SHOW_IMAGE_CROP_MODAL:
            return updateObject(state, {
                imageCropParams: action.payload && action.payload.imageCropParams ? action.payload.imageCropParams : null,
            })

        case MiscActionTypes.STORE_USER_SEARCH:
            return updateObject(state, {
                selectedQuery: action.payload && action.payload.userSearch.selectedQuery ? action.payload.userSearch.selectedQuery : null,
                selectedCity: action.payload && action.payload.userSearch.selectedCity ? action.payload.userSearch.selectedCity : null,
                selectedClassified: action.payload && action.payload.userSearch.selectedClassified ? action.payload.userSearch.selectedClassified : false,
                selectedCompany: action.payload && action.payload.userSearch.selectedCompany ? action.payload.userSearch.selectedCompany : false,
                selectedCompensation: action.payload && action.payload.userSearch.selectedCompensation ? action.payload.userSearch.selectedCompensation : [],
                selectedFilter: action.payload && action.payload.userSearch.selectedFilter ? action.payload.userSearch.selectedFilter : [],
                searchResult: action.payload && (action.payload.isUserLoggedOut || action.payload.userSearch.clearSearchResults) ? null : state.searchResult
            })

        default: return state;
    }
}