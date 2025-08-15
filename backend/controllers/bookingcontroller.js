const Booking = require('../models/Booking');
const Driver = require('../models/Driver');

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user._id,
    pickupLocation: req.body.pickupLocation,
    dropLocation: req.body.dropLocation,
    datetime: req.body.datetime,
    status: 'pending'
  });



  res.json(booking);
};

exports.assignDriver = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  const driver = await Driver.findById(req.body.driverId);

  if (!booking || !driver) return res.status(404).json({ msg: 'Booking or Driver not found' });

  booking.driver = driver._id;
  booking.status = 'assigned';
  await booking.save();
  booking.status='on_trip';
  await driver.save();
  res.json({ msg: 'Driver assigned successfully' ,booking});
};

exports.getBookings = async (req, res) => {
  if (req.user.role === 'customer') {
    const bookings = await Booking.find({ user: req.user._id }).populate('driver').populate('user');
    return res.json(bookings);
  }

  if (req.user.role === 'admin') {
    const bookings = await Booking.find().populate('user driver');
    return res.json(bookings);
  }

  if (req.user.role === 'driver') {
    const driver = await Driver.findOne({ userId: req.user._id });
    if (!driver) return res.status(404).json({ msg: 'Driver record not found' });

    // Show only bookings assigned to this driver
    const bookings = await Booking.find({ driver: driver._id }).populate('user').populate('driver');
    return res.json(bookings);
  }

  res.status(403).json({ msg: 'Unauthorized' });
};



