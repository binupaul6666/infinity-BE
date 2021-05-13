const mongoose = require('mongoose');

const myUser = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
})

mongoose.model('addUsers', myUser);