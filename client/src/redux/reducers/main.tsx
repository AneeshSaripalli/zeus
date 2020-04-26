import { MAIN_REMOVE_JWT, MAIN_SET_JWT } from "../actions/main";
import { Action, MainReducerState } from "../types";

const defaultState: MainReducerState = {
    jwt: null
};

function MainReducer(state = defaultState, action: Action<any>): MainReducerState {
    switch (action.type) {
        case MAIN_SET_JWT: {
            console.log('updating jwt', action.payload)
            return {
                ...state,
                jwt: action.payload
            }
        }

        case MAIN_REMOVE_JWT: {
            return {
                ...state,
                jwt: null
            }
        }

        default: {
            return state;
        }
    }
}

export default MainReducer;