import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const HerbLibrary = () => {
  const [herbs, setHerbs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchHerbs = async () => {
      const { data, error } = await supabase.from("herbs").select("*");

      if (error) {
        console.error("Error fetching herbs:", error);
      } else {
        setHerbs(data || []);
      }
    };

    fetchHerbs();
  }, []);

  const filteredHerbs = herbs.filter((herb) =>
    herb.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box sx={{ px: 2, py: 4 }}>
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
          color="secondary"
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

      <Grid container spacing={3}>
        {filteredHerbs.map((herb) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={herb.id}>
            <Card
              component={Link}
              to={`/learn/${herb.slug}`}
              sx={{
                textDecoration: "none",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                image={
                  herb.image_url ||
                  `${process.env.PUBLIC_URL}/images/herb-library-thumbnail.jpg`
                }
                alt={herb.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `${process.env.PUBLIC_URL}/images/herb-library-thumbnail.jpg`;
                }}
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                  backgroundColor: "#f4f4f4",
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                  {herb.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {herb.description || "No description available."}
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
