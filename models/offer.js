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
    },

    discount:{
        type:String,
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