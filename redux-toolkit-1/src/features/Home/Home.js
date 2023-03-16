import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.auth.logoutState);
  const dispatch = useDispatch();
  return (
    <div>
      {error}
      {loading && "loading"}
      Home
      <button
        onClick={() => {
          dispatch(logout(token));
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Home;
