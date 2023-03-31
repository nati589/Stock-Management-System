// import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { auth } from "../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Website name
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// await createUserWithEmailAndPassword(auth, data.get("email"), data.get("password"))
// console.log({
//   email: data.get('email'),
//   password: data.get('password'),
// });
// Location

function Login() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required field"),
      password: Yup.string()
        .required("Required field")
        .min(6, "Must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      if (values.username === "admin" && values.password === "123456") {
        localStorage.setItem("loggedInUser", true);
        localStorage.setItem("loggedInStatus", true);
        setLoggedIn(true);
      } else {
        localStorage.setItem("loggedInUser", true);
        localStorage.setItem("loggedInStatus", false);
        setLoggedIn(true);
      }
    },
  });
  useEffect(() => {
    const getUser = localStorage.getItem("loggedInUser");
    const getStatus = localStorage.getItem("loggedInStatus");
    // console.log(toBoolean(getUser), Boolean(getStatus))
    if (getUser === "true" && getStatus === "false") {
      navigate("/salesperson");
    } else if (getUser === "true" && getStatus === "true") {
      navigate("/admin");
    }
  }, [loggedIn]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.username) && formik.touched.username}
              helperText={formik.touched.username && formik.errors.username}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.password) && formik.touched.password}
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}

export default Login;
