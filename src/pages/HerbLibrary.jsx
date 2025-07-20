import React, { useEffect, useState } from 'react';
import {
  Box, Grid, TextField, Typography, Card, CardMedia, CardContent, Button
} from '@mui/material';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const HerbLibrary = () => {
  const [herbs, setHerbs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHerbs = async () => {
      const { data, error } = await supabase.from('herbs').select('*');
      if (data) setHerbs(data);
      else console.error(error);
    };
    fetchHerbs();
  }, []);

  const filteredHerbs = herbs.filter((herb) =>
    herb.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Herb Library</Typography>
        <Button
          component={Link}
          to="/admin/herbs"
          variant="outlined"
          color="success"
        >
          Admin Herb Dashboard
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Herbs..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4} justifyContent="center">
        {filteredHerbs.map((herb) => (
          <Grid
            item
            key={herb.id}
            sx={{
              flex: {
                xs: "1 1 100%", // 1 card per row on mobile
                sm: "1 1 48%", // 2 per row on small screens
                md: "1 1 31%", // 3 per row on medium
                lg: "1 1 23%", // 4 per row on large
              },
              maxWidth: {
                xs: "100%",
                sm: "48%",
                md: "31%",
                lg: "23%",
              },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              component={Link}
              to={`/learn/${herb.slug}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                boxShadow: 2,
                borderRadius: 2,
                transition: "0.2s",
                "&:hover": { boxShadow: 4 },
              }}
            >
              {/* Image or Placeholder */}
              {herb.image_url ? (
                <CardMedia
                  component="div"
                  sx={{
                    height: 220,
                    overflow: "hidden",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                >
                  <Box
                    component="img"
                    src={herb.image_url}
                    alt={herb.name}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </CardMedia>
              ) : (
                <Box
                  sx={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e0e0e0",
                    color: "#9e9e9e",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  {herb.name}
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {herb.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {herb.healing_benefits
                    ? herb.healing_benefits.slice(0, 90) +
                      (herb.healing_benefits.length > 90 ? "…" : "")
                    : "No description available."}
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
