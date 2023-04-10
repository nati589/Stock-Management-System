import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function CartItem({ cardData, handleSubtotal, removeItem, subtotal }) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  useEffect(() => {
    handleSubtotal(
      cardData.id,
      {
        id: cardData.id,
        quantity,
        price,
        previousQuantity: cardData.quantity,
      },
      true
    );
  }, []);

  useEffect(() => {
    if (subtotal.find((item) => item.id === cardData.id)) {
      setQuantity(subtotal.find((item) => item.id === cardData.id).quantity);
      setPrice(
        parseFloat(subtotal.find((item) => item.id === cardData.id).price)
      );
    }
  }, [subtotal]);

  return (
    <Grid container sx={{ mt: 1 }}>
      <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title={cardData.name}>
          <Button
            onClick={() => {
              setDeleteItem(!deleteItem);
            }}>
            <Typography fontSize={12} noWrap>
              {cardData.name}
            </Typography>
          </Button>
        </Tooltip>
      </Grid>
      {!deleteItem && (
        <>
          <Grid item md={3} sx={{pr: 2}}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <IconButton
                color="primary"
                onClick={() => {
                  setQuantity(Number(quantity) - 1);
                  handleSubtotal(cardData.id, {
                    price: Number(price),
                    quantity: Number(quantity) - 1,
                  });
                }}
                disabled={quantity < 1 ? true : false}>
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton> */}
              <TextField
                error={quantityError}
                id="quantity"
                size="small"
                onChange={(event) => {
                  if (event.target.value < 1 || isNaN(event.target.value)) {
                    // setQuantityError(true);
                    setQuantity(0);
                    handleSubtotal(cardData.id, {
                      price: price,
                      quantity: 0,
                    });
                  } else if (event.target.value > cardData.quantity) {
                    // setQuantityError(true);
                    setQuantity(cardData.quantity);
                    handleSubtotal(cardData.id, {
                      price: price,
                      quantity: cardData.quantity,
                    });
                  } else {
                    if (quantityError) {
                      setQuantityError(false);
                    }
                    setQuantity(Number(event.target.value));
                    handleSubtotal(cardData.id, {
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
              {/* <IconButton
                color="primary"
                onClick={() => {
                  setQuantity(Number(quantity) + 1);
                  handleSubtotal(cardData.id, {
                    price: Number(price),
                    quantity: Number(quantity) + 1,
                  });
                }}
                disabled={quantity >= cardData.quantity ? true : false}>
                <AddOutlinedIcon fontSize="small" />
              </IconButton> */}
            </Box>
          </Grid>
          <Grid item md={3}>
            <TextField
              error={priceError}
              // sx={{ mr: 1}}
              id="price"
              type="number"
              size="small"
              value={price === 0 ? "" : price}
              onChange={(event) => {
                if (event.target.value < 0 || isNaN(event.target.value)) {
                  setPriceError(true);
                  setPrice(0);
                  handleSubtotal(cardData.id, { price: 0, quantity: quantity });
                } else {
                  if (priceError) {
                    setPriceError(false);
                  }
                  setPrice(Number(event.target.value));
                  handleSubtotal(cardData.id, {
                    price: Number(event.target.value),
                    quantity: Number(quantity),
                  });
                }
              }}
              label=""
              variant="outlined"
              // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
          <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
            <Typography align="right" sx={{ ml: 2 }} fontSize="small">
              {quantity && price ? (quantity * price).toFixed(2) : 0}
            </Typography>
          </Grid>
        </>
      )}
      {deleteItem && (
        <>
          <Grid item md={9}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <>
                <IconButton onClick={() => setDeleteItem(false)}>
                  <CloseIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    removeItem(cardData.id);
                    setDeleteItem(false);
                  }}
                  sx={{ ml: 2 }}>
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default CartItem;
