import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SignIn from "../components/SignIn";

const ProtectedRoute = ({ comp }) => {
  const { token } = useSelector((state) => state.auth);

  return token ? comp : <Navigate to="/signin" replace={true} />;
};

export default ProtectedRoute;
