import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/tickets.js'
import generateDummyTickets from "./utils/utils.js";

const app = express();
dotenv.config({path:'../.env'});
mongoose.set('strictQuery', true)

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/reservation', router)

const PORT = process.env.RESERVATION_PORT || 8000;
const serverStartup = app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
})

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.CONNECTION_URL, mongooseOptions, serverStartup)
//generateDummyTickets()