/* Cart */

let cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];



/* Display Cart */

function displayCart(){

    const cartContainer =
    document.getElementById(
        "cartContainer"
    );



    const cartTotal =
    document.getElementById(
        "cartTotal"
    );



    cartContainer.innerHTML = "";



    let total = 0;



    cart.forEach((item,index) => {

        total +=
        item.price * item.quantity;



        cartContainer.innerHTML += `

        <div class="cart-card">

            <!-- Image -->

            <div class="cart-image">

                <img src="${item.images[0]}"
                    alt="${item.title}">

            </div>


            <!-- Info -->

            <div class="cart-info">

                <h3>

                    ${item.title}

                </h3>

                <p>

                    ₹${item.price}

                </p>

            </div>


            <!-- Quantity -->

            <div class="cart-quantity">

                <button onclick="decreaseQuantity(${index})">

                    -

                </button>

                <span>

                    ${item.quantity}

                </span>

                <button onclick="increaseQuantity(${index})">

                    +

                </button>

            </div>


            <!-- Subtotal -->

            <div class="cart-subtotal">

                ₹${item.price * item.quantity}

            </div>


            <!-- Remove -->

            <button class="remove-btn"
                onclick="removeProduct(${index})">

                Remove

            </button>

        </div>

        `;

    });



    cartTotal.innerText = total;



    updateCartCount();

}



/* Increase Quantity */

function increaseQuantity(index){

    cart[index].quantity += 1;

    saveCart();

}



/* Decrease Quantity */

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity -= 1;

    }

    saveCart();

}



/* Remove Product */

function removeProduct(index){

    cart.splice(index,1);

    saveCart();

}



/* Save Cart */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}



/* Update Navbar Count */

function updateCartCount(){

    let totalQuantity = 0;



    cart.forEach((item) => {

        totalQuantity += item.quantity;

    });



    document.getElementById(
        "cartCount"
    ).innerText = totalQuantity;

}



/* Load */

displayCart();