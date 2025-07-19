import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    price: "",
    description: "",
    fulfillment_link: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = generateSlug(formData.name);

    const { error } = await supabase
      .from("products")
      .insert([{ ...formData, slug }]);

    if (error) {
      console.error(error);
      setError("Failed to add product.");
    } else {
      setSuccess(true);
      setFormData({
        name: "",
        image_url: "",
        price: "",
        description: "",
        fulfillment_link: "",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Fulfillment Link"
          name="fulfillment_link"
          value={formData.fulfillment_link}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box>
            <Button
              component={Link}
              to="/admin/products"
              variant="outlined"
              color="primary"
              sx={{ mr: 1 }}
            >
              ← Back to Product Dashboard
            </Button>
            <Button component={Link} to="/shop" variant="outlined" color="info">
              View Shop
            </Button>
          </Box>
          <Button type="submit" variant="contained" color="success">
            Add Product
          </Button>
        </Box>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Product added successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductForm;
