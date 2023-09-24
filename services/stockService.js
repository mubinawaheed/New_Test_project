const stock = require('../models/stocks')

const createRecord = async (data) => {
    return await new stock(data).save()
}

const getClosingPrice = async (symbol, date) => {
    return await stock.find({
        symbol,
        date: new Date(date),
    });
}

module.exports = {

    getClosingPrice,
    createRecord
}