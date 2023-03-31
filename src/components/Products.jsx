import { Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

function Products({ data, addToCart }) {
  return (
    <Grid 
      container 
      spacing={{ xs: 2, md: 3 }} 
      columns={{ xs: 4, sm: 8, md: 12 }}
      // sx={{ bgcolor: '#f5f6fa' }}
    >
        {data.map((product, index) => (
            <Grid item xs={4} sm={4} md={6} lg={3} key={index}>
                <ProductCard data={product} addToCart={addToCart} />
            </Grid>
        ))}
    </Grid>

  )
}

export default Products