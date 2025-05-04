// src/pages/Learn.jsx
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Learn = () => (
  <Box
    sx={{
      textAlign: 'center',
      pt: '80px',   // push down below the navbar (64px) + extra 16px padding
      pb: 4,        // bottom padding for breathing room
    }}
  >
    <Typography variant="h3" gutterBottom>
      Learn About Herbs
    </Typography>
    <Typography variant="body1">
      Educational content and resources coming soon.
    </Typography>
  </Box>
);

export default Learn;
