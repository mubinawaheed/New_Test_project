require("dotenv").config({ path: "./.env" });
const express=require('express')
const PORT = process.env.PORT;
const bodyParser=require('body-parser')
const mongoose = require('mongoose');
const conn_url = process.env.MONGO_CONNECTION_URI;

app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));


require('./routes/index')(app)

mongoose.connect(conn_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`✨ ${process.env.DATABASE_NAME} database connection established successfully!`))
    .catch(err => console.log(err));


app.listen(PORT, async()=>{
    console.log(`\n✨ app is listening on port ${PORT}`)
    console.log(`✨ Server running on http://localhost:${PORT}/`)
})