import express from "express";
//const express = require("express");
import bodyParser from 'body-parser';
//const bodyParser = require("body-parser");
import mongoose from 'mongoose';
//const mongoose = require("mongoose");
import cors from 'cors';
//const cors = require("cors");
import dotenv from 'dotenv';
//const dotenv = require("dotenv");
import router from "./routes/matches.js";
//const router = require("./routes/matches.js");
import { rateLimit } from "express-rate-limit"
//const { rateLimit } = require("express-rate-limit");
import helmet from "helmet";
//const helmet = require("helmet");
import easyWaf from "easy-waf";
//const easyWaf = require("easy-waf");
const app = express();
dotenv.config();
app.use(cors())
const rateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hrs in milliseconds
    max: 1000,
    message: 'You have exceeded the 1000 requests in 1 hrs limit!',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(helmet());

app.use(rateLimiter);

app.listen(5001, () => console.log(`Server listening on port 5001`))
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api/matches', router)

// export app
export default app;