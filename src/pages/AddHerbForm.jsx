import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { supabase } from '../supabaseClient';

const AddHerbForm = () => {
  const [form, setForm] = useState({
    name: '',
    image_url: '',
    healing_benefits: '',
    recipe: '',
    facts: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    const { data, error } = await supabase.from('products').insert([form]);

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setSuccess(true);
      setForm({
        name: '',
        image_url: '',
        healing_benefits: '',
        recipe: '',
        facts: ''
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 10 }}>
      <Typography variant="h4" gutterBottom>Add New Herb</Typography>

      {success && <Alert severity="success">Herb added successfully!</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Healing Benefits"
          name="healing_benefits"
          value={form.healing_benefits}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Recipe"
          name="recipe"
          value={form.recipe}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Facts"
          name="facts"
          value={form.facts}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />

        <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
          Add Herb
        </Button>
      </form>
    </Box>
  );
};

export default AddHerbForm;
