import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
  subcategory: {},
  subcategories: [],
};

const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SUB_CATEGORY: {
      return {
        ...state,
        subcategory: action.payload,
      };
    }
    case ACTION_TYPES.UPDATE_SUB_CATEGORY: {
      return {
        ...state,
        subcategory: action.payload,
      };
    }
    case ACTION_TYPES.GET_SUB_CATEGORIES: {
      return {
        ...state,
        subcategories: action.payload,
      };
    }
    case ACTION_TYPES.DELETE_SUB_CATEGORY: {
      return {
        ...state,
        subcategories: state.subcategories.filter(
          (subcategory) => !action.payload.includes(subcategory._id)
        ),
      };
    }
    default: {
      return state;
    }
  }
};
export default subcategoryReducer;
