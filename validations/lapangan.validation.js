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
        open_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        .messages({
            'string.pattern.base': 'Format open_time must be HH:00'
        }),
        
        close_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        .messages({
            'string.pattern.base': 'Format close_time must be HH:00'
        }),
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
            open_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
            .messages({
                'string.pattern.base': 'Format open_time must be HH:00'
            }),
            close_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
            .messages({
                'string.pattern.base': 'Format close_time must be HH:00'
            }),
        });

    return schema.validate(lapangan);

    };

    // Validation for getting all Lapangans
    exports.validateGetAllLapangans = (query) => {
        const schema = Joi.object({
            type: Joi.string().optional(),
            min_price: Joi.number().optional(),
            max_price: Joi.number().optional(),
            name: Joi.string().optional(),
            city: Joi.string().optional(),
            date: Joi.date().iso().optional(),
            start_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
                .messages({
                    'string.pattern.base': 'Format start_time harus HH:MM'
                }),
            end_time: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
                .messages({
                    'string.pattern.base': 'Format end_time harus HH:MM'
                }),
        });

        return schema.validate(query);
    };

    
