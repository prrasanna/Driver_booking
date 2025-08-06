const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const driverRoutes = require('./routes/driver');
const cors=require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    
}).then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/drivers', driverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
