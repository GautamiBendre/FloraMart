/* =========================
   LOAD MY ORDERS
========================= */

async function loadMyOrders(){

    /* Get Saved Order IDs */

    const myOrders =
    JSON.parse(
        localStorage.getItem(
            "myOrders"
        )
    ) || [];



    /* Container */

    const ordersContainer =
    document.getElementById(
        "ordersContainer"
    );



    /* Empty Orders */

    if(myOrders.length === 0){

        ordersContainer.innerHTML = `

        <div class="empty-orders">

            <h2>

                No Orders Yet

            </h2>

            <p>

                Start shopping your beautiful bouquets.

            </p>

            <a href="/shop">

                Shop Now

            </a>

        </div>

        `;

        return;

    }



    try{

        /* Fetch Orders */

        const response =
        await fetch("/api/orders");



        const data =
        await response.json();



        /* Filter Only My Orders */

        const filteredOrders =
        data.orders.filter((order) => {

            return myOrders.includes(
                order.orderId
            );

        });



        /* Empty */

        ordersContainer.innerHTML = "";



        /* Display Orders */

        filteredOrders.forEach((order) => {

            ordersContainer.innerHTML += `

            <div class="order-card">


                <!-- LEFT -->

                <div class="order-left">

                    <img
                    src="${order.products[0].image}">


                    <div class="order-info">

                        <h2>

                            ${order.products[0].title}

                        </h2>

                        <p>

                            Order ID :
                            ${order.orderId}

                        </p>

                        <p>

                            Payment :
                            ${order.paymentMethod}

                        </p>

                        <span class="order-status">

                            ${order.status}

                        </span>

                    </div>

                </div>



                <!-- RIGHT -->

                <div class="order-right">

                    <div class="order-total">

                        ₹${order.total}

                    </div>



                    <a
                    class="track-btn"

                    href="/track/${order.orderId}"">

                        Track Order

                    </a>

                </div>

            </div>

            `;

        });

    }
    catch(error){

        console.log(error);

    }

}



/* =========================
   LOAD
========================= */

loadMyOrders();