import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Salesperson from "./pages/Salesperson";
import Admin from "./pages/Admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales from "./pages/Sales";
import Credit from "./pages/Credit";
import AddProduct from "./pages/AddProduct";
import Expense from "./pages/Expense";
import AdminSales from "./components/AdminSales";
import Stock from "./pages/Stock";
import CreditReport from "./pages/CreditReport";
import ExpenseReport from "./pages/ExpenseReport";
import AddUser from "./pages/AddUser";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";

function App() {
  let getMode = localStorage.getItem("mode");
  const [mode, setMode] = useState(true);
  if (getMode === null || getMode === undefined) {
    localStorage.setItem("mode", "light");
    setMode(true);
  } else if (mode !== (getMode === "light")) {
    setMode(getMode === "light" ? true : false);
  }
  function changeMode() {
    localStorage.setItem("mode", mode ? "dark" : "light");
    setMode(!mode);
  }
  const theme = createTheme();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      text: {
        primary: "rgba(255, 255, 255, 0.7)",
      },
    },
  });

  return (
    <ThemeProvider theme={mode ? theme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route
              path="/salesperson"
              element={<Salesperson mode={changeMode} />}>
              <Route index element={<Sales />} />
              <Route path="credit" element={<Credit />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="expense" element={<Expense />} />
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Admin mode={changeMode} />}>
              <Route index element={<AdminSales />} />
              <Route path="stock" element={<Stock />} />
              <Route path="creditreport" element={<CreditReport />} />
              <Route path="expensereport" element={<ExpenseReport />} />
              <Route path="adduser" element={<AddUser />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
