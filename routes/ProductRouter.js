require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const ProductController = require ("../controller/ProductController")
const jwt = require("jsonwebtoken"); // import jwt to sign tokens

const router = Router(); // create router to create route bundle

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

// create route to create product
router.post("/create", ProductController.createProduct)
router.put("/update/:id", ProductController.updateProduct)

module.exports = router

    