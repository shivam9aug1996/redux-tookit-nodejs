import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../features/auth/authSlice";

const SignUp = () => {
  const { loading: signUpLoading, error: signUpError } = useSelector(
    (state) => state.auth.signUpState
  );

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailInput, passwordInput, e);
    //if (emailInput && passwordInput) {
    let result = await dispatch(
      signupUser({ email: emailInput, password: passwordInput })
    );
    console.log(result);
    //  }
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
        <button disabled={signUpLoading} onClick={(e) => handleSubmit(e)}>
          Sign Up
        </button>
      </form>
      {signUpError && <h4>{signUpError}</h4>}
      <h4>Already have an account?</h4>
      <button onClick={(e) => navigate("/signin")}>SignIn</button>
    </div>
  );
};

export default SignUp;
