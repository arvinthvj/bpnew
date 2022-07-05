import { WalkthorughActionType } from '../../actions/usersActions/actionType';

export const initialState = {
goToStep : null
}

const updateObject = (oldState, updatedProps) => {
return {
...oldState,
...updatedProps
}
}
export const walkThroughReducer = (state=initialState, action)=>{
switch(action.type) {
case WalkthorughActionType.WALKTHROUGH_START:
return updateObject(state, {
goToStep:action.payload
})

default: return state;

}

}