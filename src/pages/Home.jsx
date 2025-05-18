// src/pages/Home.jsx
import { Box, Typography, Stack, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    {/* 1) Fixed background layer */}
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/herb-hero2.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: -1,             // sit behind everything
      }}
    />

    {/* 2) Your actual page content */}
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        overflow: 'hidden', // Prevents overfill/scrollbars
        boxSizing: 'border-box',
        p: 0, // Remove default padding
      }}
    >
      {/* Hero section (still full-screen, but now over the fixed BG) */}
      <Box
        component="section"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            textAlign: 'center',
            color: '#fff',
            textShadow: '0 2px 6px rgba(0,0,0,0.6)',
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to Holistic Herbs
          </Typography>
          <Typography variant="h5" paragraph>
            Explore our finest herbs and essential oils.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Shop Now
            </Button>
            <Button
              component={Link}
              to="/learn"
              variant="contained"
              size="large"
              sx={{ borderWidth: 2, color: '#fff', borderColor: '#fff' }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* …other page sections go here (they’ll scroll over the fixed bg) */}
    </Container>
  </>
);

export default Home;
