const Product = require("../models/products");

/* Add Product */

const addProduct = async (req,res) => {

    try{

        /* Form Data */

        const {

            title,
            description,
            price,
            category

        } = req.body;

        /* Uploaded Images */

        const images =
        req.files.map((file) => {

            return file.path;

        });

        /* Create Product */

        const newProduct = new Product({

            title,
            description,
            price,
            images,
            category:
            category
            .split(",")
            .map(cat => cat.trim()),

        });

        /* Save */

        await newProduct.save();

        res.status(201).json({

            success:true,

            message:"Product Added Successfully",

            product:newProduct

        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



/* Get Products */

const getProducts = async (req,res) => {

    try{

        const products =
        await Product.find();

        res.status(200).json({

            success:true,

            products

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



/* Get Single Product */

const getSingleProduct =
async (req,res) => {

    try{

        const product =
        await Product.findById(req.params.id);

        if(!product){

            return res.status(404).json({

                success:false,

                message:"Product Not Found"

            });

        }

        res.status(200).json({

            success:true,

            product

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* Delete Product */

const deleteProduct =
async (req,res) => {

    try{

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success:true,

            message:"Product Deleted"

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* Update Product */

const updateProduct =
async (req,res) => {

    try{

        const product =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true

            }

        );

        res.status(200).json({

            success:true,

            product

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

module.exports = {

    addProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct

};