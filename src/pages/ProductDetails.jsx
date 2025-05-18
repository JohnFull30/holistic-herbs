import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';



// Mock product data (ideally fetched from backend/API)
const products = [
  {
    id: 1,
    name: "Lavender Essential Oil",
    price: "14.99",
    image: "https://placehold.co/400x400?text=Lavender+Oil",
    description: "Relaxing essential oil with calming properties."
  },
  {
    id: 2,
    name: "Eucalyptus Herbal Extract",
    price: "12.99",
    image: "https://placehold.co/400x400?text=Eucalyptus",
    description: "Fresh herbal extract beneficial for respiratory health."
  },
  {
    id: 3,
    name: "Chamomile Tincture",
    price: "18.99",
    image: "https://placehold.co/400x400?text=Chamomile",
    description: "A soothing tincture known for calming nerves and aiding sleep."
  },
  {
    id: 4,
    name: "Peppermint Oil",
    price: "10.99",
    image: "https://placehold.co/400x400?text=Peppermint",
    description: "Refreshing oil ideal for digestive health."
  },
  {
    id: 5,
    name: "Lemon Balm",
    price: "15.99",
    image: "https://placehold.co/400x400?text=Lemon+Balm",
    description: "Herbal remedy helpful for mood and stress relief."
  },
  {
    id: 6,
    name: "Tea Tree Oil",
    price: "11.99",
    image: "https://placehold.co/400x400?text=Tea+Tree+Oil",
    description: "Powerful antiseptic and skin-cleansing essential oil."
  }
];

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.name === productId);

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
        image={product.image}
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
    to={`/learn/${encodeURIComponent(product.name)}`}
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
      backgroundColor: '#1b5e20', // slightly darker green
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
