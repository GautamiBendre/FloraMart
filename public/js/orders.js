/* Fetch Orders */

async function fetchOrders(){

    try{

        const response =
        await fetch("/api/orders");

        const data =
        await response.json();

        const ordersContainer =
        document.getElementById(
            "ordersContainer"
        );

        ordersContainer.innerHTML = "";



        const searchValue =

document
.getElementById(
    "searchOrder"
)
?.value
.toLowerCase() || "";



    data.orders
    .filter((order) => {

        return order.status !==
        "Completed";

    })
    .filter((order) => {

    return (

        order.customerName
        .toLowerCase()
        .includes(searchValue)

        ||

        order.phone
        .includes(searchValue)

    );

    })
    .forEach((order) => {

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



            const trackLink =

`http://localhost:5000/track/${order._id}`;



            const whatsappMessage =
            encodeURIComponent(

`Hello ${order.customerName},

Your flower order has been confirmed.

Track Your Order:
${trackLink}

Thank you for choosing Bloom Heaven.`

            );



            ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-top">

                    <div>

                        <h3>

                            ${order.customerName}

                        </h3>

                        <p class="order-id">

                            Order ID:
                            ${order.orderId}

                        </p>

                        <p>

                            ${order.phone}

                        </p>

                        <p>

                            ${order.address}

                        </p>

                    </div>



                    <select
                    class="status-select"
                    onchange="updateStatus(
                    '${order._id}',
                    this.value
                    )">

                        <option value="Pending"
                        ${order.status === "Pending"
                        ? "selected" : ""}>

                            Pending

                        </option>

                        <option value="Confirmed"
                        ${order.status === "Confirmed"
                        ? "selected" : ""}>

                            Confirmed

                        </option>

                        <option value="Preparing"
                        ${order.status === "Preparing"
                        ? "selected" : ""}>

                            Preparing

                        </option>

                        <option value="Out For Delivery"
                        ${order.status === "Out For Delivery"
                        ? "selected" : ""}>

                            Out For Delivery

                        </option>

                        <option value="Delivered"
                        ${order.status === "Delivered"
                        ? "selected" : ""}>

                            Delivered

                        </option>

                        <option value="Completed"
                        ${order.status === "Completed"
                        ? "selected" : ""}>

                            Completed

                        </option>

                    </select>

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



                    <a
                    target="_blank"

                    href="https://wa.me/91${order.phone}?text=${whatsappMessage}"

                    onclick="updateStatus(
                    '${order._id}',
                    'Confirmed'
                    )">

                        <button
                        class="whatsapp-btn">

                            <i class="fa-brands fa-whatsapp"></i>

                            Confirm On WhatsApp

                        </button>

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



/* Order Count */

async function loadOrderCount(){

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

        const orderCount =
        document.getElementById(
            "orderCount"
        );

        if(orderCount){

            orderCount.innerText =
            activeOrders.length;

        }

    }
    catch(error){

        console.log(error);

    }

}



/* Update Status */

async function updateStatus(
    orderId,
    newStatus
){

    try{

        await fetch(

        `/api/orders/${orderId}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                status:newStatus

            })

        });

        fetchOrders();

        loadOrderCount();

    }
    catch(error){

        console.log(error);

    }

}



/* Load */

const searchInput =
document.getElementById(
    "searchOrder"
);

if(searchInput){

    searchInput.addEventListener(
    "input",

    fetchOrders

    );

}

fetchOrders();

loadOrderCount();