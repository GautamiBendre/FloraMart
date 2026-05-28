const mongoose =
require("mongoose");



const offerSchema =
new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    discount:{
        type:String,
        required:true
    },

    expiryDate:{
        type:String
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});



module.exports =
mongoose.model(
    "Offer",
    offerSchema
);