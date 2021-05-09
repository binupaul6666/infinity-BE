const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
})

mongoose.model('NewUser', newUser);