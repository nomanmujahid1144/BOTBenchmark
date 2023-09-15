import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { selectProgressBarState } from "./ProgressBarActions";

export const getAllClaimedSoftwares = () => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get(
      "/api/v1/claimed-software/getclaimedsoftware"
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_CLAIMED_SOFTWARE,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Claimed Software Found");
      dispatch({
        type: ACTION_TYPES.GET_CLAIMED_SOFTWARE,
        payload: [],
      });
    }
  };
};

export const CreateCheckoutForNewSubscription = (
  claimedSoftwareid,
  navigate,
  alert,
  onClose
) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post(
      "/api/v1/claimed-software/createsubscription",
      { claimedSoftwareid },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      console.log(res.data.data, "res.data.data");
      onClose();
      //   navigate(res.data.data);
      // window.location.href = res.data.data;
      dispatch({
        type: ACTION_TYPES.CREATE_CLAIMED_SOFTWARE_ID,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Error while adding software");
    }
  };
};
