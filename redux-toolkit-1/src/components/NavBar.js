import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import styles from "./navbar.module.css";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.auth.logoutState);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(token));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "aqua",
      }}
    >
      <NavLink className={styles.navLink} to={"/"}>
        Home
      </NavLink>
      <NavLink className={styles.navLink} to={"/about"}>
        About
      </NavLink>
      <NavLink className={styles.navLink} to={"/contact"}>
        Contact
      </NavLink>
      {!token ? (
        <>
          <NavLink className={styles.navLink} to={"/signin"}>
            SignIn
          </NavLink>
          <NavLink className={styles.navLink} to={"/signup"}>
            Signup
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className={styles.navLink} to={"/profile"}>
            Profile
          </NavLink>
          <Link className={styles.navLinkText}>{`Welcome ${user?.email}`}</Link>
          <button
            disabled={loading}
            className={styles.logoutBtn}
            onClick={() => handleLogout()}
          >{`Logout`}</button>
        </>
      )}
    </div>
  );
};

export default NavBar;
