let allProducts = [];

/* Controls */

const searchInput =
document.getElementById("searchInput");

const sortSelect =
document.getElementById("sortSelect");


/* Fetch Products */

async function fetchProducts(){

    try{

        const response =
        await fetch("/api/products");

        const data =
        await response.json();

        allProducts =
        data.products;

        displayProducts(allProducts);


        /* Search */

        searchInput.addEventListener(
        "keyup",
        () => {

            const value =
            searchInput.value.toLowerCase();

            const filtered =
            allProducts.filter((product) => {

                return product.title
                .toLowerCase()
                .includes(value);

            });

            displayProducts(filtered);

        });


        /* Sort */

        sortSelect.addEventListener(
        "change",
        () => {

            let sortedProducts =
            [...allProducts];

            if(sortSelect.value === "name"){

                sortedProducts.sort((a,b) => {

                    return a.title
                    .localeCompare(b.title);

                });

            }

            if(sortSelect.value === "low"){

                sortedProducts.sort((a,b) => {

                    return a.price - b.price;

                });

            }

            if(sortSelect.value === "high"){

                sortedProducts.sort((a,b) => {

                    return b.price - a.price;

                });

            }

            displayProducts(sortedProducts);

        });

        /* Category Filter */

const categorySelect =
document.getElementById(
"categorySelect"
);

categorySelect.addEventListener(
"change",
() => {

    const category =
    categorySelect.value;

    if(category === "All"){

        displayProducts(allProducts);

        return;

    }

    const filtered =
    allProducts.filter((product) => {

        return product.category
        .includes(category);

    });

    displayProducts(filtered);

});



    }
    catch(error){

        console.log(error);

    }

}



/* Display Products */

function displayProducts(products){

    const container =
    document.getElementById(
        "products-container"
    );

    container.innerHTML = "";

    products.forEach((product) => {

        container.innerHTML += `

        <a href="/product.html?id=${product._id}"
        class="product-link">

            <div class="product-card">

                <div class="product-image">

                    <img src="${product.images[0]}"
                        alt="${product.title}">

                </div>

                <div class="product-info">

                    <h3>

                        ${product.title}

                    </h3>

                    <p>

                        ${product.description
                        .substring(0,55)}...

                    </p>

                    <div class="product-bottom">

                        <span>

                            ₹${product.price}

                        </span>

                        <button
                        onclick="addToCart('${product._id}')">

                            Add To Cart

                        </button>

                    </div>

                </div>

            </div>

        </a>

        `;

    });

}

/* Add To Cart */

function addToCart(productId){

    const selectedProduct =
    allProducts.find((product) => {

        return product._id === productId;

    });

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



    const existingProduct =
    cart.find((item) => {

        return item._id === productId;

    });



    if(existingProduct){

        existingProduct.quantity += 1;

    }
    else{

        cart.push({

            ...selectedProduct,

            quantity:1

        });

    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    updateCartCount();

    showToast(
    "Product Added To Cart"
);

}

/* Cart Count */

function updateCartCount(){

    const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



    let totalQuantity = 0;



    cart.forEach((item) => {

        totalQuantity += item.quantity;

    });



    /* Desktop Count */

    const cartCount =
    document.getElementById(
        "cartCount"
    );



    if(cartCount){

        cartCount.innerText =
        totalQuantity;

    }



    /* Mobile Count */

    const mobileCartCount =
    document.getElementById(
        "mobileCartCount"
    );



    if(mobileCartCount){

        mobileCartCount.innerText =
        totalQuantity;

    }

}

/* =========================
   SHOW TOAST
========================= */

function showToast(message){

    const container =
    document.getElementById(
        "toastContainer"
    );



    if(!container){

        return;

    }



    const toast =
    document.createElement("div");



    toast.classList.add(
        "toast-message"
    );



    toast.innerText =
    message;



    container.appendChild(
        toast
    );



    setTimeout(() => {

        toast.remove();

    },3000);

}


/* Load */

fetchProducts();
updateCartCount();