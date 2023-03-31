import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function CreditorCard({ data }) {
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(0);
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
  return (
    <Box>
      <Card variant="outlined">
        <CardContent sx={{ minHeight: 100 }}>
          <Box>
            <Typography align="center">{data.creditorName}</Typography>
            <Typography align="center">Amount: {data.amount}</Typography>
          </Box>
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
                Credited Items: {data.products.join(", ")}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Due Date: {data.dueDate}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Days Left: 2 days 
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
                // autoComplete="email"
                autoFocus
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Amount Left: {data.unpaid - paid}
              </Typography>
              <Button onClick={handleClose} variant='outlined' sx={{mr: 2, mt: 2}}>Update</Button>
              <Button onClick={handleClose} variant='contained' sx={{mt: 2}}>Credit Covered</Button>
            </Box>
          </Modal>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleClose}>
            Update
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default CreditorCard;
