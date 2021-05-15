const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true, validate: {
        validator: function($) {
            return new RegExp("^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{8,})").test($);
        },
        message: 'Invalid password'
    } 
},
    email: {
        type: String, required: true, validate: {
            validator: function ($) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test($)
            },
            message: 'Invalid Email'
        }
    }, 
    active: {type: Boolean, required: true}, 
})
mongoose.model('newUsers', newUser);