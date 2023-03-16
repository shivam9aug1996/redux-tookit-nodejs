import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../authSlice";

const Signin = () => {
  const { token } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.auth.signInState);
  const dispatch = useDispatch();
  return (
    <div>
      {error}
      {loading && "loading"}
      {token && "success signin"}
      <button
        onClick={() => {
          dispatch(
            signInUser({
              email: "demo11@mailinator.com",
              password: "123456789",
            })
          );
        }}
      >
        login
      </button>
    </div>
  );
};

export default Signin;
