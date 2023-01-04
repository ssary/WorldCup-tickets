const express = require('express')
const bodyParser = require('body-parser');
const axios = require("axios");
const mongoose = require("mongoose");
const router = require("./routes/Reservation");
const { startKafkaProducer } = require('./connectors/kafka');
require('dotenv').config();
const easyWaf = require('easy-waf');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 24 hrs in milliseconds
    max: 1000,
    message: 'You have exceeded the 100 requests in 24 hrs limit!',
    standardHeaders: true,
    legacyHeaders: false,
});
const app = express();

app.use(helmet());

app.use(rateLimiter);

app.use(easyWaf({
    dryMode: true, //Suspicious requests are only logged and not blocked
    allowedHTTPMethods: ['GET', 'POST'],
    ipBlacklist: ['1.1.1.1', '2.2.2.2'],
    ipWhitelist: ['::1', '172.16.0.0/12'],
    queryUrlWhitelist: ['github.com'],
    modules: {
        directoryTraversal: {
            enabled: true,
            excludePaths: /^\/exclude\/$/i
        },
    }
}));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/reservation', router)
app.get('/country', async (req,res)=>{
    var info = await axios.get("http://ip-api.com/json")
    info = JSON.stringify(info.data.country)
    res.status(200).send(info)
})

const PORT = process.env.PORT || 5001;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const handleServerStartup = () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}
async function main() {
    await mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.CONNECTION_URL, mongooseOptions, handleServerStartup)
    await startKafkaProducer();

}
main()
