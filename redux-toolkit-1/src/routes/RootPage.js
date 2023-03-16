import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./app.css";
const Root = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
