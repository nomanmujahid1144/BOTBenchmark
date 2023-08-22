import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    feedback: {},
    feedbackCount: 0,
    feedbacks: [],
    latestFeedbacks :[]
};

const feedBackReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_FEEDBACK_OF_A_SOFTWARE: {
            return {
                ...state,
                feedback: action.payload,
            };
        }
        case ACTION_TYPES.GET_LATEST_REVIEWS: {
            return {
                ...state,
                latestFeedbacks: action.payload,
            };
        }
        case ACTION_TYPES.GET_USERS_REVIEWS_COUNT: {
            return {
                ...state,
                feedbackCount: action.payload,
            };
        }
        case ACTION_TYPES.GET_USERS_REVIEWS: {
            return {
                ...state,
                feedbacks: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default feedBackReducer;