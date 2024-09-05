const bookingService = require('../services/booking.service');

const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await bookingService.createBooking(bookingData);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookingBylapangan_id = async (req, res) => {
  try {
    const lapangan_id = req.params.lapangan_id;
    const bookings = await bookingService.getBookingBylapangan_id(lapangan_id);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await bookingService.getBookingById(bookingId);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const bookingData = req.body;
        const updatedBooking = await bookingService.updateBooking(bookingId, bookingData);
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const result = await bookingService.deleteBooking(bookingId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export the controller functions
module.exports = {
    createBooking,
    getBooking,
    getBookingBylapangan_id,
    updateBooking,
    deleteBooking
};