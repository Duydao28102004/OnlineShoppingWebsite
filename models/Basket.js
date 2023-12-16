const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
    }],
});

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;