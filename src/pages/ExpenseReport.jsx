import { 
    Grid, 
} from "@mui/material";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";

const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
  background: theme.palette.background.default,
}));
const columns = ["Type", "Verification", "Payment", "Date"];

const data = [
  ["Labour", "Abubeker T.", "250", "2023/3/4"],
  ["Delivery", "A34567", "160", "2023/3/4"],
  ["Labour", "Abubeker T.", "250", "2023/3/4"],
  ["Delivery", "A34567", "160", "2023/3/4"],
  ["Labour", "Abubeker T.", "250", "2023/3/4"],
  ["Delivery", "A34567", "160", "2023/3/4"],
  ["Labour", "Abubeker T.", "250", "2023/3/4"],
  ["Delivery", "A34567", "160", "2023/3/4"],
  ["Labour", "Abubeker T.", "250", "2023/3/4"],
  ["Delivery", "A34567", "160", "2023/3/4"],
];

const options = {
  filterType: "checkbox",
};

function ExpenseReport() {
  return (
    <Grid container spacing={1} sx={{ pl: 1, pr: 1 }}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          //  maxHeight: "80vh",
          //  overflowY: "scroll",
          pr: 1,
        }}>
        {/* <Typography variant="h4" sx={{ mb: 2}}>
          Sales
      </Typography> */}
        <StyledMUIDataTable
          title={"Expenses"}
          data={data}
          columns={columns}
          options={options}
        />
        {/* <Products cardData={cardData} addToCart={addToCart} /> */}
      </Grid>
    </Grid>
  )
}

export default ExpenseReport