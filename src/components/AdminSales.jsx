import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Divider } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";

const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
  background: theme.palette.background.default,
}));
const columns = ["Name", "Quantity", "Unit", "Price", "Salesperson", "Date", "Total"];

const data = [
  ["James Houston", "2", "Pc", "30", 'Solomon', "2020-01-01", '52'],
  ["John Doe", "1", "Pc", "80", 'Solomon', "2020-01-01", '70'],
  ["James Houston", "1", "Pc", "100", 'Solomon', "2020-01-01", '150'],  
  ["James Houston", "2", "Pc", "30", 'Solomon', "2020-01-01", '52'],
  ["John Doe", "1", "Pc", "80", 'Solomon', "2020-01-01", '70'],
  ["James Houston", "1", "Pc", "100", 'Solomon', "2020-01-01", '150'],
  ["James Houston", "2", "Pc", "30", 'Solomon', "2020-01-01", '52'],
  ["John Doe", "1", "Pc", "80", 'Solomon', "2020-01-01", '70'],
  ["James Houston", "1", "Pc", "100", 'Solomon', "2020-01-01", '150'],
  ["James Houston", "2", "Pc", "30", 'Solomon', "2020-01-01", '52'],
  ["John Doe", "1", "Pc", "80", 'Solomon', "2020-01-01", '70'],
  ["James Houston", "1", "Pc", "100", 'Solomon', "2020-01-01", '150'],
];

const options = {
  filterType: "checkbox",
};

function AdminSales() {
  return (
    <Grid container spacing={1} sx={{ pl: 1, pr: 1 }}>
      <Grid
        item
        xs={8}
        md={8}
        sx={{
          //  maxHeight: "80vh",
          //  overflowY: "scroll",
          pr: 1,
        }}>
        {/* <Typography variant="h4" sx={{ mb: 2}}>
            Sales
        </Typography> */}
        <StyledMUIDataTable
          title={"Sales"}
          data={data}
          columns={columns}
          options={options}
        />
        {/* <Products cardData={cardData} addToCart={addToCart} /> */}
      </Grid>
      <Grid item xs={4} md={4} sx={{ maxHeight: "80vh" }}>
        {/* <Paper>xs=6 md=4</Paper> */}
        <Card>
          <Typography variant="h6" sx={{ ml: 2, mb: 2 }}>
            Sales Summary
          </Typography>
          <Divider />
          <CardContent sx={{ pl: 3, pr: 3}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
              <Typography>Quantity</Typography>
              <Typography>5</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
              <Typography>Sub-total</Typography>
              <Typography>345</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
              <Typography>TXBL</Typography>
              <Typography>345</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
              <Typography>TAX</Typography>
              <Typography>{345 * 0.15}</Typography>
            </Box>
            <Divider sx={{mb: 2}}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography color='primary'>Total</Typography>
              <Typography color='primary'>{(345 * 1.15).toFixed(2)}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AdminSales;
