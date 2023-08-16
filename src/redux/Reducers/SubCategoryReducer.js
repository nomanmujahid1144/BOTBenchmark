import { ACTION_TYPES } from "../ActionTypes/ActionTypes";

const initialState = {
    subCategory: {},
    SubCategories: []
};

const subCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_SUB_CATEGORIES: {
            return {
                ...state,
                SubCategories: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
export default subCategoryReducer;