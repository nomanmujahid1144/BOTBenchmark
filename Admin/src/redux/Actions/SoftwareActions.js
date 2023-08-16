import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { selectProgressBarState } from "./ProgressBarActions";

export const addSoftware = (
  values,
  formData,
  navigate,
  alert,
  isModelOpen,
  setIsOpen,
  isUpdateModelOpen
) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.post(
      "/api/v1/software/addsoftware",
      formData,
      {
        params: {
          values: JSON.stringify(values),
        },
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      alert.show("Software added successfully", {
        onClose: () => {
          isUpdateModelOpen();
          setIsOpen(!isModelOpen);
          navigate("/admin/softwares");
        },
      });
      setTimeout(() => {
        isUpdateModelOpen();
        setIsOpen(!isModelOpen);
        navigate("/admin/softwares");
      }, 3000);
      dispatch({
        type: ACTION_TYPES.SET_SOFTWARE,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("error while adding software");
    }
  };
};

export const updateSoftware = (
  values,
  formData,
  navigate,
  alert,
  isModelOpen,
  setIsOpen,
  setIsNewProduct,
  isUpdateModelOpen
) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.patch(
      "/api/v1/software/updatesoftware",
      formData,
      {
        params: {
          values: JSON.stringify(values),
          id: global.editId,
        },
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      alert.show("Software updated successfully", {
        onClose: () => {
          isUpdateModelOpen();
          setIsNewProduct(false);
          setIsOpen(!isModelOpen);
          navigate("/admin/softwares");
        },
      });
      setTimeout(() => {
        isUpdateModelOpen();
        setIsNewProduct(false);
        setIsOpen(!isModelOpen);
        navigate("/admin/softwares");
      }, 3000);
      dispatch({
        type: ACTION_TYPES.UPDATE_SOFTWARE,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("error while updating Software");
    }
  };
};

export const getSoftwares = () => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.get("/api/v1/software/getsoftwares");
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.GET_SOFTWARES,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("No Software Found");
      dispatch({
        type: ACTION_TYPES.GET_SOFTWARES,
        payload: [],
      });
    }
  };
};

export const deleteSoftwares = (
  id,
  navigate,
  alert,
  isModelOpen,
  setIsOpen
) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.delete("/api/v1/software/deletesoftwares", {
      params: {
        IDS: id,
      },
    });
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.DELETE_SOFTWARES,
        payload: id,
      });
      alert.show("Deleted successfully", {
        onClose: () => {
          setIsOpen(!isModelOpen);
          navigate("/admin/softwares");
        },
      });
      setTimeout(() => {
        setIsOpen(!isModelOpen);
        navigate("/admin/softwares");
      }, 3000);
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Error in deletion");
    }
  };
};
