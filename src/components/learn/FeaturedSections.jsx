import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FeaturedCard from './FeaturedCard';

const sections = [
  {
    title: 'Herb Library',
    description: 'Discover herbs and their healing properties.',
    image: `${process.env.PUBLIC_URL}/images/herb-library-thumbnail.jpg`,
    link: '/herbs'
  },
  {
    title: 'Recipes & Remedies',
    description: 'Step-by-step guides for herbal recipes and wellness.',
    image: `${process.env.PUBLIC_URL}/images/recipe-thumbnail.jpg`,
    link: '/learn/recipes'
  },
  {
    title: 'Wellness Blog',
    description: 'Expert insights, seasonal wellness, and more.',
    image: `${process.env.PUBLIC_URL}/images/blog-thumbnail.jpg`,
    link: '/learn/blog'
  },
  {
    title: 'Community Forum',
    description: 'Share, learn, and connect with others.',
    image: `${process.env.PUBLIC_URL}/images/community-thumbnail.jpg`,
    link: '/learn/community'
  }
];

const FeaturedSections = () => (
  <Box
    sx={{
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 6, md: 10 },
      backgroundColor: '#f4f7f5',
      textAlign: 'center',
    }}
  >
    <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: '#2f6e41' }}>
      Explore Our Resources
    </Typography>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: 3, md: 4 },
      }}
    >
      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            flex: {
              xs: '1 1 100%',     // 1 per row on mobile
              sm: '1 1 48%',      // 2 per row on tablets
              md: '1 1 22%',      // 4 per row on desktop
            },
            maxWidth: 300,
          }}
        >
          <FeaturedCard {...section} />
        </Box>
      ))}
    </Box>
  </Box>
);

export default FeaturedSections;
