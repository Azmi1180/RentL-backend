const bookingService = require('../services/booking.service');
const {validateBooking} = require('../validations/booking.validation');



// GET all bookings
exports.getAllBookings = async (req, res) => {
    const { userId, lapanganId, bookingDate } = req.query;
    const result = await bookingService.getAllBookings(userId, lapanganId, bookingDate);
    return res.status(result.status).json(result);
};

// GET available slots
exports.getAvailableSlots = async (req, res) => {
    const { lapanganId, bookingDate } = req.query;
    const result = await bookingService.getAvailableSlots(lapanganId, bookingDate);
    return res.status(result.status).json(result);
};


// CREATE a new booking
exports.createBooking = async (req, res) => {
    const { error } = validateBooking(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }

    const result = await bookingService.createBooking(req, res);
    return res.status(result.status).json(result);
};

// DELETE a booking
exports.deleteBooking = async (req, res) => {
    const result = await bookingService.deleteBooking(req, res);
    return res.status(result.status).json(result);
};
