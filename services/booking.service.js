const { Op } = require('sequelize');
const { Booking, Lapangan, User } = require('../models');
const { generateAvailableSlots } = require('../helpers/slot.helpers'); // Import helper

// GET all bookings with optional filters
exports.getAllBookings = async (userId, lapanganId, bookingDate) => {
    let options = {};

    // Filter bookings by userId
    if (userId) {
        options.where = { user_id: userId };
    }

    // Filter bookings by lapanganId
    if (lapanganId) {
        options.where = options.where || {};
        options.where.lapangan_id = lapanganId;
    }

    // Filter bookings by booking date
    if (bookingDate) {
        
        options.where = options.where || {};
        options.where.booking_date = bookingDate;
    }

    const data = await Booking.findAll({
        where: options.where,
        include: [
            { model: Lapangan, as: 'lapangan' }, // Include related Lapangan
            { model: User, as: 'user' } // Include related User
        ]
    });

    if (data.length === 0) {
        return {
            status: 404,
            message: 'Bookings not found',
        };
    }

    return {
        status: 200,
        data,
        message: 'Success Get All Bookings',
    };
};

// CREATE a new Booking
exports.createBooking = async (req, res) => {
    const { user_id, lapangan_id, booking_date, start_time, end_time } = req.body;

    // Fetch lapangan to calculate total price
    const lapangan = await Lapangan.findByPk(lapangan_id);
    if (!lapangan) {
        return {
            status: 404,
            message: 'Lapangan not found',
        };
    }

    // Check if booking time is within lapangan's operating hours
    const bookingStartTime = new Date(`1970-01-01T${start_time}`);
    const bookingEndTime = new Date(`1970-01-01T${end_time}`);
    const lapanganOpenTime = new Date(`1970-01-01T${lapangan.open_time}`);
    const lapanganCloseTime = new Date(`1970-01-01T${lapangan.close_time}`);

    if (bookingStartTime < lapanganOpenTime || bookingEndTime > lapanganCloseTime) {
        return {
            status: 400,
            message: `Booking time is outside of lapangan's operating hours. Operating hours: ${lapangan.open_time} - ${lapangan.close_time}`,
        };
    }

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
        where: {
            lapangan_id,
            booking_date,
            [Op.or]: [
                {
                    start_time: {
                        [Op.between]: [start_time, end_time]
                    }
                },
                {
                    end_time: {
                        [Op.between]: [start_time, end_time]
                    }
                },
                {
                    [Op.and]: [
                        { start_time: { [Op.lte]: start_time } },
                        { end_time: { [Op.gte]: end_time } }
                    ]
                }
            ]
        }
    });

    if (existingBooking) {
        return {
            status: 409,
            message: 'Booking time is already taken, please choose another time',
        };
    }

    // Calculate total price based on booking duration
    const duration = (bookingEndTime - bookingStartTime) / (1000 * 60 * 60); // in hours
    const total_price = duration * lapangan.price_per_hour;

    // Create the booking
    const booking = await Booking.create({
        user_id,
        lapangan_id,
        booking_date,
        start_time,
        end_time,
        total_price,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
    });

    return {
        status: 201,
        data: booking,
        message: 'Booking created successfully',
    };
};

// DELETE a Booking by ID
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    const data = await Booking.findOne({ where: { id } });

    if (!data) {
        return {
            status: 404,
            message: 'Booking Not Found',
        };
    }

    await Booking.destroy({ where: { id } });

    return {
        status: 200,
        message: 'Success Delete Booking',
    };
};

// GET all available slots for a specific Lapangan and booking date
exports.getAvailableSlots = async (lapanganId, bookingDate) => {
    const lapangan = await Lapangan.findByPk(lapanganId);

    if (!lapangan) {
        return {
            status: 404,
            message: 'Lapangan not found',
        };
    }

    // Ambil semua booking di lapangan dan tanggal tertentu
    const bookings = await Booking.findAll({
        where: {
            lapangan_id: lapanganId,
            booking_date: bookingDate
        }
    });

    // Menggunakan fungsi generateAvailableSlots dari helper
    const availableSlots = generateAvailableSlots(lapangan, bookings);

    return {
        status: 200,
        data: availableSlots,
        message: 'Success Get Available Slots',
    };
};
