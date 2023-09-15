const mongoose = require('mongoose');


const indSchema = new mongoose.Schema({
    name:{ type: String, require: true},
    description:{ type: String, require: true},
    image:{ type: String, require: true},
    price:{ type: Number, require: true},
    size:{ type: String, require: true},
})



module.exports = mongoose.model('Individual',indSchema)