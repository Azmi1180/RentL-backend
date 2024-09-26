const { rupiahFormat } = require('../helpers/rupiahFormat.helper');
const { Checkout, Lapangan, User } = require('../models');
const midtransClient = require('midtrans-client');

// Create Core API instance
let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-J9QnrxjOBZmP0dxlAtNxrnnP',
    clientKey: 'SB-Mid-client-mz83itkeVpAdDtom'
});

exports.createCheckoutProduct = async (req) => {
    try {
        const { id_lapangan, duration, bank } = req.body;



        // Check user authentication
        const id_user = req.user_data ? req.user_data.id : null;
        if (!id_user) {
            return {
                status: 401,
                message: 'Unauthorized',
            };
        }

        // Fetch lapangan data
        const lapangan = await Lapangan.findOne({ where: { id: id_lapangan } });
        if (!lapangan) {
            return {
                status: 404,
                message: "Lapangan yang ingin kamu booking tidak ditemukan"
            };
        }

        // Calculate total price
        const totalPrice = duration * lapangan.price_per_hour;

        // Generate a random order ID (use uuid instead for production)
        const randomOrderId = `order-${Math.floor(Math.random() * 1000)}`;

        // Midtrans payload
        const dataMidtrans = {
            "payment_type": "bank_transfer",
            "transaction_details": {
                "order_id": randomOrderId,
                "gross_amount": totalPrice
            },
            "items_details": [{
                "id": lapangan.id,
                "price": lapangan.price_per_hour,
                "quantity": duration,
                "name": lapangan.name
            }],
            "bank_transfer": {
                "bank": bank
            },
            "customer_details": {
                "first_name": req.user_data.name,
                "last_name": req.user_data.name,
                "email": req.user_data.email
            }
        };

        // Charge via Midtrans
        const transactionToken = await coreApi.charge(dataMidtrans);

        // Check if va_numbers is available
        const vaNumber = transactionToken.va_numbers && transactionToken.va_numbers[0].va_number;
        if (!vaNumber) {
            throw new Error("Failed to retrieve VA number from Midtrans.");
        }

        console.log(Checkout);

        // Save transaction in the database
        let data = await Checkout.create({
            order_id: randomOrderId,
            id_user,
            id_lapangan,
            duration,
            total_amount: totalPrice,
            payment_status: "pending",
            payment_method: "bank_transfer",
            va_number: vaNumber
        });

        // Format total price in rupiah
        data.dataValues.total = rupiahFormat(totalPrice);

        return {
            status: 201,
            transactionToken,
            message: "Success Create Data"
        };

    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Internal Server Error",
            error: error.message
        };
    }
};
