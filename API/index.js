import express from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';  // Import ajv-formats
import { createUser, patchUser, deleteUser, fetchUsers, getUserById } from './user.js';

const app = express();
const PORT = 3000;

// Initialize Ajv and add formats
const ajv = new Ajv();
addFormats(ajv);  // Add formats like "email", "uri", etc.

// Define the JSON schema for user validation
const userSchema = {
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },  // Validate email format
    password: { type: 'string' },
    role: { 
      type: 'string',
      enum: ['Admin', 'Faculty', 'Adviser'],  // Allowed roles only
    },
    imageUrl: { type: 'string', format: 'uri', nullable: true },  // Validate URI format
    status: { 
      type: 'string',
      enum: ['Active', 'Inactive']  // Allowed statuses only
    }
  },
  required: ['fullname', 'username', 'email', 'password', 'role', 'status'],
  additionalProperties: false  // No extra properties allowed
};

// Validate incoming data against schema
const validateUser = (req, res, next) => {
  const validate = ajv.compile(userSchema);
  const valid = validate(req.body);

  if (!valid) {
    return res.status(400).json({ error: 'Invalid request data', details: validate.errors });
  }

  next();
};

app.use(express.json());

// --- Express Routes ---

// POST /users - Create a new user
app.post('/users', validateUser, async (req, res) => {
  try {
    const userId = await createUser(req.body);  // Ensure this returns the userId as a string

    // Return only the created user ID
    res.status(201).json({ id: userId });  // No need to wrap in String() since userId is already a string
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user, please try again.' });
  }
});


// GET /users - Fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users.' });
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
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user.' });
  }
});

// PATCH /users/:id - Partially update an existing user by ID
app.patch('/users/:id', validateUser, async (req, res) => {
  const { id } = req.params;
  try {
    await patchUser(id, req.body);
    res.status(200).json({ message: 'User partially updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user.' });
  }
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
