const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// GET all Reviews
router.get('/', reviewController.getAllReviews);

// GET a single Review by ID
router.get('/:id', reviewController.getDetailReview);

// CREATE a new Review
router.post('/', reviewController.createReview);

// UPDATE a Review by ID
router.put('/:id', reviewController.editReview);

// DELETE a Review by ID
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
