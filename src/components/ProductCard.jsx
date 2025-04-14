import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ProductCard = ({ name, price, image }) => (
  <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
    <CardMedia
      component="img"
      height="240"
      image={image}
      alt={name}
    />
    <CardContent>
      <Typography
        gutterBottom
        variant="h6"
        component={Link}
        to={`/shop/${name}`}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            textDecoration: 'none',
            color: 'inherit',
          }
        }}
      >
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ${price}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        variant="outlined"
        color="success"
        component={Link}
        to={`/learn/${name}`}
      >
        Learn More
      </Button>
      <Button size="small" variant="contained" color="success">
        Add to Cart
      </Button>
    </CardActions>
  </Card>
);

export default ProductCard;
