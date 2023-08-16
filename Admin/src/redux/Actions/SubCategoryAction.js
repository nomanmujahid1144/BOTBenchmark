import { axiosInstance } from "../../constants/axiosInstance";
import { ACTION_TYPES } from "../ActionTypes/ActionTypes";
import { selectProgressBarState } from "./ProgressBarActions";

export const addSubCategory = (
  categoryId,
  subcategories,
  navigate,
  alert,
  isModelOpen,
  setIsOpen,
  isUpdateModelOpen
) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    let obj = {
      categoryId: categoryId,
      subcategories: subcategories,
    };

    const res = await axiosInstance.post(
      "/api/v1/subcategory/addsubcategory",
      obj
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      alert.show("Sub Category added successfully", {
        onClose: () => {
          isUpdateModelOpen();
          setIsOpen(!isModelOpen);
          navigate("/admin/subcategory");
        },
      });
      setTimeout(() => {
        isUpdateModelOpen();
        setIsOpen(!isModelOpen);
        navigate("/admin/subcategory");
      }, 3000);
      dispatch({
        type: ACTION_TYPES.SET_SUB_CATEGORY,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("error while adding category");
    }
  };
};

export const updateSubCategory = (
  categoryId,
  id,
  subcategories,
  navigate,
  alert,
  isModelOpen,
  setIsOpen,
  isUpdateModelOpen
) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    let obj = {
      subcategoryid: id,
      categoryId: categoryId,
      subcategories: subcategories,
    };
    const res = await axiosInstance.patch(
      "/api/v1/subcategory/updatesubcategory",
      obj
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      alert.show("Sub Category updated successfully", {
        onClose: () => {
          isUpdateModelOpen();
          setIsOpen(!isModelOpen);
          navigate("/admin/subcategory");
        },
      });
      setTimeout(() => {
        isUpdateModelOpen();
        setIsOpen(!isModelOpen);
        navigate("/admin/subcategory");
      }, 5000);
      dispatch({
        type: ACTION_TYPES.UPDATE_SUB_CATEGORY,
        payload: res.data.data,
      });
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("error while updating category");
    }
  };
};

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

export const deleteSubCategory = (id, navigate, alert) => {
  return async (dispatch) => {
    dispatch(selectProgressBarState(true));
    const res = await axiosInstance.delete(
      "/api/v1/subcategory/deletesubcategories",
      {
        params: {
          IDS: id,
        },
      }
    );
    if (res.data.success === true) {
      dispatch(selectProgressBarState(false));
      dispatch({
        type: ACTION_TYPES.DELETE_SUB_CATEGORY,
        payload: id,
      });
      alert.show("Deleted successfully", {
        onClose: () => {
          navigate("/admin/subcategory");
        },
      });
      setTimeout(() => {
        navigate("/admin/subcategory");
      }, 5000);
    } else {
      dispatch(selectProgressBarState(false));
      alert.show("Error in deletion");
    }
  };
};
