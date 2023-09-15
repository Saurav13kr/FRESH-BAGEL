const mongoose = require('mongoose');


const tableSchema = new mongoose.Schema({
    name:{ type: String, require: true},
    image:{ type: String, require: true},
    description:{ type: String, require: true},
    price:{ type: Number, require: true},
    capacity:{ type: String, require: true},
})



module.exports = mongoose.model('Table',tableSchema)