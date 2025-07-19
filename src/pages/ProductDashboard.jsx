import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "../supabaseClient";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    image_url: "",
    price: "",
    description: "",
    slug: "",
    fulfillment_link: "",
  });

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error(error);
      setError("Failed to fetch products");
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirm) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error(error);
      setError("Delete failed");
    } else {
      setSuccess("Product deleted");
      fetchProducts();
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      slug: product.slug,
      image_url: product.image_url,
      price: product.price.toString(),
      description: product.description,
      fulfillment_link: product.fulfillment_link || "",
    });
  };

  const handleEditSave = async () => {
    const slug = editForm.slug || generateSlug(editForm.name);
    const parsedPrice = parseFloat(editForm.price);

    console.log("Saving product with:", {
      name: editForm.name,
      slug,
      image_url: editForm.image_url,
      price: parsedPrice,
      description: editForm.description,
      fulfillment_link: editForm.fulfillment_link || null,
    });

    if (isNaN(parsedPrice)) {
      setError("Invalid price. Please enter a valid number.");
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: editForm.name,
        slug,
        image_url: editForm.image_url,
        price: parsedPrice,
        description: editForm.description,
        fulfillment_link: editForm.fulfillment_link || null,
      })
      .eq("id", editingProduct.id);

    if (error) {
      console.error(error);
      setError("Update failed");
    } else {
      setSuccess("Product updated");
      setEditingProduct(null);
      fetchProducts();
    }
  };

  return (
    <Box sx={{ maxWidth: "90%", mx: "auto", mt: 5 }}>
      <Button
        component={Link}
        to="/shop"
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
      >
        ← Back to Shop
      </Button>

      <Typography variant="h4" gutterBottom>
        Product Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          component={Link}
          to="/admin/add-product"
          variant="outlined"
          color="success"
        >
          + Add New Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.slug}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <img src={product.image_url} alt={product.name} height="40" />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="success"
                    onClick={() => handleEditClick(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Dialog open={!!editingProduct} onClose={() => setEditingProduct(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Typography
            variant="caption"
            sx={{ color: "gray", mb: 2, display: "block" }}
          >
            Slug: {generateSlug(editForm.name)}
          </Typography>
          <TextField
            label="Image URL"
            value={editForm.image_url}
            onChange={(e) =>
              setEditForm({ ...editForm, image_url: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            value={editForm.price}
            onChange={(e) =>
              setEditForm({ ...editForm, price: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Fulfillment Link"
            value={editForm.fulfillment_link}
            onChange={(e) =>
              setEditForm({ ...editForm, fulfillment_link: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingProduct(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDashboard;
