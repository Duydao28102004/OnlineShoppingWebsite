const {Schema, model} = require("../db/connection") // import Schema & model

const OrderSchema = new Schema({
    userid: {type: String, unique: true, required: true},
    products: {type: String, unique: true}, 
    
})