import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";


function Admin({ mode }) {
  return (
    <>
      <AdminNavBar mode={mode} />
      <Outlet />
    </>
  );
}

export default Admin;
