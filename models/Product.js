const {Schema, model} = require("../db/connection") // import Schema & model

// User Schema
const ProductSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: false},
    name: {type: String, require: true, unique: false},
    image: {type: String, require: false},
    type: {type: String, require: false},
    price: {type: Number, require: false},
    quantity: {type: Number, require: false},
    rating: {type: Number, require: false},
    description: {type: String},
})

ProductSchema.statics.findBySellerId = async function (user) {
    try {
        // Use the find method to search for products with the specified seller ID
        const products = await this.find({ seller:  user});
        return products;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error getting products by seller ID');
    }
};

// User model
const Product = model("Product", ProductSchema)

module.exports = Product