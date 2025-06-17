import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { supabase } from '../supabaseClient';

const HerbLibrary = () => {
  const [herbs, setHerbs] = useState([]);

  useEffect(() => {
    async function fetchHerbs() {
      const { data, error } = await supabase.from('herbs').select('*');
      if (error) {
        console.error('Error fetching herbs:', error);
      } else {
        setHerbs(data);
      }
    }

    fetchHerbs();
  }, []);

  return (
    <Box sx={{ px: 2, py: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Herb Library
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {herbs.map((herb) => (
          <Grid item key={herb.id} xs={12} sm={6} md={4}>
            <Card
              component={Link}
              to={`/learn/${herb.slug}`}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                transition: '0.3s',
                '&:hover': { boxShadow: 6 }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={herb.image_url || 'https://placehold.co/400x400?text=No+Image'}
                alt={herb.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {herb.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {herb.description || 'No description available.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HerbLibrary;
