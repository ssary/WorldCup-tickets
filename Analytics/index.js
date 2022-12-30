const express = require ('express')
const bodyParser =  require ('body-parser');
const mongoose = require("mongoose"); 
require('dotenv').config();
const app = express();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

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
  }
  main()
