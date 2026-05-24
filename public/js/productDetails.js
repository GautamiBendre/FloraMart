let currentProduct;

/* Get Product ID */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

/* Fetch Single Product */

async function fetchProduct(){

    try{

        const response = await fetch(`/api/products/${productId}`);

        const data = await response.json();

        const product = data.product;
        currentProduct = product;

        const container = document.getElementById("product-details-container");

        container.innerHTML = `

            <!-- Left Images -->

            <div class="col-lg-6">

                <div class="main-image">

                    <img id="mainProductImage"
                        src="${product.images[0]}"
                        alt="${product.title}">

                </div>

                <!-- Thumbnails -->

                <div class="thumbnail-container">

                    ${product.images.map((img) => `

                        <img src="${img}"
                            onclick="changeImage('${img}')">

                    `).join("")}

                </div>

            </div>


            <!-- Right Content -->

            <div class="col-lg-6 product-content">

                <h1>

                    ${product.title}

                </h1>

                <h2>

                    ₹${product.price}

                </h2>

                <p>

                    ${product.description}

                </p>

                <button onclick="addToCart()">

                    Add To Cart

                </button>

            </div>

        `;

    }
    catch(error){

        console.log(error);

    }

}

/* Add To Cart */

function addToCart(){

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



    const existingProduct =
    cart.find((item) => {

        return item._id === currentProduct._id;

    });



    if(existingProduct){

        existingProduct.quantity += 1;

    }
    else{

        cart.push({

            ...currentProduct,

            quantity:1

        });

    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();
    alert("Product Added To Cart");

}

/* Update Cart Count */

function updateCartCount(){

    const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



    let totalQuantity = 0;



    cart.forEach((item) => {

        totalQuantity += item.quantity;

    });



    const cartCount =
    document.getElementById(
        "cartCount"
    );



    if(cartCount){

        cartCount.innerText =
        totalQuantity;

    }

}

/* Change Main Image */

function changeImage(image){

    document.getElementById("mainProductImage").src = image;

}

/* Load Product */

fetchProduct();
updateCartCount();