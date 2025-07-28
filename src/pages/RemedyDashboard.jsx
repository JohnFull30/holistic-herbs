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
import { supabase } from "../supabaseClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RemedyDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchEntries = async () => {
    const { data, error } = await supabase.from("remedies").select("*");
    if (error) setError("Failed to fetch remedies");
    else setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    const { error } = await supabase.from("remedies").delete().eq("id", id);
    if (error) setError("Delete failed");
    else {
      setSuccess("Entry deleted");
      fetchEntries();
    }
  };

  const handleEditClick = (entry) => {
    setEditing(entry);
    setEditForm({ ...entry });
  };

  const handleEditSave = async () => {
    const { id, ...formData } = editForm;
    const { error } = await supabase
      .from("remedies")
      .update(formData)
      .eq("id", editing.id);

    if (error) setError("Update failed");
    else {
      setSuccess("Entry updated");
      setEditing(null);
      fetchEntries();
    }
  };

  return (
    <Box sx={{ maxWidth: "90%", mx: "auto", mt: 5 }}>
      {/* Top buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button
          component={Link}
          to="/learn/recipes"
          variant="outlined"
          color="primary"
        >
          ← Back to Remedies
        </Button>
        <Button
          component={Link}
          to="/admin/add-remedy"
          variant="outlined"
          color="success"
        >
          + Add New Entry
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Remedy Admin Dashboard
      </Typography>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.title}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>{entry.slug}</TableCell>
                <TableCell>
                  <img src={entry.image_url} alt={entry.title} height="40" />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="success"
                    onClick={() => handleEditClick(entry)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Alerts */}
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

      {/* Edit Modal */}
      <Dialog open={!!editing} onClose={() => setEditing(null)}>
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Image URL"
            value={editForm.image_url}
            onChange={(e) =>
              setEditForm({ ...editForm, image_url: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Problem Solved"
            value={editForm.problem_solved || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, problem_solved: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Ingredients"
            value={editForm.ingredients || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, ingredients: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Instructions"
            value={editForm.instructions || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, instructions: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemedyDashboard;
