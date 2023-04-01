import { Navigate } from "react-router-dom";

export default function Home() {
  // const getUser = localStorage.getItem("loggedInUser");
  // const getStatus = localStorage.getItem("loggedInStatus");
  // console.log(getUser, getStatus);
  localStorage.clear()
  return (
    <>
      <Navigate to="/login" replace />
      {/* {getStatus === "false" && <Navigate to="/salesperson/" replace />} */}
      {/* {getStatus === "true" && <Navigate to="/admin/" replace />} */}
    </>
  );
}
