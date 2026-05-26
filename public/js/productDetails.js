/* =========================
   CURRENT PRODUCT
========================= */

let currentProduct;



/* =========================
   GET PRODUCT ID
========================= */

const params =
new URLSearchParams(
window.location.search
);

const productId =
params.get("id");



/* =========================
   FETCH PRODUCT
========================= */

async function fetchProduct(){

    try{

        const response =
        await fetch(
        `/api/products/${productId}`
        );

        const data =
        await response.json();

        const product =
        data.product;

        currentProduct =
        product;



        const container =
        document.getElementById(
        "product-details-container"
        );



        container.innerHTML = `

            <!-- LEFT -->

            <div class="col-lg-6">


                <!-- Main Image -->

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



            <!-- RIGHT -->

            <div class="col-lg-6 product-content">


                <!-- Title -->

                <h1>

                    ${product.title}

                </h1>



                <!-- Price -->

                <h2>

                    ₹${product.price}

                </h2>



                <!-- Description -->

                <p>

                    ${product.description}

                </p>



                <!-- Categories -->

                <div class="product-tags">

                    ${(product.category || [])
                    .map((cat) => `

                        <span>

                            ${cat}

                        </span>

                    `).join("")}

                </div>



                <!-- Trust Info -->

                <div class="trust-info">

                    <div>

                        ✓ Fresh Flowers Guaranteed

                    </div>

                    <div>

                        ✓ Same Day Delivery

                    </div>

                    <div>

                        ✓ Secure Packaging

                    </div>

                    <div>

                        ✓ Handcrafted Bouquets

                    </div>

                </div>



                <!-- Add To Cart -->

                <button onclick="addToCart()">

                    Add To Cart

                </button>

            </div>

        `;



        fetchRelatedProducts();

    }

    catch(error){

        console.log(error);

    }

}



/* =========================
   RELATED PRODUCTS
========================= */

async function fetchRelatedProducts(){

    try{

        const response =
        await fetch("/api/products");

        const data =
        await response.json();



        const relatedProducts =
        data.products
        .filter((item) => {

            return item._id !== currentProduct._id;

        })
        .slice(0,3);



        const section = document.createElement("section");

        section.className =
        "related-products-section";



        section.innerHTML = `

            <div class="container">


                <div class="section-title">

                    <p>

                        YOU MAY ALSO LIKE

                    </p>

                    <h2>

                        Related Bouquets

                    </h2>

                </div>



                <div class="products-container">

                    ${relatedProducts.map((product) => `

                        <div class="product-card">

                            <div class="product-image">

                                <img src="${product.images[0]}">

                            </div>

                            <div class="product-info">

                                <h3>

                                    ${product.title}

                                </h3>

                                <p>

                                    ${product.description
                                    .substring(0,60)}...

                                </p>

                                <div class="product-bottom">

                                    <span>

                                        ₹${product.price}

                                    </span>

                                    <button
onclick="openProduct('${product._id}')">

                                        View

                                    </button>

                                </div>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>

        `;



        document.body.appendChild(section);

    }

    catch(error){

        console.log(error);

    }

}



/* =========================
   OPEN PRODUCT
========================= */

function openProduct(id){

    window.location.href =
    `/product.html?id=${id}`;

}



/* =========================
   ADD TO CART
========================= */

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

    showToast();

}



/* =========================
   TOAST
========================= */

function showToast(){

    const toast =
    document.createElement("div");

    toast.className =
    "custom-toast";



    toast.innerHTML = `

        ✓ Bouquet Added To Cart

    `;



    document.body.appendChild(toast);



    setTimeout(() => {

        toast.classList.add("show-toast");

    },100);



    setTimeout(() => {

        toast.classList.remove("show-toast");



        setTimeout(() => {

            toast.remove();

        },300);

    },2500);

}



/* =========================
   UPDATE CART COUNT
========================= */

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



/* =========================
   CHANGE IMAGE
========================= */

function changeImage(image){

    document.getElementById(
    "mainProductImage"
    ).src = image;

}



/* =========================
   LOAD
========================= */

fetchProduct();

updateCartCount();