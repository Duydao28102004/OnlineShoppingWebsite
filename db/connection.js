const mongoose = require("mongoose") //import fresh mongoose object
const {log} = require("mercedlogger") // import merced logger
const DATABASE_URL= "mongodb+srv://Admin:E6BkbG3jpNBEE7O2@test.qo8hcax.mongodb.net/";


// CONNECT TO MONGO
mongoose.connect(DATABASE_URL);

// CONNECTION EVENTS
mongoose.connection
.on("open", () => log.green("DATABASE STATE", "Connection Open"))
.on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
.on("error", (error) => log.red("DATABASE STATE", error))

// EXPORT CONNECTION
module.exports = mongoose 