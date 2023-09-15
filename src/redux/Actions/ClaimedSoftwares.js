import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { userLogin } from "./ProfileActions";
import { selectProgressBarState } from "./ProgressBarActions";

export const addClaimedSoftwares = (softwareId, value, timeperiod, formData, softwareName, navigate, alert) => {
    return async (dispatch) => {
      
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post("/api/v1/claimed-software/addclaimedsoftware", formData , {
        params: {
            phoneNumber : JSON.stringify(value), 
            softwareId : JSON.stringify(softwareId),
            timeperiod : JSON.stringify(timeperiod),
        },
        headers: {
            "Authorization" : localStorage.getItem('token') 
        }
    });
      if (res.data.success) {
        dispatch(selectProgressBarState(false));
        setTimeout(() => {
            alert.show('Request has been send');
            navigate(`/review/${softwareId}/${softwareName}`);
        },3000)
    } else {
        dispatch(selectProgressBarState(false));
        alert.show("Something Went Wrong");
    }
  };
};

export const getHostedURLData = (hostedId, navigate, alert) => {
    return async (dispatch) => {
      dispatch(selectProgressBarState(true));
        const res = await axiosInstance.get("/api/v1/claimed-software/getHostedURLData", {
            params: {
                hostedId: hostedId,
          }
      });
      if (res.data.success === true) {
        dispatch(selectProgressBarState(false));
        dispatch({
          type: ACTION_TYPES.GET_HOSTED_CHECKOUT_DATA,
          payload: res.data.data,
        });
        setTimeout(() => {
            navigate('/');
            // alert.show('Payment successful. Thank you for your purchase!')
        },3000)
          
      } else {
        dispatch(selectProgressBarState(false));
        alert.show("No Data Found");
        dispatch({
          type: ACTION_TYPES.GET_HOSTED_CHECKOUT_DATA,
          payload: [],
        });
      }
    };
};

export const getSingleUserClaimedSoftwares = () => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
      const res = await axiosInstance.get("/api/v1/claimed-software/getsingleuserclaimedsoftwares", {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_USER_CLAIMED_SOFTWARES,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Software Found");
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_USER_CLAIMED_SOFTWARES,
        payload: [],
      });
    }
  };
};


export const getWidgetImage = (softwareId) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get("/api/image-widget", {
      params: {
        sId: softwareId
      },
      headers: {
          'Authorization': localStorage.getItem('token')
      }
    });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_WIDGET,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_WIDGET,
        payload: '',
      });
    }
  };
}