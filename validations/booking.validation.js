const Joi = require('joi');

// Validation for creating a new Booking
exports.validateBooking = (booking) => {
    const schema = Joi.object({
        lapangan_id: Joi.number().required(),
        booking_date: Joi.date().required(),
        start_time: Joi.string().pattern(/^([01]\d|2[0-3]):00$/).required()
            .messages({
                'string.pattern.base': 'Format start_time must be HH:00'
            }),
        end_time: Joi.string().pattern(/^([01]\d|2[0-3]):00$/).required()
            .messages({
                'string.pattern.base': 'Format end_time must be HH:00'
            }),
    });

    return schema.validate(booking);
};