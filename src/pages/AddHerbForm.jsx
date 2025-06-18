import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const generateSlug = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const AddHerbForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    healing_benefits: '',
    recipe: '',
    facts: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = generateSlug(formData.name);

    const { error } = await supabase.from('herbs').insert([
      { ...formData, slug },
    ]);

    if (error) {
      console.error(error);
      setError('Failed to add herb.');
    } else {
      setSuccess(true);
      setFormData({
        name: '',
        image_url: '',
        healing_benefits: '',
        recipe: '',
        facts: '',
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add New Herb
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Herb Name"
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
          label="Healing Benefits"
          name="healing_benefits"
          value={formData.healing_benefits}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Holistic Recipe"
          name="recipe"
          value={formData.recipe}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Helpful Facts"
          name="facts"
          value={formData.facts}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            component={Link}
            to="/admin/herbs"
            variant="outlined"
            color="primary"
          >
            ← Back to Dashboard
          </Button>
          <Button type="submit" variant="contained" color="success">
            Add Herb
          </Button>
        </Box>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Herb added successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddHerbForm;
