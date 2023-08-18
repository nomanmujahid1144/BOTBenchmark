import { axiosInstance } from "../../constants/axiosInstance";
// import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { adminLogin } from "./ProfileActions";
import { selectProgressBarState } from "./ProgressBarActions";

export const adminSignUp = (name, email, password, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post("/api/v1/admin/signup", {
      name,
      email,
      password,
    });
    if (res.data.success) {
      dispatch(selectProgressBarState(false));
      //   localStorage.setItem("token", res.data?.token);
      alert.show(res.data.message);
      navigate("/auth/sign-in");
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Something Went Wrong");
    }
  };
};

export const adminLoginFun = (email, password, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post("/api/v1/admin/login", {
      email,
      password,
    });
    if (res.data.success) {
      dispatch(selectProgressBarState(false));
      console.log(res.data?.token, "res.data?.token");
      dispatch(adminLogin(res.data?.token));
      localStorage.setItem("token", res.data?.token);
      alert.show("Logged In Successfully");
      navigate("/");
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Something Went Wrong");
    }
  };
};
