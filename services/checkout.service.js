const { rupiahFormat } = require('../helpers/rupiahFormat.helper')
const { checkout, products, user } = require('../models')

const midtransClient = require('midtrans-client');
// Create Core API instance
// const {client} = require('../wa');

let coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-J9QnrxjOBZmP0dxlAtNxrnnP', 
    clientKey : 'SB-Mid-client-mz83itkeVpAdDtom'
});

exports.createCheckoutProduct = async (req, res) => {

    const {id_product, quantity, bank} = req.body

    const id_user = req.user_data.id

    const product = await products.findOne({where: {id: id_product}})

    if(!product){
        return {
            status: 404,
            message: "Product yang ingin kamu beli tidak ditemukan"
        }
    }

    // buatkan 3 kalimat random
    const random = Math.floor(Math.random() * 1000)

    const dataMidstrans = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "order_id": `order-${random}`,
            "gross_amount": quantity * product.price
        },
        "items_details":[
            {
                "id": product.id,
                "price": product.price,
                "quantity": quantity,
                "name": product.name,
                // "subtotal": quantity * product.price
            }
        ],
        "bank_transfer":{
            "bank": `${bank}`
        },
        "customer_details": {
            "first_name": req.user_data.name,
            "last_name": req.user_data.name,
            "email": req.user_data.email,
        }
    }

    let transactionToken = await coreApi.charge(dataMidstrans)

    console.log(transactionToken)

    // menyimpan data ke dalam database
    let data = await checkout.create(
        {
            order_id: `order-${random}`,
            id_user, 
            id_product, 
            quantity,
            status: "pending",
            va_number: transactionToken.va_numbers[0].va_number
        }
    )
    
    data.dataValues.total = rupiahFormat(quantity * product.price)

    // konek ke whatsapp
    // client.sendMessage(`${req.user_data.number}@c.us`, `Terimakasih telah berbelanja di toko kami, silahkan melakukan pembayaran sebesar ${rupiahFormat(quantity * product.price)} ke nomor VA ${transactionToken.va_numbers[0].va_number}`)

    return {
        status: 201,
        data,
        message: "Success Create Data"
    }

}
