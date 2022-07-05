import { Categories } from '../../../utility/constants/constants';
import { OffersActionsTypes } from '../../actions/usersActions/actionType';

const initialState = {
    selected_category: [{ value : Categories.MY_SERVICES}],
}

const updateObject = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    }
}

export const offersReducer = (state = initialState, action) => {
    switch (action.type) {
        case OffersActionsTypes.SET_SELECTED_CATEGORY:
            return updateObject(state,
                {
                    selected_category: action.payload,
                });
        default: return state;
    }
}