const Joi = require('joi');

// Validation for adding a new Lapangan
exports.validateAddLapangan = (lapangan) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        address: Joi.string().min(3).required(),
        type: Joi.string().min(3).required(),
        price_per_hour: Joi.number().required(),
        description: Joi.string().optional(),
        open_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(), // Format HH:MM
        close_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()  // Format HH:MM
    });

    return schema.validate(lapangan);
    };

    // Validation for editing a Lapangan
    exports.validateEditLapangan = (lapangan) => {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            city: Joi.string().min(3).required(),
            address: Joi.string().min(3).required(),
            type: Joi.string().min(3).required(),
            price_per_hour: Joi.number().required(),
            description: Joi.string().optional(),
            open_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(), // Format HH:MM
            close_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()  // Format HH:MM
        });

    return schema.validate(lapangan);
    };
