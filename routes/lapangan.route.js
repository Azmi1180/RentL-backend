const express = require('express');
const router = express.Router();
const lapanganController = require('../controllers/lapangan.controller');

// GET all Lapangans
router.get('/', lapanganController.getAllLapangans);

// GET a single Lapangan by ID
router.get('/:id', lapanganController.getDetailLapangan);

// CREATE a new Lapangan
router.post('/', lapanganController.createLapangan);

// UPDATE a Lapangan by ID
router.put('/:id', lapanganController.editLapangan);

// DELETE a Lapangan by ID
router.delete('/:id', lapanganController.deleteLapangan);

module.exports = router;
