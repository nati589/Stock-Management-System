import {
  Alert,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
// import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

function Expense() {
  const [category, setCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [price, setPrice] = useState("");
  const [verification, setVerification] = useState('');
  const expenseRef = collection(db, "expenses");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let date = new Date();
    let myDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    try {
      await addDoc(expenseRef, { type: category, date_added: myDate, price, verification })
      .then(() => setOpenSnackbar(true));
    } catch (err) {
      console.error(err);
    }
    setCategory("");
    setPrice("");
    setVerification("");
  };

  return (
    <Grid container sx={{ pl: 2, pr: 2 }}>
      <Typography variant="h4">Expense</Typography>
      <Grid item xs={12}>
        <Card elevation={0}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", mt: 2, mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="expense">Type of Expense</InputLabel>
                <Select
                  labelId="expense"
                  id="expenseid"
                  label="Expense Type"
                  value={category}
                  onChange={handleChange}>
                  <MenuItem value={"Labour"}>Loading</MenuItem>
                  <MenuItem value={"Delivery"}>Transport</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type='number'
                id="price"
                label="Price"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                sx={{ mr: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="verification"
                label="Verificaion"
                value={verification}
                onChange={(event) => setVerification(event.target.value)}
                name="verification"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="filled" type="cancel">
                Cancel
              </Button>
              <Button variant="contained" type="submit" sx={{ ml: 2 }}>
                Register
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}>
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}>
          Expense added successfully
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Expense;
