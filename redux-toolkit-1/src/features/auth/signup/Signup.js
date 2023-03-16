import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./signupSlice";

const Signup = () => {
  const { token } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.auth.signUpState);
  const dispatch = useDispatch();
  console.log(error);

  return (
    <div>
      {error}
      {loading && "loading"}
      {token && "success full signup"}
      <button
        onClick={() => {
          dispatch(
            signupUser({
              email: "demo11@mailinator.com",
              password: "123456789",
            })
          );
        }}
      >
        signup
      </button>
    </div>
  );
};

export default Signup;
