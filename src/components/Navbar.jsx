// src/components/Navbar.jsx
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const Navbar = () => {
  const { pathname } = useLocation();
  // Solid navbar on both /shop and /learn
  const isSolid = ['/shop', '/learn', '/herbs'].some(prefix => pathname.startsWith(prefix));

  return (
    <AppBar
      position="fixed"
      elevation={isSolid ? 4 : 0}
      sx={{
        bgcolor: isSolid
          ? 'rgba(255,255,255,0.95)' // white-ish on Shop & Learn
          : 'transparent',           // transparent elsewhere
        color: isSolid
          ? 'primary.main'           // green links on white bg
          : '#fff',                  // white links on transparent bg
        backdropFilter: 'blur(10px)',
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Button sx={{ fontWeight: 'bold' }} component={Link} to="/shop" color="inherit">
          Shop
        </Button>

        <IconButton component={Link} to="/" color="inherit">
          <LocalFloristIcon fontSize="large" />
          <Typography variant="h6"  sx={{ ml: 1, fontWeight: 500 }}>
            Holistic Herbs
          </Typography>
        </IconButton>

        <Button sx={{ fontWeight: 'bold' }} component={Link} to="/learn" color="inherit">
          Learn
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
