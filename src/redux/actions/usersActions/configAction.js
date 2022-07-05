import { ConfigActionTypes } from './actionType';
import * as API from '../../../api/configAPI';
import errorHandler from '../../../utility/errorHandler/errorHandler';

export const config = () => dispatch => dispatch({
    type: ConfigActionTypes.PULL_CONFIG,
    payload: API.fetchConfig()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            errorHandler(error);
            return error;
        })
});

export const settings = () => dispatch => dispatch({
    type: ConfigActionTypes.PULL_SETTINGS,
    payload: API.fetchSettings()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            errorHandler(error);
            return error;
        })
});

export const fetchCityList = () => dispatch => dispatch({
    type: ConfigActionTypes.PULL_CITY_LIST,
    payload: API.fetchCityList()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            errorHandler(error);
            return error;
        })
});

export const fetchSuccessStories = () => dispatch => dispatch({
    type: ConfigActionTypes.PULL_SUCCESS_STORIES,
    payload: API.fetchSuccessStories()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            errorHandler(error);
            return error;
        })
});

export const fetchSuccessStoriesById = (id) => dispatch => dispatch({
    type: ConfigActionTypes.PULL_SUCCESS_STORIES,
    payload: API.fetchSuccessStoriesById(id)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            errorHandler(error);
            return error;
        })
});