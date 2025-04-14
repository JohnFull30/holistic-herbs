import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static" color="success">
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box>
        <Button color="inherit" component={Link} to="/shop">Shop</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <LocalFloristIcon fontSize="large" />
        <Typography variant="h6">Holistic Herbs</Typography>
      </Box>
      <Box>
        <Button color="inherit" component={Link} to="/learn">Learn</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
