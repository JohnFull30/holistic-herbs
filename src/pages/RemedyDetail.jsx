import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Divider,
  CircularProgress,
} from "@mui/material";
import { supabase } from "../supabaseClient";

const RemedyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      const { data, error } = await supabase
        .from("remedies")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) console.error(error);
      setEntry(data);
      setLoading(false);
    };

    fetchEntry();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!entry) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Remedy not found!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 5 }}>
      <Button
        onClick={() => navigate("/learn/recipes")}
        variant="outlined"
        color="success"
        sx={{ mb: 3 }}
      >
        ← Back to Remedies
      </Button>

      <Typography variant="h3" gutterBottom>
        {entry.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        {entry.type === "recipe" ? "Medicinal Recipe" : "Natural Remedy"}
      </Typography>

      <CardMedia
        component="img"
        image={entry.image_url}
        alt={entry.title}
        sx={{ maxHeight: 400, borderRadius: 2, objectFit: "cover", mb: 3 }}
      />

      {entry.problem_solved && (
        <>
          <Typography variant="h5" color="success.main">
            Problem Solved
          </Typography>
          <Typography paragraph>{entry.problem_solved}</Typography>
        </>
      )}

      {entry.healing_purpose && (
        <>
          <Typography variant="h5" color="success.main">
            Healing Purpose
          </Typography>
          <Typography paragraph>{entry.healing_purpose}</Typography>
        </>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" color="success.main">
        Ingredients
      </Typography>
      <Typography
        component="pre"
        sx={{ whiteSpace: "pre-wrap", fontSize: "1rem" }}
      >
        {entry.ingredients}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" color="success.main">
        Instructions
      </Typography>
      <Typography
        component="pre"
        sx={{ whiteSpace: "pre-wrap", fontSize: "1rem" }}
      >
        {entry.instructions}
      </Typography>

      {entry.herb_slug && (
        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            href={`/learn/${entry.herb_slug}`}
            sx={{ textTransform: "none" }}
          >
            Learn More About This Herb →
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RemedyDetail;
