import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from "./app.js";
dotenv.config();
const PORT = process.env.PORT || 5001;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const handleServerStartup = () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}

mongoose.connect(process.env.CONNECTION_URL, mongooseOptions, handleServerStartup)
// export function serverconnection(){ mongoose.connect(process.env.CONNECTION_URL, mongooseOptions)}
// export function closeConnection(){mongoose.connection.close()}
// serverconnection()
// handleServerStartup()