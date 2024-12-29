const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3030;
require("./models/db");
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter")

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products",ProductRouter);
app.get("/", (req, res) => {
  res.send("Hi there");
});



app.listen(port , ()=>{
    console.log("App listening on port ",port);
})