const express = require('express');
const bookingController = require('../controllers/booking.controller');

const router = express.Router();

// GET all bookings
router.get('/', (req, res) => {
  const bookings = bookingController.getAllBookings();
  res.json(bookings);
});


router.get('/:id', (req, res) => {
  const bookingId = req.params.id;
  const booking = bookingController.getBookingById(bookingId);
  res.json(booking);
});

// POST a new booking
router.post('/', (req, res) => {
  const newBooking = req.body;
  const createdBooking = bookingController.createBooking(newBooking);
  res.json(createdBooking);
});

// PUT/update a booking
router.put('/:id', (req, res) => {
  const bookingId = req.params.id;
  const updatedBooking = req.body;
  const updated = bookingController.updateBooking(bookingId, updatedBooking);
  res.json(updated);
});

// DELETE a booking
router.delete('/:id', (req, res) => {
  const bookingId = req.params.id;
  const deleted = bookingController.deleteBooking(bookingId);
  res.json(deleted);
});

module.exports = router;