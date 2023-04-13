import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

function ProductCard({ data, addToCart }) {
  const [info, showInfo] = useState(false);
  const MyCard = styled(Card)(({ theme }) => ({
    backgroundColor: "rgba(180,180,180,0.3)",
  }));
  function toggleInfo() {
    showInfo(!info);
  }
  return (
    <Box>
      <MyCard
        variant="outlined"
        sx={{
          borderRadius: 2,
          borderWidth: 0,
          borderTop: 2,
          borderColor: Number(data?.restock) < Number(data.quantity) ? "#ccc" : "#f44",
        }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleInfo} color="primary">
            {!info && <InfoOutlinedIcon />}
            {info && <InfoIcon />}
          </IconButton>
        </Box>
        <CardContent sx={{ minHeight: 120 }}>
          <Box>
            <Typography align="center" variant="h6" color={Number(data?.restock) < Number(data.quantity)? "primary" : "error"} noWrap>
              {data.name}
            </Typography>
            <Typography align="center" fontSize={12} sx={{ mt: 1 }}>
              Quantity: {data.quantity}
            </Typography>
            {info && (
              <Typography align="center" fontSize={10}>
                Unit: {data.unit}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => addToCart(data)}
            disabled={data.quantity == 0}>
            ADD
          </Button>
        </CardActions>
      </MyCard>
    </Box>
  );
}

export default ProductCard;
