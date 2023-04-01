import { 
    Grid, Typography, 
} from "@mui/material";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
  background: theme.palette.background.default,
}));
const columns = ["Type", "Verification", "Payment", "Date"];

const data = [
  ["Delivery", "A34567", "160", "2023/3/4"],
];
const options = {
  filterType: "checkbox",
  elevation: 0,
  selectableRows: "none",
};

function ExpenseReport() {
  const [expenseList, setExpenseList] = useState([])
  const expenseRef = collection(db, "expenses");

  const getDetails = async () => {
    try {
      const expenseData = await getDocs(expenseRef);
      const filteredExpenses = expenseData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExpenseList(filteredExpenses.map((expense) => {
        return [
          expense.type,
          expense.verification,
          expense.price,
          expense.date_added,
        ]
      }));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getDetails();
  }, [])
  return (
    <Grid container spacing={1} sx={{ pl: 1, pr: 1 }}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          pr: 1,
        }}>
        <Typography variant="h4" sx={{ mb: 2}}>
          Expense Report
      </Typography>
        <StyledMUIDataTable
          title={"Expenses"}
          data={expenseList}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  )
}

export default ExpenseReport