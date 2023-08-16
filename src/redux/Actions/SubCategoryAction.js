import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { selectProgressBarState } from "./ProgressBarActions";

export const getSubCategories = () => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get("/api/v1/subcategory/getsubcategories");
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_SUB_CATEGORIES,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Sub Category Found");
      dispatch({
        type: ACTION_TYPES.GET_SUB_CATEGORIES,
        payload: [],
      });
    }
  };
};
