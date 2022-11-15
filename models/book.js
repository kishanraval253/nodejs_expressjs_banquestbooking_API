const mongoose = require("mongoose");
const validator = require("validator");

//create schema 

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        validate(value) {
            if (value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email id")
                }
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        min: 10,
    },
    proof: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    // 1= full 
    // 2= shift base 
    // 3= hourly base
    day: {
        type: Number,
        required: true
    },
    // 1 = morning
    // 2 = evening
    shiftType: {
        type: Number,
        required: false,
        default: 0
    },
    //1 = 10-12 
    //2 = 12-2
    //3 = 2-4
    //4 = 4-6
    hourType: {
        type: Number,
        required: false,
        default: 0
    }
});

const Book = new mongoose.model('Book', bookSchema);

module.exports = Book;
