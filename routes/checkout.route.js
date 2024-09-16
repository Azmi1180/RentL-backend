// var express = require('express');
// const checkoutController = require('../controllers/checkout.controller');
// // Ini bikin error gak tau kenapa, keknya harus di rework lagi si authnya
// const { auth } = require('../middleware/auth.middleware');
// const router = express.Router();

// // Kalau liat referensi harusnya 
// router.post('/', auth, checkoutController.checkoutProducController);
// // Tapi gak bisa karena authnya error
// // Jadi di comment dulu

// // router.post('/', checkoutController.checkoutProducController);


// module.exports = router;

const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller'); 
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, checkoutController.checkoutProducController); 

module.exports = router; 