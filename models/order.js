const mongoose = require("mongoose");

const orderSchema =
new mongoose.Schema({

    customerName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    orderId:{
    type:String,
    unique:true
    },

    address:{
        type:String,
        required:true
    },

    deliveryDate:{
        type:String
    },

    note:{
        type:String
    },

    paymentMethod:{
        type:String,
        default:"COD"
    },

    products:[

        {
            productId:String,

            title:String,

            price:Number,

            quantity:Number,

            image:String
        }

    ],

    total:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        default:"Pending"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model(
    "Order",
    orderSchema
);