/* Container */

const productList =
document.getElementById("productList");

/* Search */

const searchInput =
document.getElementById("searchInput");
/* Sort */

const sortSelect =
document.getElementById("sortSelect");

/* Fetch Products */

async function fetchProducts(){

    try{

        const response =
        await fetch("/api/products");

        const data =
        await response.json();

        let allProducts = data.products;

        displayProducts(allProducts);

        /* Search */

        searchInput.addEventListener(
        "keyup",
        () => {

            const value =
            searchInput.value.toLowerCase();

            const filtered =
            data.products.filter((product) => {

                return product.title
                .toLowerCase()
                .includes(value);

            });

            displayProducts(filtered);

        });

        /* Sort Products */

sortSelect.addEventListener(
"change",
() => {

    let sortedProducts =
    [...allProducts];

    if(sortSelect.value === "name"){

        sortedProducts.sort((a,b) => {

            return a.title.localeCompare(b.title);

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

    }
    catch(error){

        console.log(error);

    }

}

/* Display Products */

function displayProducts(products){

    productList.innerHTML = "";

    products.forEach((product) => {

        productList.innerHTML += `

        <div class="admin-product-card">

            <div class="admin-product-left">

                <img src="${product.images[0]}">

                <div>

                    <h3>

                        ${product.title}

                    </h3>

                    <p>

                        ₹${product.price}

                    </p>

                </div>

            </div>

            <div class="admin-product-buttons">

               <a href="/admin/editProduct?id=${product._id}"
    class="edit-btn">

    Edit

</a>

                <button class="delete-btn"
                    onclick="deleteProduct('${product._id}')">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

/* Delete Product */

async function deleteProduct(id){

    const confirmDelete =
    confirm("Delete this product?");

    if(!confirmDelete) return;

    try{

        const response =
        await fetch(`/api/products/${id}`, {

            method:"DELETE"

        });

        const data =
        await response.json();

        if(data.success){

            fetchProducts();

        }

    }
    catch(error){

        console.log(error);

    }

}

/* Load */

fetchProducts();