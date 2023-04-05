import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box } from "@mui/system";

function CartItem({ cardData, index, handleSubtotal, removeItem }) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  useEffect(() => {
    handleSubtotal(index, {
      id: cardData.id,
      quantity,
      price,
      previousQuantity: cardData.quantity,
    });
  }, []);

  return (
    <Grid container sx={{ mt: 1 }}>
      <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography fontSize={15} noWrap>
          <Button onClick={() => {
            removeItem(index)
          }}>
        {cardData.name}
          </Button>
        </Typography>
      </Grid>
      <Grid item md={5}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="primary"
            onClick={() => {
              setQuantity(Number(quantity) - 1);
              handleSubtotal(index, {
                price: Number(price),
                quantity: Number(quantity) - 1,
              });
            }}
            disabled={quantity < 1 ? true : false}>
            <RemoveOutlinedIcon fontSize="small" />
          </IconButton>
          <TextField
            error={quantityError}
            id="quantity"
            size="small"
            onChange={(event) => {
              if (event.target.value < 1 || isNaN(event.target.value)) {
                // setQuantityError(true);
                setQuantity(0);
                handleSubtotal(index, {
                  price: price,
                  quantity: 0,
                });
              } else if (event.target.value > cardData.quantity) {
                // setQuantityError(true);
                setQuantity(cardData.quantity);
                handleSubtotal(index, {
                  price: price,
                  quantity: cardData.quantity,
                });
              } else {
                if (quantityError) {
                  setQuantityError(false);
                }
                setQuantity(Number(event.target.value));
                handleSubtotal(index, {
                  price: Number(price),
                  quantity: Number(event.target.value),
                });
              }
            }}
            label=""
            variant="outlined"
            value={quantity === 0 ? "" : quantity}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <IconButton
            color="primary"
            onClick={() => {
              setQuantity(Number(quantity) + 1);
              handleSubtotal(index, {
                price: Number(price),
                quantity: Number(quantity) + 1,
              });
            }}
            disabled={quantity >= cardData.quantity ? true : false}>
            <AddOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item md={2}>
        <TextField
          error={priceError}
          // sx={{ mr: 1}}
          id="price"
          size="small"
          onChange={(event) => {
            if (event.target.value < 0 || isNaN(event.target.value)) {
              setPriceError(true);
              setPrice(0);
              handleSubtotal(index, { price: 0, quantity: quantity });
            } else {
              if (priceError) {
                setPriceError(false);
              }
              setPrice(Number(event.target.value));
              handleSubtotal(index, {
                price: Number(event.target.value),
                quantity: Number(quantity),
              });
            }
          }}
          label=""
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </Grid>
      <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
        <Typography align="right" sx={{ ml: 2 }} fontSize="small">
          {quantity && price ? (quantity * price).toFixed(2) : 0}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CartItem;
