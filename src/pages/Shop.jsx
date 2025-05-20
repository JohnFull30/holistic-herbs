import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductCard from '../components/ProductCard';
import { supabase } from '../supabaseClient';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        console.log('Loaded products:', data); // ✅ Valid here now
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Shop All Products
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop;
