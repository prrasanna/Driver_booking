const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { createBooking, getBookings,assignDriver } = require('../controllers/bookingcontroller');

router.use(protect);
router.post('/', authorize('customer'), createBooking);
router.get('/', getBookings);
router.put('/:id/assign', protect, authorize('admin'),assignDriver );


module.exports = router;
