import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { selectProgressBarState } from "./ProgressBarActions";

export const getFilteredSoftwares = (category, subCategories, dateFilter, rating) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    console.log(dateFilter, 'dateFilter')
    const res = await axiosInstance.get("/api/v1/software/getfilteredsoftwares", {
          params: {
              category: category,
              subCategories: subCategories,
              dateFilter: dateFilter,
              rating: rating,
        }
    });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_FILTERED_SOFTWARES,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Software Found");
      dispatch({
        type: ACTION_TYPES.GET_FILTERED_SOFTWARES,
        payload: [],
      });
    }
  };
};

export const updateFilteredSoftwares = (newFilteredSoftwares) => {
  return async (dispatch) => { 
    dispatch({
      type: ACTION_TYPES.UPDATE_FILTERED_SOFTWARES,
      payload: newFilteredSoftwares,
    });
  }
};

export const getSingleSoftwares = (softwareId) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
      const res = await axiosInstance.get("/api/v1/software/getsinglesoftwares", {
          params: {
            softwareId: softwareId,
        }
    });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_SOFTWARES,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Software Found");
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_SOFTWARES,
        payload: [],
      });
    }
  };
};


export const createSubscriber = (price, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post("/api/v1/software/createsubscription", {
        price: price
    });
    if (res.data.success) {
        console.log()
        // setTimeout(() => {
        //     dispatch(selectProgressBarState(false));
        //     alert.show(res.data.message.toString());
        //     navigate("/login");
        // },500)
    } else {
      // dispatch(selectProgressBarState(false));
      // alert.show("Something Went Wrong");
    }
  };
};