import mongoose from "mongoose";

import Product from "../models/product.js";

export function createProduct(req, res){
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        date: req.body.date,
        prod_code: req.body.prod_code,
        status: req.body.status

    })
    return product
    .save()
    .then((createNewProduct)=>{
        return res.status(200).json({
            success: true,
            message: "Create new Product successful !",
            course: createNewProduct,
        });
    })
    .catch((error)=>{
        console.log(error);
        return res.status(500).json({
      
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
        });
    });
}

export function getAllProduct(req,res){
    Product.find()
    .select("_id name date prod_code status")
    .then((allProduct)=>{
        return res.status(200).json({
            success: true,
            message: "Get all Product successful !",
            course: allProduct,
        });
    })
    .catch((error)=>{
        console.log(error);
        return res.status(500).json({
      
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
        });
    });
}

export function getDetailProduct(req,res){
    const id = req.params.prod_id;
    Product.findById(id)
    .then((onceProduct)=>{
        return res.status(200).json({
            success: true,
            message: `Get ${onceProduct.name} successfull`,
            Product: onceProduct
        });
    })
    .catch((err)=>{
        return res.status(500).json({
            success:false,
            message: 'Server error, please try again!',
            error: err.message
        });
        
    });
}

export function editProduct(req,res){
    const id = req.params.prod_id;
    const prodObj = req.body;
    Product.update({_id: id},{$set: prodObj})
    .exec()
    .then(()=>{
        return res.status(200).json({
            success: true,
            message: 'Updated successfull',
            Product: prodObj
        });
    })
    .catch((err)=>{
        return res.status(500).json({
            success:false,
            message: 'server error',
            error: err.message
        });
    });
}

export function delProduct(req,res){
    const id = req.params.prod_id;
    Product.findByIdAndRemove(id)
    .exec()
    .then(()=>{
        return res.status(200).json({
            success: true
        });
    })
    .catch((err)=>{
        return res.status(500).json({
            success: false,
            error: err
        });
    });
}