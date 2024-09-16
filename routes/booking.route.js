const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth.middleware');

// GET all bookings
router.get('/', bookingController.getAllBookings);

// CREATE a new booking
router.post('/', protect, bookingController.createBooking);

// DELETE a booking
router.delete('/:id', protect, bookingController.deleteBooking);

// GET available slots for a specific Lapangan and booking date
router.get('/available-slots', bookingController.getAvailableSlots);

module.exports = router;
