const mongoose = require('mongoose');

const formModel = new mongoose.Schema({
    type: {type: String},
    id: {type: String},
    value: {type: String},
    selectorLabel: {type: Array},
    editable: {type: Boolean},
    label: {type: String},
    readonly: {type: Boolean},
});

mongoose.model('formModels', formModel);