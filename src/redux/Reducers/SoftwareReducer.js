import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    software: {},
    softwares: [],
    filteredsoftwares: []
};

const softwareReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_SOFTWARES: {
            return {
                ...state,
                softwares: action.payload,
            };
        }
        case ACTION_TYPES.GET_FILTERED_SOFTWARES: {
            return {
                ...state,
                filteredsoftwares: action.payload,
            };
        }
        case ACTION_TYPES.UPDATE_FILTERED_SOFTWARES: {
            return {
                ...state,
                filteredsoftwares: action.payload,
            };
        }
        case ACTION_TYPES.GET_SINGLE_SOFTWARES: {
            return {
                ...state,
                software: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default softwareReducer;