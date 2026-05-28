const Order =
require("../models/order");



/* =========================
   CREATE ORDER
========================= */

const createOrder =
async (req,res) => {

    try{

        const newOrder =
        new Order(req.body);

        await newOrder.save();



        res.status(201).json({

            success:true,

            message:
            "Order Placed Successfully",

            orderId:
            newOrder._id

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
   GET ALL ORDERS
========================= */

const getOrders =
async (req,res) => {

    try{

        const orders =
        await Order.find()
        .sort({createdAt:-1});



        res.status(200).json({

            success:true,

            orders

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
   GET SINGLE ORDER
========================= */

const getSingleOrder =
async (req,res) => {

    try{

        const order =
        await Order.findById(
            req.params.id
        );



        if(!order){

            return res.status(404).json({

                success:false,

                message:"Order Not Found"

            });

        }



        res.status(200).json({

            success:true,

            order

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
   UPDATE ORDER STATUS
========================= */

const updateOrderStatus =
async (req,res) => {

    try{

        const order =
        await Order.findById(
            req.params.id
        );



        if(!order){

            return res.status(404).json({

                success:false,

                message:"Order Not Found"

            });

        }



        order.status =
        req.body.status;



        await order.save();



        res.status(200).json({

            success:true,

            message:
            "Order Status Updated"

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
   EXPORTS
========================= */

module.exports = {

    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus

};