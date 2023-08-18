import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "layouts/admin";
import AuthLayoutLogin from "layouts/auth-login";
import AuthLayoutSignUp from "layouts/auth-signup";
import AuthLayoutForgetPassword from "layouts/auth-forgetPassword";
import { adminLogin } from "redux/Actions/ProfileActions";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.ProfileReducer);
  useEffect(() => {
    console.log(token, "first token");
    const tokens = localStorage.getItem("token");
    if (tokens) {
      dispatch(adminLogin(tokens));
    }
    // getToken();
  }, [token]);
  // const getToken = async () => {
  //   console.log(token, "TOKEN");
  //   if (token) {
  //     dispatch(adminLogin(token));
  //   }
  // };
  return (
    <Routes>
      <Route path="auth/sign-in" element={<AuthLayoutLogin />} />
      <Route path="auth/sign-up" element={<AuthLayoutSignUp />} />
      <Route
        path="auth/forget-password"
        element={<AuthLayoutForgetPassword />}
      />
      <Route
        path="admin/*"
        element={token ? <AdminLayout /> : <AuthLayoutLogin />}
      />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
