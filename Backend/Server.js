const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const routes = require('./routes/ToDoRoutes')
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//Middle-ware
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connection established !"))
.catch((err) => console.log("Error Occured" + err));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
}) 