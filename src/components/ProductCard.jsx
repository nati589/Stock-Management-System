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
      <MyCard variant="outlined" sx={{ borderRadius: 2, borderWidth: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleInfo} color="primary">
            {!info && <InfoOutlinedIcon />}
            {info && <InfoIcon />}
          </IconButton>
        </Box>
        <CardContent sx={{ minHeight: 130 }}>
          <Box>
            <Typography align="center" variant="h6" color="primary" noWrap>
              {data.name}
            </Typography>
            <Typography align="center">Quantity: {data.quantity}</Typography>
            {info && <Typography align="center">Unit: {data.unit}</Typography>}
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
