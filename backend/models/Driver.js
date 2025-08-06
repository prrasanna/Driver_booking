const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  licenseNumber: String,
  phone: String,
  status: { type: String, enum: ['available', 'on_trip'], default: 'available' }
});

module.exports = mongoose.model('Driver', DriverSchema);
