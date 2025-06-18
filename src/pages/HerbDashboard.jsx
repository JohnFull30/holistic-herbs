import { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '../supabaseClient';

const generateSlug = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const HerbDashboard = () => {
  const [herbs, setHerbs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingHerb, setEditingHerb] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    image_url: '',
    healing_benefits: '',
    recipe: '',
    facts: '',
    slug: ''
  });

  const fetchHerbs = async () => {
    const { data, error } = await supabase.from('herbs').select('*');
    if (error) {
      console.error(error);
      setError('Failed to fetch herbs');
    } else {
      setHerbs(data);
    }
  };

  useEffect(() => {
    fetchHerbs();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this herb?');
    if (!confirm) return;

    const { error } = await supabase.from('herbs').delete().eq('id', id);
    if (error) {
      console.error(error);
      setError('Delete failed');
    } else {
      setSuccess('Herb deleted');
      fetchHerbs();
    }
  };

  const handleEditClick = (herb) => {
    setEditingHerb(herb);
    setEditForm({
      name: herb.name,
      image_url: herb.image_url,
      healing_benefits: herb.healing_benefits || '',
      recipe: herb.recipe || '',
      facts: herb.facts || '',
      slug: herb.slug || ''
    });
  };

  const handleEditSave = async () => {
    const slug = editForm.slug ? editForm.slug : generateSlug(editForm.name);

    const { error } = await supabase
      .from('herbs')
      .update({
        name: editForm.name,
        slug,
        image_url: editForm.image_url,
        healing_benefits: editForm.healing_benefits,
        recipe: editForm.recipe,
        facts: editForm.facts
      })
      .eq('id', editingHerb.id);

    if (error) {
      console.error(error);
      setError('Update failed');
    } else {
      setSuccess('Herb updated');
      setEditingHerb(null);
      fetchHerbs();
    }
  };

  return (
    <Box sx={{ maxWidth: '90%', mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Herb Admin Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button component={Link} to="/herbs" color="info" variant="outlined" sx={{ mr: 1 }}>
          ← Back to Learn
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0f2f1' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {herbs.map((herb) => (
              <TableRow key={herb.id}>
                <TableCell>{herb.name}</TableCell>
                <TableCell>{herb.slug}</TableCell>
                <TableCell>
                  <img src={herb.image_url} alt={herb.name} height="40" />
                </TableCell>
                <TableCell>
                  <IconButton color="success" onClick={() => handleEditClick(herb)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(herb.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Dialog open={!!editingHerb} onClose={() => setEditingHerb(null)}>
        <DialogTitle>Edit Herb</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" sx={{ color: 'gray', mb: 2, display: 'block' }}>
            Slug: {generateSlug(editForm.name)}
          </Typography>
          <TextField
            label="Image URL"
            value={editForm.image_url}
            onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Healing Benefits"
            value={editForm.healing_benefits}
            onChange={(e) => setEditForm({ ...editForm, healing_benefits: e.target.value })}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Recipe"
            value={editForm.recipe}
            onChange={(e) => setEditForm({ ...editForm, recipe: e.target.value })}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Helpful Facts"
            value={editForm.facts}
            onChange={(e) => setEditForm({ ...editForm, facts: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingHerb(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          component={Link}
          to="/admin/add-herb"
          variant="outlined"
          color="success"
        >
          + Add New Herb
        </Button>
      </Box>
    </Box>
  );
};

export default HerbDashboard;
