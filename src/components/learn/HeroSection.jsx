import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => (
  <Box
    component="section"
    sx={{
      width: '100%',              // Full viewport width
      minHeight: '60dvh',          // Full viewport height
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/learn-hero.jpg)`,
      backgroundSize: { xs: 'cover', xl: '100% 100%' },
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#fff',
      m: 0,
      p: 0,
    }}
  >
    {/* Overlay */}
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(47, 110, 65, 0.5))',
        zIndex: 1,
      }}
    />

    {/* Content */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        px: 3,
        maxWidth: 800,
      }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }, mb: 2 }}
      >
        Your Gateway to Herbal Wisdom
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          fontSize: { xs: '1.125rem', sm: '1.25rem' },
          mb: 4,
        }}
      >
        Explore, Learn, Heal: Discover herbal recipes, wellness guides, and join our thriving community.
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{
          borderRadius: '999px',
          px: 4,
          py: 1.5,
          backgroundColor: '#2f6e41',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#245733',
          },
        }}
      >
        Explore Herb Library
      </Button>
    </Box>
  </Box>
);

export default HeroSection;
