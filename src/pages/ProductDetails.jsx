import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../supabaseClient';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, description, herb_slug') // ✅ get herb_slug
        .eq('name', productId)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data);
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5">Product not found!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          onClick={() => navigate(-1)}
          variant="text"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2, textTransform: 'none', color: 'success.main' }}
        >
          Back
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <CardMedia
        component="img"
        image={product.image_url}
        alt={product.name}
        sx={{ maxHeight: 400, width: '100%', objectFit: 'cover', borderRadius: 2 }}
      />
      <Typography variant="h5" color="success.main" sx={{ my: 2 }}>
        ${product.price}
      </Typography>
      <Typography variant="body1" paragraph>{product.description}</Typography>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          component={Link}
          to={`/learn/${product.herb_slug}`} // ✅ FIXED routing
          variant="outlined"
          color="success"
          sx={{
            px: 3,
            py: 1.25,
            borderRadius: '999px',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          Learn Healing Benefits
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{
            px: 3,
            py: 1.25,
            borderRadius: '999px',
            fontWeight: 500,
            textTransform: 'uppercase',
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
