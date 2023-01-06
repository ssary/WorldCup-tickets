const express = require('express')
const cors = require('cors')
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
app.use(cors());
app.use(rateLimiter);

app.use(easyWaf({
    dryMode: false, //Suspicious requests are only logged and not blocked
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

app.post('/recaptcha', async (req, res) => {
    if (!req.body.captcha)
      return res.json({ success: false, msg: 'Please select captcha' });
  
    // Secret key
    const secretKey = process.env.CAPTCHA;
  
    // Verify URL
    const query = stringify({
      secret: secretKey,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress
    });
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  
    // Make a request to verifyURL
    const body = await fetch(verifyURL).then(res => res.json());
  
    // If not successful
    if (body.success !== undefined && !body.success)
      return res.json({ success: false, msg: 'Failed captcha verification' });
  
    // If successful
    return res.json({ success: true, msg: 'Captcha passed' });
  });
  

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

