// src/pages/HerbLibrary.jsx
import { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import herbs from '../data/herbs';


const HerbLibrary = () => {
  const [search, setSearch] = useState("");

  const filteredHerbs = herbs.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  const letters = [...new Set(herbs.map(h => h.name[0].toUpperCase()))].sort();

  return (
    <Box sx={{ p: 4, pt: 12 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Herb Library
      </Typography>

      <Box sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Herbs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ borderRadius: '50px', bgcolor: 'white' }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
        {letters.map(letter => (
          <Button
            key={letter}
            href={`#${letter}`}
            size="small"
            sx={{ m: 0.5 }}
          >
            {letter}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredHerbs.map(herb => (
          <Grid item xs={12} sm={6} md={4} key={herb.id} id={herb.name[0].toUpperCase()}>
            <Card component={Link} to={`/herbs/${encodeURIComponent(herb.slug)}`} sx={{ textDecoration: 'none', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
              <CardMedia component="img" height="200" image={herb.image} alt={herb.name} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{herb.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {herb.description}
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
