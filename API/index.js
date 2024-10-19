import express from 'express';
import {
  createUser,
  patchUser,
  deleteUser,
  fetchUsers,
  getUserById
} from './user.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Users Routes ---

// POST /users - Create a new user
app.post('/users', async (req, res) => {
  try {
    const userId = await createUser(req.body);  // Assuming createUser creates the user and returns the ID

    // Construct full user object to return in the response, making imageUrl optional
    const user = {
      id: userId,
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      imageUrl: req.body.imageUrl || '',  // Default to empty string if not provided
      status: req.body.status,
      createdAt: new Date().toISOString() // Generate timestamp for createdAt
    };

    res.status(201).json(user);  // Return full user object
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET /users - Fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// GET /users/:id - Fetch a specific user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// PATCH /users/:id - Partially update an existing user by ID
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await patchUser(id, req.body);
    res.status(200).json({ message: 'User partially updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error partially updating user' });
  }
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});