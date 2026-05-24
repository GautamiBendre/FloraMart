/* Form */

const productForm =
document.getElementById("productForm");

/* Submit Product */

productForm.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    /* Form Data */

    const formData =
    new FormData();

    formData.append(

        "title",

        document.getElementById("title").value

    );

    formData.append(

        "description",

        document.getElementById("description").value

    );

    formData.append(

        "price",

        document.getElementById("price").value

    );

    formData.append(
    "category",
    document.getElementById("category").value
    );

    /* Images */

    const images =
    document.getElementById("images").files;

    for(let i = 0; i < images.length; i++){

        formData.append(

            "images",

            images[i]

        );

    }

    try{

        const response =
        await fetch("/api/products", {

            method:"POST",

            body:formData

        });

        const data =
        await response.json();

        if(data.success){

            alert(
                "Product Uploaded Successfully"
            );

            productForm.reset();

            location.reload();

        }

    }
    catch(error){

        console.log(error);

    }

});

/* Product Count */

async function loadProductCount(){

    try{

        const response =
        await fetch("/api/products");

        const data =
        await response.json();

        document.getElementById(
            "productCount"
        ).innerText =
        data.products.length;

    }
    catch(error){

        console.log(error);

    }

}

/* Load Count */

loadProductCount();