async function fetchCompletedOrders(){

    try{

        const response =
        await fetch("/api/orders");



        const data =
        await response.json();



        const completedOrdersContainer =
        document.getElementById(
            "completedOrdersContainer"
        );



        completedOrdersContainer.innerHTML = "";



        const completedOrders =
        data.orders.filter((order) => {

            return order.status ===
            "Completed";

        });



        completedOrders.forEach((order) => {

            let productsHTML = "";



            order.products.forEach((product) => {

                productsHTML += `

                <div class="ordered-product">

                    <img src="${product.image}">

                    <div>

                        <h4>

                            ${product.title}

                        </h4>

                        <p>

                            Qty: ${product.quantity}

                        </p>

                    </div>

                </div>

                `;

            });



            completedOrdersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-top">

                    <div>

                        <h3>

                            ${order.customerName}

                        </h3>

                        <p class="order-id">

                            Order ID :
                            ${order.orderId}

                        </p>

                        <p>

                            ${order.phone}

                        </p>

                        <p>

                            ${order.address}

                        </p>

                    </div>

                    <div class="completed-badge">

                        Completed

                    </div>

                </div>



                <div class="ordered-products">

                    ${productsHTML}

                </div>



                <div class="order-bottom">

                        <div>

                            <h4>

                                ₹${order.total}

                            </h4>

                            <p>

                                ${order.paymentMethod}

                            </p>

                        </div>

                        <button
                        class="delete-order-btn"

                        onclick="deleteOrder(
                        '${order._id}'
                        )">

                            Delete Order

                        </button>

                    </div>
            </div>

            `;

        });

    }
    catch(error){

        console.log(error);

    }

}

async function deleteOrder(
    orderId
){

    const confirmDelete =
    confirm(
        "Delete this order?"
    );

    if(!confirmDelete){

        return;

    }

    try{

        await fetch(

        `/api/orders/${orderId}`,

        {

            method:"DELETE"

        });

        fetchCompletedOrders();

    }
    catch(error){

        console.log(error);

    }

}



fetchCompletedOrders();