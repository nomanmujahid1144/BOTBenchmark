import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
  software: {},
  softwares: [],
};

const softwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SOFTWARE: {
      return {
        ...state,
        software: action.payload,
      };
    }
    case ACTION_TYPES.UPDATE_SOFTWARE: {
      return {
        ...state,
        software: action.payload,
      };
    }
    case ACTION_TYPES.GET_SOFTWARES: {
      return {
        ...state,
        softwares: action.payload,
      };
    }
    case ACTION_TYPES.DELETE_SOFTWARES: {
      return {
        ...state,
        softwares: state.softwares.filter(
          (software) => !action.payload.includes(software._id)
        ),
      };
    }
    default: {
      return state;
    }
  }
};
export default softwareReducer;
