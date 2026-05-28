const Offer =
require("../models/offer");



/* =========================
   CREATE OFFER
========================= */

const createOffer =
async (req,res) => {

    try{

        const newOffer =
        new Offer(req.body);

        await newOffer.save();



        res.status(201).json({

            success:true,

            message:
            "Offer Created"

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



/* =========================
   GET OFFERS
========================= */

const getOffers =
async (req,res) => {

    try{

        const offers =
        await Offer.find()
        .sort({createdAt:-1});



        res.status(200).json({

            success:true,

            offers

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



/* =========================
   DELETE OFFER
========================= */

const deleteOffer =
async (req,res) => {

    try{

        await Offer.findByIdAndDelete(
            req.params.id
        );



        res.status(200).json({

            success:true,

            message:
            "Offer Deleted"

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

    createOffer,
    getOffers,
    deleteOffer

};