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
      if (error) console.error("Failed to fetch remedies:", error);
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
      {/* Header and Admin button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Herbal Recipes & Remedies</Typography>
        <Button
          component={Link}
          to="/admin/remedies"
          variant="outlined"
          color="secondary"
        >
          Admin Add Entry
        </Button>
      </Box>

      {/* Tabs and Search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Tabs
          value={filter}
          onChange={(e, newValue) => setFilter(newValue)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="All" value="all" />
          <Tab label="Medicinal Recipes" value="recipe" />
          <Tab label="Natural Remedies" value="remedy" />
        </Tabs>

        <TextField
          label="Search entries..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Grid of entries */}
      <Grid container spacing={3}>
        {filtered.map((entry) => (
          <Grid item xs={12} sm={6} md={4} key={entry.slug}>
            <Card
              component={Link}
              to={`/learn/recipes/${entry.slug}`}
              sx={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                height="160"
                image={entry.image_url}
                alt={entry.title}
              />
              <CardContent>
                <Typography variant="h6">{entry.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {entry.problem_solved ||
                    entry.healing_purpose ||
                    "Holistic knowledge for everyday healing"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipeRemedyList;
