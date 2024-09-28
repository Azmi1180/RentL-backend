const { rupiahFormat } = require('../helpers/rupiahFormat.helper');
const { Checkout, Booking, Lapangan } = require('../models'); // Pastikan Lapangan diimpor
const midtransClient = require('midtrans-client');

// Create Core API instance
let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-J9QnrxjOBZmP0dxlAtNxrnnP',
    clientKey: 'SB-Mid-client-mz83itkeVpAdDtom'
});

exports.createCheckoutProduct = async (req) => {
    try {
        const { booking_id, bank } = req.body;

        // Check user authentication
        const id_user = req.user_data ? req.user_data.id : null;
        if (!id_user) {
            return {
                status: 401,
                message: 'Unauthorized',
            };
        }

        // Fetch booking data with associated Lapangan
        const booking = await Booking.findOne({
            where: { id: booking_id },
            include: [{
                model: Lapangan, // Pastikan model Lapangan diimpor
                as: 'lapangan' // Pastikan alias sesuai dengan yang didefinisikan di model
            }]
        });
        if (!booking) {
            return {
                status: 404,
                message: "Booking not found"
            };
        }

        // Calculate total price
        const totalPrice = booking.total_price;

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
                "id": booking.lapangan_id,
                "price": booking.total_price,
                "quantity": 1,
                "name": `Booking for ${booking.lapangan.name}`
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

        // Save transaction in the database
        let data = await Checkout.create({
            order_id: randomOrderId,
            id_user,
            booking_id,
            total_amount: totalPrice,
            payment_status: "pending",
            payment_method: "bank_transfer",
            va_number: vaNumber,
            payment_date: new Date(), // Menambahkan payment_date dengan nilai saat ini
            created_at: new Date(),
            updated_at: new Date(),
        });

        // Cek status pembayaran menggunakan order_id
        const paymentStatus = await coreApi.transaction.status(randomOrderId);
        if (paymentStatus.transaction_status === 'settlement') {
            await Checkout.update({ payment_status: 'success' }, { where: { order_id: randomOrderId } });

            // Update booking status to completed
            await Booking.update({ status: 'completed' }, { where: { id: booking_id } });
        } else {
            console.log("Payment not successful:", paymentStatus.transaction_status); 
        }

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
