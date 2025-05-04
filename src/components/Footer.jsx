// src/components/Footer.jsx
import { Box, Container, Typography, Stack, Link } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      position: 'fixed',          // fix to the bottom
      bottom: 0,
      width: '100%',
      bgcolor: 'transparent',     // let background show through
      color: '#fff',
      py: 2,
      zIndex: theme => theme.zIndex.modal,  // above the hero
    }}
  >
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Typography variant="body2">
        © 2025 Holistic Herbss
      </Typography>
      <Stack direction="row" spacing={3} justifyContent="center">
        <Link href="/privacy" color="inherit" underline="hover">
          Privacy
        </Link>
        <Link href="/terms" color="inherit" underline="hover">
          Terms
        </Link>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
