const mongoose = require('mongoose');

const stockPriceSchema = new mongoose.Schema({

    date: Date,
    closingPrice: Number,
    symbol: String

}, { timestamps: true })

module.exports = mongoose.model('stockClosingPrices', stockPriceSchema)