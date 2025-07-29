import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const AddAdminRemedyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    type: "recipe",
    problem_solved: "",
    healing_purpose: "",
    ingredients: "",
    instructions: "",
    safe_for_kids: false,
    safe_for_pets: false,
    herb_slug: null,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value === "" ? null : value,
  }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const slug = generateSlug(formData.title);

  // Create a shallow copy without herb_slug
  const { herb_slug, ...rest } = formData;

  // Build payload only adding herb_slug if it’s non-empty
  const payload = {
    ...rest,
    slug,
  };

  if (typeof herb_slug === "string" && herb_slug.trim() !== "") {
    payload.herb_slug = herb_slug.trim();
  }


  const { error } = await supabase.from("remedies").insert([payload]);
  if (error) {
    console.error(error);
    setError("Failed to add entry.");
  } else {
    setSuccess(true);
    setFormData({
      title: "",
      image_url: "",
      type: "recipe",
      problem_solved: "",
      healing_purpose: "",
      ingredients: "",
      instructions: "",
      safe_for_kids: false,
      safe_for_pets: false,
      herb_slug: undefined, // not "" or null
    });
  }
};


  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add New Recipe or Remedy
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="recipe">Medicinal Recipe</MenuItem>
          <MenuItem value="remedy">Natural Remedy</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Problem Solved"
          name="problem_solved"
          value={formData.problem_solved}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Healing Purpose"
          name="healing_purpose"
          value={formData.healing_purpose}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        {formData.herb_slug !== undefined && (
          <TextField
            fullWidth
            label="Linked Herb Slug (optional)"
            name="herb_slug"
            value={formData.herb_slug || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        )}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.safe_for_kids}
                onChange={handleChange}
                name="safe_for_kids"
              />
            }
            label="Safe for Kids"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.safe_for_pets}
                onChange={handleChange}
                name="safe_for_pets"
              />
            }
            label="Safe for Pets"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box>
            <Button
              component={Link}
              to="/admin/remedies"
              variant="outlined"
              color="primary"
              sx={{ mr: 1 }}
            >
              ← Back to Dashboard
            </Button>
            <Button
              component={Link}
              to="/learn/recipes"
              variant="outlined"
              color="info"
            >
              View Remedies
            </Button>
          </Box>

          <Button type="submit" variant="contained" color="success">
            Add Entry
          </Button>
        </Box>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Entry added successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AddAdminRemedyForm;
