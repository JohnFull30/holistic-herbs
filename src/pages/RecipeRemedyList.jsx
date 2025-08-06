import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Tabs,
  Tab,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const RecipeRemedyList = () => {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase.from("remedies").select("*");
      if (error) console.error("❌ Supabase error:", error);
      else setEntries(data);
    };
    fetchEntries();
  }, []);

  const filtered = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.problem_solved?.toLowerCase().includes(search.toLowerCase()) ||
      entry.healing_purpose?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filter === "all" || entry.type === filter;
    return matchesSearch && matchesType;
  });

  return (
    <Box sx={{ px: 3, py: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Herbal Recipes & Remedies</Typography>
        <Button
          component={Link}
          to="/admin/remedies"
          variant="outlined"
          color="secondary"
        >
          Admin Remedy Dashboard
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        <Tabs
          value={filter}
          onChange={(e, newVal) => setFilter(newVal)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="all" label="All" />
          <Tab value="recipe" label="Medicinal Recipes" />
          <Tab value="remedy" label="Natural Remedies" />
        </Tabs>
        <TextField
          fullWidth
          label="Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {filtered.length === 0 ? (
        <Typography>No results found.</Typography>
      ) : (
        <Grid container spacing={4}>
          {filtered.map((entry) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={entry.slug}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                component={Link}
                to={`/learn/recipes/${entry.slug}`}
                sx={{
                  width: 345,
                  position: "relative",
                  pt: 3,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6 },
                  textDecoration: "none",
                }}
              >
                {/* Liquid Glass Pill Title Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backdropFilter: "blur(16px)",
                    backgroundColor: "rgba(47, 110, 65, 0.4)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "999px",
                    px: 3,
                    py: 0.75,
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: "#fff",
                      textAlign: "center",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {entry.title}
                  </Typography>
                </Box>

                <CardMedia
                  component="img"
                  height="180"
                  image={
                    entry.image_url ||
                    `${process.env.PUBLIC_URL}/images/default-remedy.jpg`
                  }
                  alt={entry.title}
                />

                {/* Centered Card Content with Title and Description */}
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    {entry.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.problem_solved ||
                      entry.healing_purpose ||
                      "Holistic wisdom"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecipeRemedyList;
