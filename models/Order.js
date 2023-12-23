const {Schema, model} = require("../db/connection") // import Schema & model

const OrderSchema = new Schema({
    customername: {type: String, required: true, unique: false},
    // products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    products: {type: String, unique: false},
    address:{type: String, required: true, unique: false},
    status: {type: String, required: true, unique: false}
})

// Add a static method to the schema to find orders with a specific status
OrderSchema.statics.findOrdersByStatus = function (status) {
    return this.find({ status });
};

const Order = model("Order", OrderSchema);

module.exports = Order;