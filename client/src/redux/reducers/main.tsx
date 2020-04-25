import { Action, MainReducerState } from "../types";
import { MAIN_SET_JWT } from "../actions/main";

const defaultState: MainReducerState = {
    jwt: null
};

function MainReducer(state = defaultState, action: Action<any>): MainReducerState {
    switch (action.type) {
        case MAIN_SET_JWT: {
            return {
                ...state,
                jwt: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default MainReducer;