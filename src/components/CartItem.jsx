import { Grid, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box } from "@mui/system";

function CartItem({ cardData, index, handleSubtotal }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  useEffect(() => {
    handleSubtotal(index, {id: cardData.id,quantity, price, previousQuantity: cardData.quantity})
  }, [])

  return (
    <Grid container sx={{ mt: 1 }}>
      <Grid item md={4} sx={{ display: "flex", alignItems: "center" }}>
        {cardData.name}
      </Grid>
      <Grid item md={5}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="primary" onClick={() => {
            setQuantity(Number(quantity) - 1)
            handleSubtotal(
              index,
              {price: Number(price) , quantity: Number(quantity) - 1}
            );
            }} disabled={quantity <= 1 ? true: false}>
            <RemoveOutlinedIcon fontSize="small" />
          </IconButton>
          <TextField
            error={quantityError}
            id="quantity"
            size="small"
            onChange={(event) => {
              if (event.target.value < 1 || isNaN(event.target.value) || event.target.value > cardData.quantity) {
                // setQuantityError(true);
                setQuantity(cardData.quantity);
                handleSubtotal(index, {price: price, quantity: cardData.quantity});
              } else {
                if (quantityError) {
                  setQuantityError(false);
                }
                setQuantity(Number(event.target.value));
                handleSubtotal(
                  index,
                  {price: Number(price) , quantity: Number(event.target.value)}
                );
              }
            }}
            label=""
            variant="outlined"
            value={quantity}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <IconButton color="primary" onClick={() => {
            setQuantity(Number(quantity) + 1)
            handleSubtotal(
              index,
              {price: Number(price) , quantity: Number(quantity) + 1}
            );
            }} disabled={quantity >= cardData.quantity ? true: false}>
            <AddOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item md={3}>
        <TextField
          error={priceError}
          id="price"
          size="small"
          onChange={(event) => {
            if (event.target.value < 0 || isNaN(event.target.value)) {
              setPriceError(true);
              setPrice(0);
              handleSubtotal(index, {price: 0, quantity: quantity});
            } else {
              if (priceError) {
                setPriceError(false);
              }
              setPrice(Number(event.target.value));
              handleSubtotal(
                index,
                {price: Number(event.target.value) , quantity: Number(quantity)}
              );
            }
          }}
          label=""
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </Grid>
    </Grid>
  );
}

export default CartItem;
