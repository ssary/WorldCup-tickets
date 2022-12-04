const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const shopRoute = require("./routes/matches")
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected Successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors())
app.use(express.json());
app.use("/api/matches", shopRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

app.get("/", function (req, res) {
  res.send("Hello world");
});
