const {Schema, model} = require("../db/connection") // import Schema & model

// ShipperData Schema

const ProductSchema = new Schema ({
    productname: {type: String, unique: true, required: true},
    productprice: {type: integer, unique: true, required: true},
    city: {type: String, required: true},
})