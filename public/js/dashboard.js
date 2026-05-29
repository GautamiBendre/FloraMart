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



        document.getElementById(
            "orderCount"
        ).innerText =
        data.orders.length;



        let revenue = 0;



        data.orders.forEach((order) => {

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