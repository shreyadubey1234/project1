const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');  // User model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loginSignupApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Signup Route (POST /signup)
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: 'User already exists!' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User created successfully!' });
});

// Login Route (POST /login)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
