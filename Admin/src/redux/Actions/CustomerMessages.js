import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { selectProgressBarState } from "./ProgressBarActions";

export const getCustomersMessages = (alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get("/api/v1/contacts/getAllContactMails");
    console.log(res.data.data, "Messages");
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_CUSTOMERS_MESSAGES,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Message Found");
      dispatch({
        type: ACTION_TYPES.GET_CUSTOMERS_MESSAGES,
        payload: [],
      });
    }
  };
};

export const deleteContactMail = (id, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.delete(
      "/api/v1/contacts/deleteContactMail",
      {
        params: {
          IDS: id,
        },
      }
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.DELETE_CUSTOMERS_MESSAGES,
        payload: id,
      });
      alert.show("Delete Message successfully", {
        onClose: () => {
          navigate("/admin/messages");
        },
      });
      setTimeout(() => {
        navigate("/admin/messages");
      }, 3000);
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Error in deletion");
    }
  };
};

export const submitResponse = (message, id, isModelClose, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post("/api/v1/contacts/submitresponse", {
      yourmessage: message,
      id,
    });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      alert.show("Response Send to the Client", {
        onClose: () => {
          isModelClose();
          navigate("/admin/messages");
        },
      });
      setTimeout(() => {
        isModelClose();
        navigate("/admin/messages");
      }, 3000);
      dispatch({
        type: ACTION_TYPES.SUBMIT_RESPONSE_ON_CUSTOMERS_MESSAGES,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("error while sending response");
    }
  };
};
