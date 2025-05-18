import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: "Lavender Essential Oil",
    price: "14.99",
    image: "https://placehold.co/400x400?text=Lavender+Oil"
  },
  {
    id: 2,
    name: "Eucalyptus Herbal Extract",
    price: "12.99",
    image: "https://placehold.co/400x400?text=Eucalyptus"
  },
  {
    id: 3,
    name: "Chamomile Tincture",
    price: "18.99",
    image: "https://placehold.co/400x400?text=Chamomile"
  },
  {
    id: 4,
    name: "Peppermint Oil",
    price: "10.99",
    image: "https://placehold.co/400x400?text=Peppermint"
  },
  {
    id: 5,
    name: "Lemon Balm",
    price: "15.99",
    image: "https://placehold.co/400x400?text=Lemon+Balm"
  },
  {
    id: 6,
    name: "Tea Tree Oil",
    price: "11.99",
    image: "https://placehold.co/400x400?text=Tea+Tree+Oil"
  }
];

const Shop = () => (
  <Box sx={{ flexGrow: 1, py: 5 }}>
    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
      Shop All Products
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} lg={3}
  sx={{ display: 'flex', justifyContent: 'center' }} key={product.id}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Shop;
