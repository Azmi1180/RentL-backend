const express = require('express');
const router = express.Router();
const lapanganController = require('../controllers/lapangan.controller');
const { protect } = require('../middleware/auth.middleware');

// GET all Lapangans with optional filters & rentang harga
router.get('/', lapanganController.getAllLapangans);

// GET a single Lapangan by ID
router.get('/:id', lapanganController.getDetailLapangan);

// CREATE a new Lapangan
router.post('/', protect, lapanganController.createLapangan);

// UPDATE a Lapangan by ID
router.put('/:id', protect, lapanganController.editLapangan);

// DELETE a Lapangan by ID
router.delete('/:id', protect, lapanganController.deleteLapangan);

module.exports = router;
