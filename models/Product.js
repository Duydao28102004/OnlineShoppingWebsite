const {Schema, model} = require("../db/connection") // import Schema & model

// User Schema
const ProductSchema = new Schema(
    {
        name: {type: String, require: true, unique: true},
        image: {type: String, require: true},
        type: {type: String, require: true},
        price: {type: Number, require: true},
        quantity: {type: Number, require: true},
        rating: {type: Number, require: true},
        description: {type: String},
    },
)
// User model
const Product = model("Product", ProductSchema)

module.exports = Product