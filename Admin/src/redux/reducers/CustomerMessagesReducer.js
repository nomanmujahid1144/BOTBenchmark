import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
  messages: [],
};

const customerMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CUSTOMERS_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case ACTION_TYPES.DELETE_CUSTOMERS_MESSAGES: {
      return {
        ...state,
        messages: state.messages.filter(
          (message) => !action.payload.includes(message._id)
        ),
      };
    }
    default: {
      return state;
    }
  }
};
export default customerMessagesReducer;
