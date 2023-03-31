import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MUIDataTable, { TableBody, TableHead } from "mui-datatables";
import { db } from "../config/firebase";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
// import CreditorCard from "../components/CreditorCard";

function Credit() {
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(0);
  const [creditList, setCreditList] = useState([]);
  const [productList, setProductList] = useState([]);
  // console.log(creditList)
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpen(!open);
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

  const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
    background: theme.palette.background.default,
  }));
  const columns = [
    "Name",
    "Amount",
    "Unpaid",
    "Due Date",
    "ID",
    "Payment Covered",
    // {
    //   label: "Products",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       console.log(tableMeta.rowData[6])
    //       const rowProducts = tableMeta.rowData[6]?.length
    //       return (
    //         <p>{rowProducts}</p>
    //       );
    //     },
    //   },
    //   name: "products",
    // },
    {
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="outlined" onClick={handleClose}>
              Update
            </Button>
          );
        },
      },
      name: "update",
    },
  ];

  // const creditData = [
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  //   ["John Doe", "150", "45", "2023/2/1", "3"],
  // ];
  const options = {
    filterType: "checkbox",
    expandableRows: true,
    expandableRowsHeader: false,
    renderExpandableRow: (rowData, rowMeta) => {
      // const
      console.log(rowData);
      return (
        <tr>
          <td>
            <div>hi</div>
          </td>
        </tr>
        //     <TableContainer component={Paper}>
        //   <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        //     <TableHead>
        //       <TableRow>
        //         <TableCell>Item</TableCell>
        //         <TableCell align="right">Quantity</TableCell>
        //         <TableCell align="right">Price</TableCell>
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {rowData[6]?.map((row) => (
        //         <TableRow
        //           key={productList.find((product) => product.id === row.id).name}
        //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //         >
        //           <TableCell component="th" scope="row">
        //             {row.name}
        //           </TableCell>
        //           <TableCell align="right">{row.quantity}</TableCell>
        //           <TableCell align="right">{row.price}</TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>
      );
    },
  };
  let data = {
    id: 1,
    creditorName: "John Doe",
    amount: 100,
    dueDate: "2023-12-12",
    unpaid: 52,
    paymentcovered: false,
    products: ["Car Wax", "Spray paint", "Gypsum"],
  };
  const getDetails = async () => {
    try {
      const creditRef = collection(db, "sales");
      const creditData = await getDocs(creditRef);
      const filteredCredits = creditData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredCredits[0].creditinfo.payment_covered);
      setCreditList(
        filteredCredits
          .filter((filteredCredit) => filteredCredit.credit === true)
          .map((filteredCredit) => {
            return [
              filteredCredit.creditinfo.name,
              filteredCredit.total,
              filteredCredit.creditinfo.unpaid,
              filteredCredit.creditinfo.duedate,
              filteredCredit.id,
              filteredCredit.creditinfo?.payment_covered ? "Paid" : "Unpaid",
            ];
            // return {
            //   id: filteredCredit.id,
            //   creditorName: filteredCredit.creditinfo.name,
            //   amount: filteredCredit.total,
            //   dueDate: filteredCredit.creditinfo.duedate,
            //   unpaid: filteredCredit.creditinfo.unpaid,
            //   paymentcovered: filteredCredit.creditinfo.payment_covered,
            //   products: filteredCredit.items,
            // };
          })
      );
      const productRef = collection(db, "products");
      const productData = await getDocs(productRef);
      const filteredProducts = productData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Box sx={{ maxHeight: "80vh", overflowY: "scroll", pl: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 2, pb: 2 }}>
            Credit List
          </Typography>
          <StyledMUIDataTable
            title={"Credits"}
            data={creditList}
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
              Credit Information
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Name: {data.creditorName}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Credited Items: {data.products.length}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Due Date: {data.dueDate}
            </Typography>
            <TextField
              margin="normal"
              required
              error={paid > data.unpaid}
              fullWidth
              id="paid"
              label="Amount Paid"
              name="paid"
              onChange={(event) => {
                setPaid(event.target.value);
              }}
              autoFocus
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Amount Left: {data.unpaid - paid}
            </Typography>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ mr: 2, mt: 2 }}>
              Update
            </Button>
            <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
              Credit Covered
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default Credit;
