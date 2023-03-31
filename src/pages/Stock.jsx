import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";

const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
  background: theme.palette.background.default,
}));
const columns = ["Name", "Quantity", "Unit", "Unit Price"];

const data = [
  ["Car Wax formula", "35", "Pc", "50"],
  ["Spray Paint", "35", "Pc", "50"],
  ["Vacuum cleaner", "35", "Pc", "50"],
  ["Car Wax formula", "35", "Pc", "50"],
  ["Spray Paint", "35", "Pc", "50"],
  ["Vacuum cleaner", "35", "Pc", "50"],
  ["Car Wax formula", "35", "Pc", "50"],
  ["Spray Paint", "35", "Pc", "50"],
  ["Vacuum cleaner", "35", "Pc", "50"],
];

const options = {
  filterType: "checkbox",
};

function Stock() {
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
          title={"Stock"}
          data={data}
          columns={columns}
          options={options}
        />
        {/* <Products cardData={cardData} addToCart={addToCart} /> */}
      </Grid>
    </Grid>
  );
}

export default Stock;
