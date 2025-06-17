// src/pages/HerbInfo.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Box, CardMedia, Divider, Button, CircularProgress } from '@mui/material';
import { supabase } from '../supabaseClient';

const HerbInfo = () => {
  const { herbName } = useParams();
  const navigate = useNavigate();
  const [herb, setHerb] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function fetchHerb() {
    const decodedSlug = decodeURIComponent(herbName);
    console.log('🔍 Querying herb with slug:', decodedSlug);

    const { data, error } = await supabase
      .from('herbs')
      .select('*')
      .eq('slug', decodedSlug)
      .limit(1);

    if (error) {
      console.error('❌ Supabase error:', error);
      setHerb(null);
    } else {
      console.log('✅ Herb response:', data);
      setHerb(data?.[0] || null);
    }

    setLoading(false);
  }

  fetchHerb();
}, [herbName]);


  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!herb) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5">Information not found!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 5 }}>
      <Button onClick={() => navigate(-1)} variant="outlined" color="success" sx={{ mb: 3 }}>
        ← Back
      </Button>
      <Typography variant="h3" gutterBottom>{herb.name}</Typography>
      <CardMedia
        component="img"
        image={herb.image_url}
        alt={herb.name}
        sx={{ maxHeight: 400, width: '100%', borderRadius: 2, objectFit: 'cover', mb: 3 }}
      />
      <Typography variant="h5" color="success.main">Healing Benefits</Typography>
      <Typography paragraph>{herb.healing_benefits}</Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" color="success.main">Holistic Recipe</Typography>
      <Typography paragraph>{herb.recipe}</Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" color="success.main">Helpful Facts</Typography>
      <Typography>{herb.facts}</Typography>
    </Box>
  );
};

export default HerbInfo;
