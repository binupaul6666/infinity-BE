const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RoyalsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, 
err => {
    if(!err) {
        console.log('connection successful')
    } else {
        console.log('connection failed' +err)
    }
});

require('./newuser');
require('./commonmodules/form');