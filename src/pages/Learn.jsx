import HeroSection from '../components/learn/HeroSection';
import FeaturedSections from '../components/learn/FeaturedSections';
import Box from '@mui/material/Box';

const Learn = () => (
<Box sx={{ maxWidth: '100vw', overflowX: 'hidden', m: 0, p: 0 }}>
  <HeroSection />
  <FeaturedSections />
</Box>

);

export default Learn;
