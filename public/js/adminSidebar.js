async function loadSidebarOrderCount(){

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

        const count =
        document.getElementById(
            "sidebarOrderCount"
        );

        if(count){

            count.innerText =
            activeOrders.length;

        }

    }
    catch(error){

        console.log(error);

    }

}

loadSidebarOrderCount();