const lapanganService = require('../services/lapangan.service');
const { validateAddLapangan, validateEditLapangan } = require('../validations/lapangan.validation');

    // GET all Lapangans
exports.getAllLapangans = async (req, res) => {
    const result = await lapanganService.getAllLapangans(req, res);
    return res.status(result.status).json(result);
    };

    // GET a single Lapangan by ID
exports.getDetailLapangan = async (req, res) => {
    const result = await lapanganService.getDetailLapangan(req, res);
    return res.status(result.status).json(result);
    };

    // CREATE a new Lapangan
exports.createLapangan = async (req, res) => {
    const { error } = validateAddLapangan(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }

    const result = await lapanganService.createLapangan(req, res);
    return res.status(result.status).json(result);
    };

    // UPDATE a Lapangan by ID
exports.editLapangan = async (req, res) => {
    const { error } = validateEditLapangan(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }

    const result = await lapanganService.editLapangan(req, res);
    return res.status(result.status).json(result);
    };

    // DELETE a Lapangan by ID
exports.deleteLapangan = async (req, res) => {
    const result = await lapanganService.deleteLapangan(req, res);
    return res.status(result.status).json(result);
    };
