import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Stack, Button, TextField, Typography } from '@mui/material';

export default function AdminRouteManager() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ from: '', to: '', distance: '', price: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch all routes
    const fetchRoutes = async () => {
      const response = await axios.get('https://gateguard-backend.onrender.com/routes');
      setRoutes(response.data.routes);
    };
    fetchRoutes();
  }, []);

  const handleSubmit = async () => {
    if (editMode) {
      await axios.put(`https://gateguard-backend.onrender.com/routes/${editId}`, form);
    } else {
      await axios.post('https://gateguard-backend.onrender.com/routes/create', form);
    }

    // Refresh routes
    const response = await axios.get('https://gateguard-backend.onrender.com/routes');
    setRoutes(response.data.routes);

    // Reset form
    setForm({ from: '', to: '', distance: '', price: '' });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (route) => {
    setForm({ from: route.from, to: route.to, distance: route.distance, price: route.price });
    setEditMode(true);
    setEditId(route._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://gateguard-backend.onrender.com/routes/${id}`);
    // Refresh routes
    const response = await axios.get('https://gateguard-backend.onrender.com/routes');
    setRoutes(response.data.routes);
  };

  return (
    <div className="container">
      <Typography variant="h4">Manage Routes</Typography>
      <Stack spacing={2} mt={3}>
        <TextField
          label="From"
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
          fullWidth
        />
        <TextField
          label="To"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          fullWidth
        />
        <TextField
          label="Distance (km)"
          value={form.distance}
          onChange={(e) => setForm({ ...form, distance: e.target.value })}
          fullWidth
        />
        <TextField
          label="Price (#)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          fullWidth
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editMode ? 'Update Route' : 'Create Route'}
        </Button>
      </Stack>

      <Typography variant="h5" mt={5}>
        Existing Routes
      </Typography>
      <table className="route-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Distance (km)</th>
            <th>Price (#)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id}>
              <td>{route.from}</td>
              <td>{route.to}</td>
              <td>{route.distance}</td>
              <td>{route.price}</td>
              <td>
                <button type="submit" onClick={() => handleEdit(route)} className="edit-btn">
                  Edit
                </button>
                <button
                  type="submit"
                  onClick={() => handleDelete(route._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
