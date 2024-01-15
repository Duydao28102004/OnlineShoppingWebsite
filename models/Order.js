const {Schema, model} = require("../db/connection") // import Schema & model

const ProductSchema = new Schema({
    productName: { type: String, required: true, unique: false },
    productPrice: { type: Number, required: true, unique: false },
    productImage: { type: String, required: true, unique: false },
    quantity: { type: Number, required: true, unique: false },
});

const OrderSchema = new Schema({
    customername: {type: String, required: true, unique: false},
    products: [ProductSchema],
    address:{type: String, required: true, unique: false},
    phonenumber: {type: String, required: true, unique: false},
    status: {type: String, required: true, unique: false},
    totalCost: {type: Number, required: false, unique: false},
})

// Add a static method to the schema to find orders with a specific status
OrderSchema.statics.findOrdersByStatus = function (status) {
    return this.find({ status });
};

const Order = model("Order", OrderSchema);

module.exports = Order;