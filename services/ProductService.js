const Product = require("../models/Product"); // import product model

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, quantity, price, rating, description} = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product existed'
                })
            }
            const newProduct = await Product.create({
                name,
                image,
                type,
                quantity,
                price,
                rating,
                description
            })
            if (newProduct){
                resolve({
                    status: 'OK',
                    message: "SUCCESS",
                    data: newProduct
                })
            }
        }catch (e){
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: "SUCCESS",
                data: updatedProduct
            })
        }catch (e){
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct
} 