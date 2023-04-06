import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

function SaleDetails({ cart, removeCart, handleSnackbarOpen, removeCartItem }) {
  const [subtotal, setSubtotal] = useState([]);
  const [subtotalvalue, setSubtotalvalue] = useState(0);
  const [credit, setCredit] = useState(false);
  const seller = localStorage.getItem("fullName");

  useEffect(() => {
    setSubtotalvalue(
      subtotal.reduce((total, sum) => {
        return total + sum.quantity * sum.price;
      }, 0)
    );
  }, [subtotal]);
  const formik = useFormik({
    initialValues: {
      seller: seller,
      creditorName: "",
      creditDueDate: "",
    },
    validationSchema: Yup.object({
      seller: Yup.string().required("Select a salesperson"),
      creditorName: Yup.string().required("Required field"),
      creditDueDate: Yup.date()
        .required("Required field")
        .min(new Date(), "Invalid date"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(subtotal);
      const submitSale = async () => {
        const batch = writeBatch(db);
        for (let i = 0; i < subtotal.length; i++) {
          const productDoc = doc(db, "products", subtotal[i].id);
          batch.update(productDoc, {
            quantity:
              Number(subtotal[i].previousQuantity) -
              Number(subtotal[i].quantity),
          });
        }
        let date = new Date();
        let myDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        let [year, month, day] = values.creditDueDate.split("-");
        const saleDoc = collection(db, "sales");
        try {
          await addDoc(saleDoc, {
            credit,
            items: subtotal.filter((item) => {
              return item.quantity != 0 && item.price != 0;
            }),
            total: subtotalvalue,
            seller: values.seller,
            creditinfo: {
              name: values.creditorName,
              duedate: `${month}/${day}/${year}`,
              unpaid: subtotalvalue,
              payment_covered: false,
            },
            date_sold: myDate,
          });
          await batch.commit().then(() => {
            handleSnackbarOpen(true);
          });
        } catch (error) {
          console.error(error);
        }
      };
      submitSale();
      removeCart();
      setSubtotal([]);
      setSubtotalvalue(0);
      setCredit(false);
      resetForm({ values: "" });
    },
  });
  const formik2 = useFormik({
    initialValues: {
      seller: seller,
    },
    validationSchema: Yup.object({
      seller: Yup.string().required("Select a salesperson"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(subtotal);
      const submitSale = async () => {
        const batch = writeBatch(db);
        for (let i = 0; i < subtotal.length; i++) {
          const productDoc = doc(db, "products", subtotal[i].id);
          batch.update(productDoc, {
            quantity:
              Number(subtotal[i].previousQuantity) -
              Number(subtotal[i].quantity),
          });
        }
        let date = new Date();
        let myDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        try {
          await batch.commit();
          const saleDoc = collection(db, "sales");
          await addDoc(saleDoc, {
            credit,
            items: subtotal.filter((item) => {
              return item.quantity != 0 && item.price != 0;
            }),
            total: subtotalvalue,
            seller: values.seller,
            date_sold: myDate,
          }).then(() => handleSnackbarOpen(true));
        } catch (error) {
          console.error(error);
        }
      };
      submitSale();
      removeCart();
      setSubtotal([]);
      setSubtotalvalue(0);
      setCredit(false);
      resetForm({ values: "" });
    },
  });

  const handleSubtotal = (id, output, add) => {
    if (add) {
      let x = [...subtotal];
      x[x.length] = output;
      setSubtotal(x);
      let sum = 0;
      for (let i = 0; i < x.length; i++) {
        sum += x[i].price * x[i].quantity;
      }
      setSubtotalvalue(sum);
    } else {
      let x = [...subtotal];
      let index = x.indexOf(
        subtotal.filter((item) => {
          return item.id === id;
        })[0]
      );
      x[index] = { ...x[index], ...output };
      setSubtotal(x);
    }
  };

  const removeItem = (id) => {
    // console.log(subtotal);
    removeCartItem(id);
    setSubtotal((prev) => {
      return prev.filter((item) => item.id != id);
    });
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, borderWidth: 1 }}>
      <Typography variant="h6" sx={{ ml: 2 }}>
        Sale Details
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        component="form"
        onSubmit={credit ? formik.handleSubmit : formik2.handleSubmit}
        noValidate>
        <FormControl fullWidth sx={{ mb: 2 }} size="small">
          <InputLabel id="sellerid">Salesperson Name</InputLabel>
          <Select
            labelId="sellerid"
            id="seller"
            name="seller"
            value={credit ? formik.values.seller : formik2.values.seller}
            label="Salesperson Name"
            onChange={credit ? formik.handleChange : formik2.handleChange}
            error={
              credit
                ? Boolean(formik.errors.seller) && formik.touched.seller
                : Boolean(formik2.errors.seller) && formik2.touched.seller
            }
            sx={{ height: 1 }}>
            <MenuItem value={formik.values.seller}>
              {formik.values.seller}
            </MenuItem>
          </Select>
        </FormControl>
        <Divider />
        <CardContent>
          <Grid container sx={{ mb: 2 }}>
            <Grid item md={3}>
              Item
            </Grid>
            <Grid item md={5}>
              <Typography>Quantity</Typography>
            </Grid>
            <Grid item md={2}>
              Unit Price
            </Grid>
            <Grid item md={2}>
              Item Total
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ maxHeight: "30vh", overflowY: "scroll", mb: 1 }}>
            {cart.map((item, index) => (
              <Box key={index}>
                <CartItem
                  cardData={{
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    // newQuantity: subtotal[index]?.quantity,
                    // newPrice: subtotal[index]?.price
                  }}
                  subtotal={subtotal}
                  handleSubtotal={handleSubtotal}
                  removeItem={removeItem}
                />
              </Box>
            ))}
          </Box>
          <FormControl>
            <FormLabel id="payment">Payment Method:</FormLabel>
            <RadioGroup
              aria-labelledby="payment"
              defaultValue="cash"
              name="radio-buttons-group">
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  value="cash"
                  control={
                    <Radio onClick={() => setCredit(false)} checked={!credit} />
                  }
                  label="Cash"
                />
                <FormControlLabel
                  value="credit"
                  control={
                    <Radio onClick={() => setCredit(true)} checked={credit} />
                  }
                  label="Credit"
                  // onClick={handleClose}
                />
              </Box>
            </RadioGroup>
          </FormControl>
          <Divider />
          {credit && (
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                value={formik.values.creditorName}
                onChange={formik.handleChange}
                error={
                  Boolean(formik.errors.creditorName) &&
                  formik.touched.creditorName
                }
                helperText={
                  formik.touched.creditorName && formik.errors.creditorName
                }
                size="small"
                id="creditorName"
                label="Creditor Name"
                name="creditorName"
                // autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={formik.values.creditDueDate}
                onChange={formik.handleChange}
                error={
                  Boolean(formik.errors.creditDueDate) &&
                  formik.touched.creditDueDate
                }
                helperText={
                  formik.touched.creditDueDate && formik.errors.creditDueDate
                }
                size="small"
                id="creditDueDate"
                label="Due Date"
                name="creditDueDate"
                type="date"
                focused
              />
            </Box>
          )}
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pt: 1,
            }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Subtotal: </Typography>
              <Typography>{subtotalvalue?.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Tax: </Typography>
              <Typography>{(subtotalvalue * 0.15)?.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="primary">Total: </Typography>
              <Typography color="primary">
                {(subtotalvalue + subtotalvalue * 0.15)?.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <Button
              type="reset"
              variant="outlined"
              onClick={() => {
                removeCart();
                setSubtotal([]);
                setSubtotalvalue(0);
                setCredit(false);
                formik.resetForm();
              }}
              fullWidth
              sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={cart.length === 0}
              fullWidth>
              Done
            </Button>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
}

export default SaleDetails;
