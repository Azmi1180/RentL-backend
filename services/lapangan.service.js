const { Op } = require('sequelize'); // Import Sequelize operators
const { Lapangan } = require('../models'); // Import the Lapangan model

// GET all Lapangans with optional filters
exports.getAllLapangans = async (type, min_price, max_price, name, city) => {
    let options = {};

    // Jika tidak ada filter atau pencarian, urutkan berdasarkan ID
    if (!type && !min_price && !max_price && !name && !city) {
        options.order = [['id', 'ASC']]; // Urutkan berdasarkan ID secara ascending
    } else {
        // Jika ada filter, urutkan berdasarkan price_per_hour secara ascending
        options.order = [['price_per_hour', 'ASC']];
    }

    // Tambahkan filter berdasarkan type jika tersedia
    if (type) {
        options.where = { type };
    }

    if(city){
        options.where = { city };
    }

    // Tambahkan filter untuk rentang harga jika min_price atau max_price disediakan
    if (min_price || max_price) {
        options.where = options.where || {};
        options.where.price_per_hour = {};

        if (min_price) {
            options.where.price_per_hour[Op.gte] = parseFloat(min_price); // Filter harga minimum
        }

        if (max_price) {
            options.where.price_per_hour[Op.lte] = parseFloat(max_price); // Filter harga maksimum
        }
    }
        // Tambahkan filter untuk pencarian nama jika disediakan
    if (name) {
        options.where = options.where || {};
        options.where.name = {
            [Op.like]: `%${name}%`, // Gunakan operator LIKE untuk pencarian nama
        };
    }

    const data = await Lapangan.findAll(options);
        // Cek apakah data ditemukan
        if (data.length === 0) {
            return {
                status: 404,
                message: 'Data not found',
            };
        }
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
    const { name, city, address, type, price_per_hour, description, open_time, close_time } = req.body;


    const data = await Lapangan.create({
        name,
        city,
        address,
        type,
        price_per_hour,
        description,
        open_time,
        close_time,
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

    const { name, city, address, type, price_per_hour, description, open_time, close_time } = req.body;

    await Lapangan.update(
        { name, city, address, type, price_per_hour, description, open_time,close_time, updated_at: new Date() },
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
