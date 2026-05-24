const Order =
require("../models/order");



/* Create Order */

const createOrder =
async (req,res) => {

    try{

        const newOrder =
        new Order(req.body);

        await newOrder.save();

        res.status(201).json({

            success:true,

            message:
            "Order Placed Successfully"

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



/* Get Orders */

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

/* Update Order Status */

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



module.exports = {

    createOrder,
    getOrders,
    updateOrderStatus

};