const { DATE } = require('sequelize');
const { Lapangan } = require('../models'); // Import the Lapangan model

    // GET all Lapangans
exports.getAllLapangans = async (req, res) => {
    const data = await Lapangan.findAll();
    return {
        status: 200,
        data,
        message: 'Success Get All Lapangans',
    };
};

    // GET a single Lapangan by ID
exports.getDetailLapangan = async (req, res) => {
    const { id } = req.params;
    const data = await Lapangan.findOne({ where: { id } });

    if (!data) {
        return {
        status: 404,
        message: 'Lapangan Not Found',
        };
    }

    return {
        status: 200,
        data,
        message: 'Success Get Lapangan Detail',
    };
    };

    // CREATE a new Lapangan
exports.createLapangan = async (req, res) => {
    const { name, location, type, price_per_hour, description } = req.body;


    const data = await Lapangan.create({
        name,
        location,
        type,
        price_per_hour,
        description,
        created_at: new Date(),
        updated_at: new Date(),
    });

    return {
        status: 201,
        data,
        message: 'Success Create Lapangan',
    };
    };

    // UPDATE a Lapangan by ID
exports.editLapangan = async (req, res) => {
    const { id } = req.params;
    const data = await Lapangan.findOne({ where: { id } });

    if (!data) {
        return {
        status: 404,
        message: 'Lapangan Not Found',
        };
    }

    const { name, location, type, price_per_hour, description } = req.body;

    await Lapangan.update(
        { name, location, type, price_per_hour, description, updated_at: new Date() },
        { where: { id } }
    );

    return {
        status: 200,
        message: 'Success Update Lapangan',
    };
    };

    // DELETE a Lapangan by ID
exports.deleteLapangan = async (req, res) => {
    const { id } = req.params;
    const data = await Lapangan.findOne({ where: { id } });

    if (!data) {
        return {
        status: 404,
        message: 'Lapangan Not Found',
        };
    }

    await Lapangan.destroy({ where: { id } });

    return {
        status: 200,
        message: 'Success Delete Lapangan',
    };
    };
