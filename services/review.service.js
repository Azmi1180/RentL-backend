const { Review, User, Lapangan } = require('../models'); // Pastikan model User dan Lapangan diimpor
const moment = require('moment-timezone');

// GET all Reviews
exports.getAllReviews = async (req, res) => {
    const data = await Review.findAll();
    return {
        status: 200,
        data,
        message: 'Success Get All Reviews',
    };
};

// GET a single Review by ID
exports.getDetailReview = async (req, res) => {
    const { id } = req.params;
    const data = await Review.findOne({ where: { id } });

    if (!data) {
        return {
            status: 404,
            message: 'Review Not Found',
        };
    }

    return {
        status: 200,
        data,
        message: 'Success Get Review Detail',
    };
};

// CREATE a new Review
exports.createReview = async (req, res) => {
    const { user_id, lapangan_id, rating, comment } = req.body;

    // Cek apakah user_id ada di tabel Users
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
        return {
            status: 404,
            message: 'User not found',
        };
    }

    // Cek apakah lapangan_id ada di tabel Lapangans
    const lapangan = await Lapangan.findOne({ where: { id: lapangan_id } });
    if (!lapangan) {
        return {
            status: 404,
            message: 'Lapangan not found',
        };
    }

    const createdAt = moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

    const data = await Review.create({
        user_id,
        lapangan_id,
        rating,
        comment,
        created_at: createdAt,
    });

    return {
        status: 201,
        data,
        message: 'Success Create Review',
    };
};

// UPDATE a Review by ID
exports.editReview = async (req, res) => {
    const { id } = req.params;
    const data = await Review.findOne({ where: { id } });

    if (!data) {
        return {
            status: 404,
            message: 'Review Not Found',
        };
    }

    const { user_id, lapangan_id, rating, comment } = req.body;

    // Cek apakah user_id ada di tabel Users jika ada perubahan
    if (user_id) {
        const user = await User.findOne({ where: { id: user_id } });
        if (!user) {
            return {
                status: 404,
                message: 'User not found',
            };
        }
    }

    // Cek apakah lapangan_id ada di tabel Lapangans jika ada perubahan
    if (lapangan_id) {
        const lapangan = await Lapangan.findOne({ where: { id: lapangan_id } });
        if (!lapangan) {
            return {
                status: 404,
                message: 'Lapangan not found',
            };
        }
    }

    await Review.update(
        { rating, comment },
        { where: { id } }
    );

    return {
        status: 200,
        message: 'Success Update Review',
    };
};

// DELETE a Review by ID
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    const data = await Review.findOne({ where: { id } });

    if (!data) {
        return {
            status: 404,
            message: 'Review Not Found',
        };
    }

    await Review.destroy({ where: { id } });

    return {
        status: 200,
        message: 'Success Delete Review',
    };
};
