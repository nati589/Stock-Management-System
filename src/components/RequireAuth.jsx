import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const getUser = localStorage.getItem("loggedInUser");
  const getStatus = localStorage.getItem("loggedInStatus");
  // console.log(getUser, getStatus)
  return (
    <>
      {getUser === "true" ? <Outlet /> : <Navigate to="/login" replace />}
      </>
  );
}
