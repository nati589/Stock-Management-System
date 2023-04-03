import { SearchOutlined } from "@mui/icons-material";
import { Alert, alpha, Snackbar } from "@mui/material";
import { InputBase } from "@mui/material";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Products from "../components/Products";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
} from "firebase/firestore";
import SaleDetails from "../components/SaleDetails";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // marginRight: theme.spacing(3),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    borderRadius: "5px",
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Sales() {
  const productsRef = collection(db, "products");
  const categoryRef = collection(db, "categories");
  const userRef = collection(db, "users");
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const getProducts = async () => {
    try {
      const productData = await getDocs(productsRef);
      const filteredProducts = productData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(filteredProducts);
      setSortedProducts(filteredProducts);
    } catch (error) {
      console.error("hi");
      setOpenSnackbar(true);
    }
  };
  const getCategories = async () => {
    try {
      const categoryData = await getDocs(categoryRef);
      const filteredCategories = categoryData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategories(filteredCategories);
    } catch (error) {
      console.error("hi");
    }
  };
  const getUsers = async () => {
    try {
      const userData = await getDocs(userRef);
      const filteredUsers = userData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(filteredUsers.filter(user => user.admin === false));
    } catch (error) {
      console.error("hi");
    }
  };
  useEffect(() => {
    getProducts();
    getCategories();
    getUsers();
  }, []);
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    if (!cart.includes(product)) {
      setCart([...cart, product]);
    }
  };
  const removeCart = () => {
    setCart([]);
  };
  const handleSort = (event) => {
    if (event === "All") {
      setSortedProducts(products);
    } else {
      setSortedProducts(products.filter((item) => item.category === event));
    }
  };

  return (
    <Grid container spacing={1} sx={{ pl: 1, pr: 1 }}>
      <Grid item xs={8} md={7} sx={{ maxHeight: "85vh", overflowY: "scroll" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            pl: 0,
            pr: 0,
          }}>
          <Categories data={categories} handleSort={handleSort} />
          <Search>
            <SearchIconWrapper>
              <SearchOutlined />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => setSearchData(event.target.value)}
            />
          </Search>
        </Box>
        <Products
          data={
            searchData === ""
              ? sortedProducts
              : sortedProducts.filter((sortedProduct) =>
                  sortedProduct.name
                    .toLowerCase()
                    .includes(searchData.toLowerCase())
                )
          }
          addToCart={addToCart}
        />
      </Grid>
      <Grid item xs={4} md={5} sx={{ maxHeight: "80vh" }}>
        <SaleDetails
          users={users}
          cart={cart}
          removeCart={removeCart}
          handleSnackbarOpen={setOpenSnackbar}
        />
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}>
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}>
          Sale registered
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Sales;
