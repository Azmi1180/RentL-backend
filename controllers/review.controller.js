const reviewService = require('../services/review.service');
const { validateAddReview, validateEditReview } = require('../validations/review.validation');

// GET all Reviews
exports.getAllReviews = async (req, res) => {
    const result = await reviewService.getAllReviews(req, res);
    return res.status(result.status).json(result);
};

// GET a single Review by ID
exports.getDetailReview = async (req, res) => {
    const result = await reviewService.getDetailReview(req, res);
    return res.status(result.status).json(result);
};

// CREATE a new Review
exports.createReview = async (req, res) => {
    const { error } = validateAddReview(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }

    const result = await reviewService.createReview(req, res);
    return res.status(result.status).json(result);
};

// UPDATE a Review by ID
exports.editReview = async (req, res) => {
    const { error } = validateEditReview(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }

    const result = await reviewService.editReview(req, res);
    return res.status(result.status).json(result);
};


// DELETE a Review by ID
exports.deleteReview = async (req, res) => {
    const result = await reviewService.deleteReview(req, res);
    return res.status(result.status).json(result);
};
