import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Salesperson({ mode }) {
  return (
    <>
      <NavBar mode={mode} />
      <Outlet />
    </>
  );
}

export default Salesperson;
