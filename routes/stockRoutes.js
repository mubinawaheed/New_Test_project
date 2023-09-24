const express = require('express')
const router = express.Router();
const stockController= require('../controllers/stockController')

router.get('/get-data/:symbol/:startDate/:endDate',stockController.viewClosingPrice )

module.exports=router;