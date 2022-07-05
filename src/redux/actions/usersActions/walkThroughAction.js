import { WalkthorughActionType } from './actionType';


export const handleStepChange=(steps) => dispatch => dispatch({
type: WalkthorughActionType.WALKTHROUGH_START,
payload: {
steps: steps
}
})