import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

export const userLogin = (selectedState) => {
    return {
      type: ACTION_TYPES.LOGIN ,
      payload: selectedState
    };
  };