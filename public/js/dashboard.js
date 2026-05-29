/* =========================
   PRODUCT COUNT
========================= */

async function loadProductCount(){

    try{

        const response =
        await fetch("/api/products");

        const data =
        await response.json();

        document.getElementById(
            "productCount"
        ).innerText =
        data.products.length;

    }
    catch(error){

        console.log(error);

    }

}



/* =========================
   ORDERS + REVENUE
========================= */

async function loadOrderStats(){

    try{

        const response =
        await fetch("/api/orders");

        const data =
        await response.json();



        const activeOrders =
        data.orders.filter((order) => {

            return order.status !==
            "Completed";

        });



        const completedOrders =
        data.orders.filter((order) => {

            return order.status ===
            "Completed";

        });



        document.getElementById(
            "activeOrderCount"
        ).innerText =
        activeOrders.length;

        const sidebarOrderCount =
        document.getElementById(
            "sidebarOrderCount"
        );

        if(sidebarOrderCount){

            sidebarOrderCount.innerText =
            activeOrders.length;

        }



        document.getElementById(
            "completedOrderCount"
        ).innerText =
        completedOrders.length;



        let revenue = 0;



        completedOrders.forEach((order) => {

            revenue += order.total;

        });



        document.getElementById(
            "revenueCount"
        ).innerText =
        "₹" + revenue;

    }
    catch(error){

        console.log(error);

    }

}



/* =========================
   LOAD
========================= */

loadProductCount();

loadOrderStats();