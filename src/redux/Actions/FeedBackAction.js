import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { selectProgressBarState } from "./ProgressBarActions";

export const addFeedBack = (rating, reviewTitle, feedback, softwareId , softwareName, alert, navigate) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
      const res = await axiosInstance.post("/api/v1/feedback/addfeedback", {
        softwareId : softwareId,
        rating : rating,
        feedback : feedback,
        reviewTitle : reviewTitle,
      }, {
          headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
      if (res.data.success === true) {
          dispatch(selectProgressBarState(false));
          dispatch({
              type: ACTION_TYPES.ADD_FEEDBACK_OF_A_SOFTWARE,
              payload: res.data.data,
          });
          alert.show('FeedBack Successfully Added')
          navigate(`/review/${softwareId}/${softwareName}`)
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Feedback Added");
      dispatch({
        type: ACTION_TYPES.ADD_FEEDBACK_OF_A_SOFTWARE,
        payload: {},
      });
    }
  };
};


export const getLatestReviews = () => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get("/api/v1/feedback/getlatestreviews");
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_LATEST_REVIEWS,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No latest Review Found");
      dispatch({
        type: ACTION_TYPES.GET_LATEST_REVIEWS,
        payload: [],
      });
    }
  };
};

export const getUsersReviewsCount = () => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get("/api/v1/feedback/reviews/count", {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_USERS_REVIEWS_COUNT,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No latest Review Found");
      dispatch({
        type: ACTION_TYPES.GET_USERS_REVIEWS_COUNT,
        payload: [],
      });
    }
  };
};

export const getUsersReviews = () => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get("/api/v1/feedback/reviews", {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_USERS_REVIEWS,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No latest Review Found");
      dispatch({
        type: ACTION_TYPES.GET_USERS_REVIEWS,
        payload: [],
      });
    }
  };
};
