const stocks = require('../models/stocks')
const stockService = require('../services/stockService')
const axios = require('axios')
const moment = require('moment');
const MomentRange = require('moment-range');
const momentRange = MomentRange.extendMoment(moment);
const key = process.env.POLYGON_API_KEY

const viewClosingPrice = async (req, res) => {
    try {
        const { symbol, startDate, endDate } = req.params

        const range = momentRange.range(startDate, endDate);
        let datesArray = Array.from(range.by('days'));
        datesArray = datesArray.map(date => date.format('YYYY-MM-DD'));
        // console.log(datesArray)

        const closingPrices = []

        for (let i = 0; i < datesArray.length; i++) {

            let data = await stockService.getClosingPrice(symbol, datesArray[i]);
       
            if (data.length == 0) {
                await axios.get(`https://api.polygon.io/v1/open-close/${symbol}/${datesArray[i]}?adjusted=true&apiKey=${key}`)
                .then(response => {
                    let newRecord = {
                      date: datesArray[i],
                      symbol: symbol,
                      closingPrice: response.data.close
                    };
                    closingPrices.push(newRecord);
                    
                    stockService.createRecord(newRecord).then( data=>{
                        console.log("record added")

                    }).catch(error=>{
                        console.log(`Error adding record ${error}`)
                    })
                  })
                  .catch(error => {
                    console.error('Error:', error.message, 'No record found');
                  });
            }
            else {
             
                closingPrices.push({
                    date: datesArray[i],
                    symbol: symbol,
                    closingPrice: data[0].closingPrice

                })
            }
        }
        return res.status(200).json({ data: closingPrices })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json("error occured")
    }
}

module.exports = {
    viewClosingPrice
}