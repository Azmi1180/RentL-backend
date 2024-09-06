const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// GET all bookings
router.get('/', bookingController.getAllBookings);

// CREATE a new booking
router.post('/', bookingController.createBooking);

// DELETE a booking
router.delete('/:id', bookingController.deleteBooking);

// GET available slots for a specific Lapangan and booking date
router.get('/available-slots', bookingController.getAvailableSlots);

module.exports = router;
