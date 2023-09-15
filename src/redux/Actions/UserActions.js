import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { userLogin } from "./ProfileActions";
import { selectProgressBarState } from "./ProgressBarActions";

export const userSignUp = (name, email, password, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post("/api/v1/user/signup", {
        fullName :  name,
        email,
        password,
    });
    if (res.data.success) {
        setTimeout(() => {
            dispatch(selectProgressBarState(false));
            alert.show(res.data.message.toString());
            navigate("/login");
        },500)
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Something Went Wrong");
    }
  };
};
export const userSocialSignUp = (name, email,  navigate, alert, targetUrl) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    console.log('here')
    const res = await axiosInstance.post("/api/v1/user/usersocialsignup", {
        fullName :  name,
        email,
    });
    if (res.data.success) {
        setTimeout(() => {
          dispatch(userLogin(res.data.data?.token));
          localStorage.setItem("token", res.data.data?.token);
          alert.show(res.data.message.toString());
          dispatch(selectProgressBarState(false));
          if (targetUrl) {
            navigate(targetUrl);
          } else {
            navigate("/");
          }
      },500)
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Something Went Wrong");
    }
  };
};

export const userLoginFun = (email, password, navigate, alert, targetUrl) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post("/api/v1/user/login", {
        email,
        password,
    });
    if (res.data.success) {
        setTimeout(() => {
            dispatch(userLogin(res.data.data?.token));
            localStorage.setItem("token", res.data.data?.token);
            alert.show(res.data.message.toString());
            dispatch(selectProgressBarState(false));
            if (targetUrl) {
              navigate(targetUrl);
            } else {
              navigate("/");
            }
        },500)
    } else {
        dispatch(selectProgressBarState(false));
        alert.show(res.data.message.toString());
    }
  };
};

export const resetPassword = (email,  navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.patch("/api/v1/user/forgetpassword", {
        email,
    });
    if (res.data.success) {
        setTimeout(() => {
            alert.show("Email Successfully Send");
            dispatch(selectProgressBarState(false));
            navigate("/reset-password");
        },500)
    } else {
        dispatch(selectProgressBarState(false));
        alert.show("Something Went Wrong");
    }
  };
};

export const verifyJWTToken = (token,  navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.patch("/api/v1/user/verifyjwttoken", {
        token,
    });
      if (res.data.success) {
          dispatch(selectProgressBarState(false));
          const userId = res.data.data;
          global.userId = userId;
    } else {
        dispatch(selectProgressBarState(false));
        global.verify = false;
        alert.show("Something Went Wrong");
    }
  };
};

export const updatePassword = (password, id,  navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.patch("/api/v1/user/updatepassword", {
        password,
        id
    });
      if (res.data.success) {
          setTimeout(() => {
              alert.show(res.data.message.toString());
                dispatch(selectProgressBarState(false));
                navigate("/login");
        },500)
    } else {
        dispatch(selectProgressBarState(false));
        alert.show("Something Went Wrong");
    }
  };
};

export const changeUserPassword = (password, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.patch("/api/v1/user/changeUserPassword", {
        password
    }, {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    });
      if (res.data.success) {
          setTimeout(() => {
              alert.show('Password Succesfully Changed');
                dispatch(selectProgressBarState(false));
        },500)
    } else {
        dispatch(selectProgressBarState(false));
        alert.show("Something Went Wrong");
    }
  };
};

export const updateUser = (formData, values, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    console.log(formData, 'EBJHB')
    const res = await axiosInstance.patch("/api/v1/user/updateuser", formData, {
      headers: {
        "Authorization": localStorage.getItem('token'),
        "Content-Type": "multipart/form-data",
      },
      params: {
        values : JSON.stringify(values)
      }
    });
      if (res.data.success) {
          setTimeout(() => {
            alert.show('Update Information Successfully');
            dispatch(selectProgressBarState(false));
        },500)
    } else {
        dispatch(selectProgressBarState(false));
        alert.show("Something Went Wrong");
    }
  };
};

export const getSingleUser = (navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    try {
      const res = await axiosInstance.get("/api/v1/user/getsingleuser", {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      if (res.data.success) {
        dispatch(selectProgressBarState(false));
          dispatch({
            type: ACTION_TYPES.GET_SINGLE_USER,
            payload: res.data.data,
          });
      } else {
          dispatch(selectProgressBarState(false));
          dispatch({
            type: ACTION_TYPES.GET_SINGLE_USER,
            payload: {},
          });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: ACTION_TYPES.GET_SINGLE_USER,
          payload: {},
        });
      } else {
        console.error(error);
      }
    }
    
  };
};

export const sendContactUsMessage = (fullName, email, phone, message, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    console.log(phone)
    const res = await axiosInstance.post("/api/v1/contacts/sendcontactmail", {
      fullName,
      emailId :email,
      phoneNumber : phone,
      message
    });
    if (res.data.success) {
      dispatch(selectProgressBarState(false));
        alert.show("Message Send Successfully");
    } else {
        dispatch(selectProgressBarState(false));
        alert.show(res.data.message.toString());
    }
  };
};