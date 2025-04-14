import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Home = () => (
  <Box sx={{ textAlign: 'center', my: 4 }}>
    <Typography variant="h3" gutterBottom>
      Welcome to Holistic Herbs
    </Typography>
    <Typography variant="body1">
      Explore our finest herbs and essential oils.
    </Typography>
  </Box>
);

export default Home;
