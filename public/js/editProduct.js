/* Product ID */

const params =
new URLSearchParams(window.location.search);

const productId =
params.get("id");

/* Form */

const editForm =
document.getElementById("editForm");

/* Load Product */

async function loadProduct(){

    try{

        const response =
        await fetch(`/api/products/${productId}`);

        const data =
        await response.json();

        const product =
        data.product;

        document.getElementById("title").value =
        product.title;

        document.getElementById("description").value =
        product.description;

        document.getElementById("price").value =
        product.price;

    }
    catch(error){

        console.log(error);

    }

}

/* Update Product */

editForm.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    const updatedProduct = {

        title:
        document.getElementById("title").value,

        description:
        document.getElementById("description").value,

        price:
        document.getElementById("price").value

    };

    try{

        const response =
        await fetch(`/api/products/${productId}`, {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(updatedProduct)

        });

        const data =
        await response.json();

        if(data.success){

            alert("Product Updated");

            window.location.href =
            "/admin/allProducts";

        }

    }
    catch(error){

        console.log(error);

    }

});

/* Load */

loadProduct();