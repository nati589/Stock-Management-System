import { Alert, Box, Button, Grid, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
  background: theme.palette.background.default,
}));

const options = {
  filterType: "checkbox",
  elevation: 0,
  selectableRows: "none",
};

function Stock() {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [modalData, setModalData] = useState();
  const [price, setPrice] = useState(0);
  const productsRef = collection(db, "products");
  const [productList, setProductList] = useState([]);

  const handleClose = async (data, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      try {
        const productDoc = doc(db, "products", data.id);
        await updateDoc(productDoc, { price_bought: price })
        .then(() => setOpenSnackbar(true))
        getDetails();
      } catch (error) {
        console.error(error);
      }
      setPrice(0);
      setModalData();
      setOpen(false);
    }
  };
  const handleBackdropClick = (event) => {
    //these fail to keep the modal open
    event.stopPropagation();
    return false;
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    "Products",
    "Quantity",
    "Unit",
    "Unit Price",
    {
      name: "ID",
      options: {
        display: false,
        filter: false,
        sort: false,
      }
    },
    "Category",
    {
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, rowData, tableMeta, updateValue) => {
          let data = rowData.rowData;
          return (
            <Button
              variant="outlined"
              onClick={() => {
                setModalData({
                  name: data[0],
                  quantity: data[1],
                  unit: data[2],
                  unitPrice: data[3],
                  id: data[4],
                  category: data[5],
                  addedBy: data[6],
                });
                setOpen(true);
              }}>
              Update
            </Button>
          );
        },
      },
      name: "update",
    },
  ];
  const getDetails = async () => {
    const productData = await getDocs(productsRef);
    const filteredProducts = productData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProductList(
      filteredProducts.map((product) => {
        return [
          product.name,
          product.quantity,
          product.unit,
          product.price_bought,
          product.id,
          product.category,
          product.added_by,
        ];
      })
    );
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <Box>
      <Grid container spacing={1} sx={{ pl: 1, pr: 1 }}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            pr: 1,
          }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Stock Report
          </Typography>
          <StyledMUIDataTable
            title={"Stock"}
            data={productList}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          onBackdropClick={handleBackdropClick}
          disableEscapeKeyDown
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Product Information
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Name: {modalData?.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Quantity: {modalData?.quantity}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Previous price: {modalData?.unitPrice}
            </Typography>
            <TextField
              margin="normal"
              required
              error={isNaN(price)}
              fullWidth
              id="price"
              label="Price Bought"
              name="price"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              autoFocus
            />
            <Button
              onClick={() => handleClose(modalData)}
              variant="outlined"
              disabled={isNaN(price)}
              sx={{ mr: 2, mt: 2 }}>
              Update
            </Button>
          </Box>
        </Modal>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}>
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}>
          Product updated successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Stock;
