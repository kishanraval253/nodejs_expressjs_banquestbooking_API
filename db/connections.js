const express = require('express');
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/testapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MONGODB CONNECTION ESTABLISH SUCCESSFULLY");
}).catch((e) => {
    console.log(e);
})