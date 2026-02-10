const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({
    key: String,
    value: String
});

const productSchema = new mongoose.mongoose.Schema({
    name: { type: String, required: true }, 
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: String,
    category: { type: String, default: "Electronics" },
    specifications: [specSchema],
    image: { type: String, required: true }
}, { timestamps: true });   

module.exports = mongoose.model('Product', productSchema);