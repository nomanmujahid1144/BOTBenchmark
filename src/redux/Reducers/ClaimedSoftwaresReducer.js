import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    claimedSoftware: {},
    userClaimedSoftwares :[],
    widgetLink : '',
};

const claimedSoftwareReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_CLAIMED_SOFTWARE: {
            return {
                ...state,
                claimedSoftware: action.payload,
            };
        }
        case ACTION_TYPES.GET_HOSTED_CHECKOUT_DATA: {
            return {
                ...state,
                claimedSoftware: action.payload,
            };
        }
        case ACTION_TYPES.GET_SINGLE_USER_CLAIMED_SOFTWARES: {
            return {
                ...state,
                userClaimedSoftwares: action.payload,
            };
        }
        case ACTION_TYPES.GET_WIDGET: {
            return {
                ...state,
                widgetLink: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default claimedSoftwareReducer;