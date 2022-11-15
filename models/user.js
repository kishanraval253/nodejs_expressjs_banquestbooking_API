const mongoose = require("mongoose");
const validator = require("validator");

//create schema 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: [true, "Email id is already exists"],
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
        unique: [true, "Mobile number is already exists"],
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: Number,
        default: 1
    },
    is_removed: {
        type: Boolean,
        default: false
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
