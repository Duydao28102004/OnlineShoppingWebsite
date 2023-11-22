const {Schema, model} = require("../db/connection") // import Schema & model

// ShipperData Schema

const ShipperDataSchema = new Schema({
    shippername: {type: String, unique: true, required: true},
    shipperID: {type: integer, unique: true, required: true},
    city: {type: String, required: true},
})

// ShipperData model
const ShipperData = model("ShipperData", ShipperDataSchema)

module.exports = Todo