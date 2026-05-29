const express =
require("express");

const router =
express.Router();

const {

    createOrder,
    getOrders,
    updateOrderStatus,
    getSingleOrder,
    deleteOrder

} = require(
"../controllers/orderController"
);

router.post(
"/",
createOrder
);

router.get(
"/",
getOrders
);

router.get(
"/:id",
getSingleOrder
);

router.put(
"/:id",
updateOrderStatus
);

router.delete(
"/:id",
deleteOrder
);




module.exports = router;