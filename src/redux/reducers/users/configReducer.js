import { ConfigActionTypes } from '../../actions/usersActions/actionType';
import { array_move, sortAlphabeticalOrder } from '../../../utility/utility';
const cloneDeep = require('clone-deep');

const initialState = {
    skills: [],
    categories: [],
    cities: [],
    compensations: [],
    about_us: [],
    contact_us: [],
    get_started: [],
    links: [],
    privacy_policy: [],
    terms_of_use: [],
    city_list: [],
    isConfigLoading: false,
    success_stories: []
}

const updateObject = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    }
}

export const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case ConfigActionTypes.PULL_CONFIG_PENDING:
            return updateObject(state,
                {
                    isConfigLoading: true
                });
        case ConfigActionTypes.PULL_CONFIG_FULFILLED:
            if (action.payload && action.payload.error) {
                return updateObject(state,
                    {
                        isConfigLoading: false
                    });;
            }
            let { skills } = cloneDeep(action.payload);
            skills = sortAlphabeticalOrder(skills);
             
            let { categories } = cloneDeep(action.payload);
            categories = array_move(categories);

            const { cities } = action.payload;
            const { compensations } = action.payload;
            return updateObject(state,
                {
                    skills: skills,
                    categories: categories,
                    cities: cities,
                    compensations: compensations,
                    isConfigLoading: false
                });

        case ConfigActionTypes.PULL_SETTINGS_FULFILLED:
            if (action.payload.error) {
                return state;
            }
            const { about_us, contact_us, links, get_started, privacy_upload, tos_upload } = action.payload.settings;
            return updateObject(state,
                {
                    about_us: about_us,
                    contact_us: contact_us,
                    get_started: get_started,
                    links: links,
                    privacy_policy: privacy_upload,
                    terms_of_use: tos_upload
                });
        case ConfigActionTypes.PULL_CITY_LIST_FULFILLED:
            if (action.payload.error) {
                return state;
            }
            return updateObject(state,
                {
                    city_list: action.payload.data
                });

        case ConfigActionTypes.PULL_SUCCESS_STORIES_FULFILLED:
            if (action.payload.error) {
                return state;
            }
            return updateObject(state,
                {
                    success_stories: action.payload.stories
                });
        default: return state;
    }
}