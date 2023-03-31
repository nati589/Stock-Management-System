import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";

const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
  background: theme.palette.background.default,
}));
const columns = ["Name", "Date", "Due Date", "Days Left", "Total", 'Status'];

const data = [
  ["John Doe", "2023/3/3", "2023/3/4", "1", '3000', 'Unpaid'],
  ["Joe James", "2023/2/3", "2023/3/3", "30", '3000', 'Paid'],
  ["Dillon Dannis", "2023/3/3", "2023/3/4", "1", '3000', 'Unpaid'],
  ["Tina Turner", "2023/3/3", "2023/3/5", "2", '3000', 'Paid'],
  ["Luka Doncic", "2023/3/3", "2023/3/4", "1", '3000', 'Unpaid'],
  ["John Doe", "2023/3/3", "2023/3/4", "1", '3000', 'Unpaid'],
  ["Joe James", "2023/2/3", "2023/3/3", "30", '3000', 'Paid'],
  ["Dillon Dannis", "2023/3/3", "2023/3/4", "1", '3000', 'Unpaid'],
  ["Tina Turner", "2023/3/3", "2023/3/5", "2", '3000', 'Paid'],
  ["Luka Doncic", "2023/3/3", "2023/3/4", "1", '3000', 'Unpaid'],
];

const options = {
  filterType: "checkbox",
};

function CreditReport() {
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
          title={"Credits"}
          data={data}
          columns={columns}
          options={options}
        />
        {/* <Products cardData={cardData} addToCart={addToCart} /> */}
      </Grid>
    </Grid>
  )
}

export default CreditReport