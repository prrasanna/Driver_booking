const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const { protect, authorize } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// DRIVER SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, licenseNumber, phone } = req.body;

    // 1. Validate
    if (!name || !email || !password || !licenseNumber || !phone) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already in use' });

    // 3. Create User
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password,
      role: 'driver'
    });

    // 4. Create Driver profile
    const driver = await Driver.create({
      userId: user._id,
      name,
      licenseNumber,
      phone
    });

    // 5. Return token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      msg: 'Driver signed up successfully',
      token,
      user,
      driver
    });
  } catch (err) {
    console.error('Driver signup failed:', err);
    res.status(500).json({ msg: 'Driver signup failed', error: err.message });
  }
});

router.get('/', protect, authorize('admin'), async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

module.exports = router;
