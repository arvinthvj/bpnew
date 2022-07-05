import { combineReducers } from 'redux';
import { authReducer } from './users/authReducer';
import { configReducer } from './users/configReducer'
import { profileReducer } from './users/profileReducer'
import { historyReducer } from './users/historyReducer'
import { miscReducer } from './users/miscReducer'
import { userReducer } from './users/userReducer';
import { walkThroughReducer } from './users/walkThroughReducer';
import { offersReducer } from "./users/offersReducer";

const reducers = combineReducers({
        authReducer,
        configReducer,
        profileReducer,
        historyReducer,
        miscReducer,
        userReducer,
        walkThroughReducer,
        offersReducer
});

export default reducers;
