const Order =
require("../models/order");



/* =========================
   CREATE ORDER
========================= */

const createOrder =
async (req,res) => {

    try{

        const lastOrder =
        await Order.findOne()
        .sort({createdAt:-1});



        let nextNumber = 1001;



        if(

            lastOrder &&
            lastOrder.orderId &&
            lastOrder.orderId.startsWith("ORD")

        ){

            nextNumber =

            parseInt(

                lastOrder.orderId
                .replace("ORD","")

            ) + 1;

        }



        const orderId =
        "ORD" + nextNumber;



        const newOrder =
        new Order({

            ...req.body,

            orderId

        });



        await newOrder.save();



        res.status(201).json({

            success:true,

            message:
            "Order Placed Successfully",

            orderId:
            newOrder.orderId

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
        await Order.findOne({

            orderId:
            req.params.id

        });



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

const deleteOrder =
async (req,res) => {

    try{

        await Order.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success:true

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
    updateOrderStatus,
    deleteOrder

};