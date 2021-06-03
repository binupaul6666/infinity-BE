const mongoose = require('mongoose');
const formModels = mongoose.model('formModels');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    formObject(req, res);
});


async function formObject(req, res) {
    await formModels.find(function(err, data){
        res.json({data: data});
    });
}

module.exports = router;