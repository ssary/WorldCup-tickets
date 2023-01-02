import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./routes/matches.js";
import { rateLimit } from "express-rate-limit"
import helmet from "helmet";
import easyWaf from "easy-waf";
const app = express();
dotenv.config();
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 24 hrs in milliseconds
    max: 1000,
    message: 'You have exceeded the 100 requests in 24 hrs limit!',
    standardHeaders: true,
    legacyHeaders: false,
});
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

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api/matches', router)

const PORT = process.env.PORT || 5001;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const handleServerStartup = () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}
await mongoose.connect(process.env.CONNECTION_URL, mongooseOptions, handleServerStartup)
