const Joi = require('joi');

// Validation for adding a new Review
exports.validateAddReview = (review) => {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        lapangan_id: Joi.number().integer().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
        comment: Joi.string().optional(),
    });

    return schema.validate(review);
};

// Validation for editing a Review
exports.validateEditReview = (review) => {
    const schema = Joi.object({
        rating: Joi.number().integer().min(1).max(5).required(),
        comment: Joi.string().optional(),
    });

    return schema.validate(review);
};
