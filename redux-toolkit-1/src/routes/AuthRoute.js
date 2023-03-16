import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ comp }) => {
  const { token } = useSelector((state) => state.auth);

  return token ? <Navigate to="/profile" replace={true} /> : comp;
};

export default AuthRoute;
