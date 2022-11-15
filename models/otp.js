const mongoose = require("mongoose");
const validator = require("validator");

//create schema 

const otpSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
    },
    otp: {
        type: Number,
        required: true
    },
});

const Otp = new mongoose.model('Otp', otpSchema);

module.exports = Otp;
