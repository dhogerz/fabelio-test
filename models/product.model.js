const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 30},
    url: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);