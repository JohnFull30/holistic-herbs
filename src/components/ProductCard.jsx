import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductCard = ({ name, price, image }) => (
  <Box sx={{ position: 'relative' }}>
    {/* Wrap only the product card in the Link */}
    <Card
  component={Link}
  to={`/shop/${encodeURIComponent(name)}`}
  sx={{
    maxWidth: 345,
    boxShadow: 3,
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': { boxShadow: 6 }
  }}
>
  <CardMedia component="img" height="240" image={image} alt={name} />
  <CardContent sx={{ textAlign: 'center' }}> {/* 👈 Center content here */}
    <Typography gutterBottom variant="h6">
      {name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      ${price}
    </Typography>
  </CardContent>
</Card>


    {/* Add to Cart Button BELOW the card */}
    <Box sx={{ textAlign: 'center', mt: 1 }}>
      <Button variant="contained" color="success" size="small">
        Add to Cart
      </Button>
    </Box>
  </Box>
);

export default ProductCard;
