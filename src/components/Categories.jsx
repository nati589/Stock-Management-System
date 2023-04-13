import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

function Categories({ data, handleSort }) {
  const [category, setCategory] = useState("All");

  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel id="categories">Categories</InputLabel>
      <Select
        labelId="categories"
        id="categoryid"
        value={category}
        label="Categories"
        onChange={(event) => {
          setCategory(event.target.value)
          handleSort(event.target.value)
        }}>
        <MenuItem value={"All"}>All</MenuItem>
        {data.map((item, index) => (
          <MenuItem value={item.name} key={index}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Categories;
