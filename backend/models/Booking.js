const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  pickupLocation: String,
  dropLocation: String,
  datetime: Date,
  status: { type: String, enum: ['pending','assigned','completed'], default: 'pending' }
});
module.exports = mongoose.model('Booking', BookingSchema);
