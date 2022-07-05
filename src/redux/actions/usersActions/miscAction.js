import { HistoryActionTypes, MiscActionTypes } from './actionType';
import * as API from '../../../api/miscApi'

export const addHistory = (history) => dispatch => {
    dispatch({ type: HistoryActionTypes.ADD_HISTORY, payload: history });
}

export const search = (search) => dispatch => dispatch({
    type: MiscActionTypes.SEARCH,
    payload: API.search(search)
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                //Push to search result route
                console.log(response)
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const loadMore = (search) => dispatch => dispatch({
    type: MiscActionTypes.LOAD_MORE,
    payload: API.search(search)
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                //Push to search result route
                console.log(response)
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const featuredTalent = () => dispatch => dispatch({
    type: MiscActionTypes.FEATURED_TALENT,
    payload: API.featuredTalent()
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                //Push to search result route
                console.log(response)
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const fetchFAQ = () => dispatch => dispatch({
    type: MiscActionTypes.FETCH_FAQ,
    payload: API.fetchFAQ()
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                //Push to search result route
                console.log(response)
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const shuffleSearchResults = (shuffleResultArray) => dispatch => dispatch({
    type: MiscActionTypes.SHUFFLE_SEARCH_RESULTS,
    payload: {
        shuffleResultArray: shuffleResultArray
    }
})


export const shareURL = (url, service) => dispatch => dispatch({
    type: MiscActionTypes.SHARE_URL,
    payload: {
        shareURL: url,
        service: service
    }
})


export const updatedIsSharingViaMsg = (isSharingViaMsg) => dispatch => dispatch({
    type: MiscActionTypes.IS_SHARING_VIA_MSG,
    payload: {
        isSharingViaMsg: isSharingViaMsg,
    }
})

export const showImageCropModal = (imageCropParams) => dispatch => dispatch({
    type: MiscActionTypes.SHOW_IMAGE_CROP_MODAL,
    payload: {
        imageCropParams: imageCropParams
    }
})

export const storeUserSearch = (userSearch) => dispatch => dispatch({
    type: MiscActionTypes.STORE_USER_SEARCH,
    payload: {
        userSearch: userSearch
    }
})

export const storeFullDescription = (description, descriptionTitle) => dispatch => dispatch({
    type: MiscActionTypes.STORE_FULL_DESCRIPTION,
    payload: {
        description: description,
        descriptionTitle: descriptionTitle
    }
})
