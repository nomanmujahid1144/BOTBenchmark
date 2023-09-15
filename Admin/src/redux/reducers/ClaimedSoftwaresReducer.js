import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
  claimedSoftwares: [],
  hostedLink: "",
};

const claimedSoftwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CLAIMED_SOFTWARE: {
      return {
        ...state,
        claimedSoftwares: action.payload,
      };
    }
    case ACTION_TYPES.CREATE_CLAIMED_SOFTWARE_ID: {
      return {
        ...state,
        hostedLink: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default claimedSoftwareReducer;
