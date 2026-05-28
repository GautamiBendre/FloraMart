/* Cart */

let cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];



/* Elements */

const checkoutItems =
document.getElementById(
    "checkoutItems"
);

const checkoutTotal =
document.getElementById(
    "checkoutTotal"
);



/* Display Summary */

function loadCheckout(){

    let total = 0;

    checkoutItems.innerHTML = "";



    cart.forEach((item) => {

        total +=
        item.price * item.quantity;



        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <img src="${item.images[0]}">

            <div>

                <h4>

                    ${item.title}

                </h4>

                <p>

                    ${item.quantity} × ₹${item.price}

                </p>

            </div>

        </div>

        `;

    });



    checkoutTotal.innerText =
    total;

}



/* Place Order */

document.getElementById(
"checkoutForm"
).addEventListener(
"submit",
(e) => {

    e.preventDefault();



    const order = {

        customerName:
        document.getElementById("name").value,

        phone:
        document.getElementById("phone").value,

        address:
        document.getElementById("address").value,

        deliveryDate:
        document.getElementById("deliveryDate").value,

        note:
        document.getElementById("note").value,

        paymentMethod:
        document.getElementById("paymentMethod").value,

        products:cart,

        total:
        checkoutTotal.innerText

    };



    fetch("/api/orders", {

    method:"POST",

    headers:{
        "Content-Type":
        "application/json"
    },

    body:JSON.stringify({

        customerName:
        order.customerName,

        phone:
        order.phone,

        address:
        order.address,

        deliveryDate:
        order.deliveryDate,

        note:
        order.note,

        paymentMethod:
        order.paymentMethod,

        total:
        order.total,

        products:
        order.products.map((item) => {

            return {

                productId:
                item._id,

                title:
                item.title,

                price:
                item.price,

                quantity:
                item.quantity,

                image:
                item.images[0]

            };

        })

    })

})
.then((res) => res.json())
.then((data) => {

    /* Existing Orders */

    let myOrders =
    JSON.parse(
        localStorage.getItem(
            "myOrders"
        )
    ) || [];



    /* Save New Order ID */

    myOrders.push(
        data.orderId
    );



    /* Store Back */

    localStorage.setItem(

        "myOrders",

        JSON.stringify(
            myOrders
        )

    );



    /* Clear Cart */

    localStorage.removeItem(
        "cart"
    );



    /* Redirect */

    window.location.href =
    `/success.html?id=${data.orderId}`;

})
.catch((error) => {

    console.log(error);

});
});



/* Load */

loadCheckout();