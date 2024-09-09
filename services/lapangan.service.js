const { Op } = require('sequelize');
const { Lapangan, Booking } = require('../models');
const { generateAvailableSlots } = require('../helpers/slot.helpers');

exports.getAllLapangans = async (type, min_price, max_price, name, city, date, start_time, end_time) => {
    let options = {
        where: {},
        include: []
    };

    // Filter berdasarkan type
    if (type) {
        options.where.type = type;
    }

    // Filter berdasarkan city
    if (city) {
        options.where.city = city;
    }

    // Filter berdasarkan rentang harga
    if (min_price || max_price) {
        options.where.price_per_hour = {};
        if (min_price) {
            options.where.price_per_hour[Op.gte] = parseFloat(min_price);
        }
        if (max_price) {
            options.where.price_per_hour[Op.lte] = parseFloat(max_price);
        }
    }

    // Filter berdasarkan nama
    if (name) {
        options.where.name = {
            [Op.like]: `%${name}%`
        };
    }

    // Pengurutan
    if (!type && !min_price && !max_price && !name && !city && !date && !start_time && !end_time) {
        options.order = [['id', 'ASC']];
    } else {
        options.order = [['price_per_hour', 'ASC']];
    }

    const lapangans = await Lapangan.findAll(options);

    if (date && start_time && end_time) {
        const filteredLapangans = [];
        for (const lapangan of lapangans) {
            const bookings = await Booking.findAll({
                where: {
                    lapangan_id: lapangan.id,
                    booking_date: date
                }
            });

            const availableSlots = generateAvailableSlots(lapangan, bookings);
            const requestedSlot = {
                start: start_time,
                end: end_time
            };

            const isSlotAvailable = checkAnySlotAvailable(availableSlots, requestedSlot);

            if (isSlotAvailable) {
                filteredLapangans.push(lapangan);
            }
        }

        if (filteredLapangans.length === 0) {
            return {
                status: 404,
                message: 'No available fields found for the requested time',
            };
        }

        return {
            status: 200,
            data: filteredLapangans,
            message: 'Success Get Available Lapangan',
        };
    }

    if (lapangans.length === 0) {
        return {
            status: 404,
            message: 'Lapangan Not Found',
        };
    }

    return {
        status: 200,
        data: lapangans,
        message: 'Success Get All Lapangan',
    };
};

function checkAnySlotAvailable(availableSlots, requestedSlot) {
    return availableSlots.some(slot => {
        const slotStart = new Date(`1970-01-01T${slot.start}`);
        const slotEnd = new Date(`1970-01-01T${slot.end}`);
        const requestStart = new Date(`1970-01-01T${requestedSlot.start}`);
        const requestEnd = new Date(`1970-01-01T${requestedSlot.end}`);

        return (slotStart >= requestStart && slotStart < requestEnd) ||
               (slotEnd > requestStart && slotEnd <= requestEnd) ||
               (slotStart <= requestStart && slotEnd >= requestEnd);
    });
}

    // GET a single Lapangan by ID
exports.getDetailLapangan = async (req, res) => {
    const { id } = req.params;
    const data = await Lapangan.findOne({ where: { id } });

    if (!data) {
        return {
        status: 404,
        message: 'Lapangan Not Found',
        };
    }
    

    return {
        status: 200,
        data,
        message: 'Success Get Lapangan Detail',
    };
    };

    // CREATE a new Lapangan
exports.createLapangan = async (req, res) => {
    const { name, city, address, type, price_per_hour, description, open_time, close_time } = req.body;


    const data = await Lapangan.create({
        name,
        city,
        address,
        type,
        price_per_hour,
        description,
        open_time,
        close_time,
        created_at: new Date(),
        updated_at: new Date(),
    });

    return {
        status: 201,
        data,
        message: 'Success Create Lapangan',
    };
    };

    // UPDATE a Lapangan by ID
exports.editLapangan = async (req, res) => {
    const { id } = req.params;
    const data = await Lapangan.findOne({ where: { id } });

    if (!data) {
        return {
        status: 404,
        message: 'Lapangan Not Found',
        };
    }

    const { name, city, address, type, price_per_hour, description, open_time, close_time } = req.body;

    await Lapangan.update(
        { name, city, address, type, price_per_hour, description, open_time,close_time, updated_at: new Date() },
        { where: { id } }
    );

    return {
        status: 200,
        message: 'Success Update Lapangan',
    };
    };

    // DELETE a Lapangan by ID
exports.deleteLapangan = async (req, res) => {
    const { id } = req.params;
    const data = await Lapangan.findOne({ where: { id } });

    if (!data) {
        return {
        status: 404,
        message: 'Lapangan Not Found',
        };
    }

    await Lapangan.destroy({ where: { id } });

    return {
        status: 200,
        message: 'Success Delete Lapangan',
    };
    };
