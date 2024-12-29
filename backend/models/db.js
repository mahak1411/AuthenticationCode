const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("Connected to database");
    }).catch((err)=>{
        console.log("An error occured",err);
    })