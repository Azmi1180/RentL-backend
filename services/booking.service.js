const Booking = require('../models/booking');

exports.createBooking = async (data) => {
    try {
        const booking = await Booking.create(data);
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getBookingByLapanganId = async (lapangan_id) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        lapangan_id: lapangan_id 
      }
    });
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getBookingById = async (id) => {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateBooking = async (id, data) => {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error('Booking not found');
        }
        await booking.update(data);
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteBooking = async (id) => {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error('Booking not found');
        }
        await booking.destroy();
        return { message: 'Booking deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};