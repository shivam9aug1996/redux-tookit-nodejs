import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../features/auth/authSlice";

const SignIn = () => {
  const { loading: signInLoading, error: signInError } = useSelector(
    (state) => state.auth.signInState
  );
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailInput, passwordInput, e);
    if (emailInput && passwordInput) {
      dispatch(signInUser({ email: emailInput, password: passwordInput }));
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          required={true}
          style={{ margin: "5px" }}
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          type={"text"}
        />
        <input
          style={{ margin: "5px" }}
          type={"password"}
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button disabled={signInLoading} onClick={(e) => handleSubmit(e)}>
          SignIn
        </button>
      </form>
      {signInError && <h4>{signInError}</h4>}
      <h4>New User?</h4>
      <button onClick={(e) => navigate("/signup")}>Sign Up</button>
    </div>
  );
};

export default SignIn;
