import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const FeaturedCard = ({ title, description, image, link }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
    <CardMedia component="img" height="160" image={image} alt={title} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Box>
        <Button
          component={Link}
          to={link}
          variant="outlined"
          color="success"
          sx={{ borderRadius: '999px' }}
        >
          Explore
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default FeaturedCard;
