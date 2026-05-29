require("dotenv").config();
console.log(
    "API KEY:",
    process.env.CLOUD_API_KEY
);
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const orderRoutes =require("./routes/orderRoutes");
const offerRoutes =require("./routes/offerRoutes");

const app = express();

/* Middleware */

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use("/api/products", productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/offers",offerRoutes);

/* Static Folder */

app.use(express.static(path.join(__dirname,"public")));

/* MongoDB Connection */

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log(err);

});

/* Homepage */

app.get("/", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/customer/index.html")
    );

});

/* Product Details Page */

app.get("/product.html", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/customer/product.html")
    );

});

/* Admin Dashboard */

app.get("/admin/dashboard", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/admin/dashboard.html")
    );

});

/* Products Page */

app.get("/admin/newProduct", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/admin/newProduct.html")
    );

});

/* Products Options Page */

app.get("/admin/products", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/admin/products.html")
    );

});

/* All Products Page */

app.get("/admin/allProducts", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/admin/allProducts.html")
    );

});

/* Edit Product Page */

app.get("/admin/editProduct", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/admin/editProduct.html")
    );

});

/* Shop Page */

app.get("/shop", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/customer/shop.html")
    );

});

/* Cart Page */

app.get("/cart.html", (req,res) => {

    res.sendFile(
        path.join(__dirname,"views/customer/cart.html")
    );

});

/* Checkout Page */

app.get("/checkout.html", (req,res) => {

    res.sendFile(
        path.join(__dirname,
        "views/customer/checkout.html")
    );

});

/* Success Page */

app.get("/success.html", (req,res) => {

    res.sendFile(
        path.join(
            __dirname,
            "views",
            "customer",
            "success.html"
        )
    );

});

/* Admin Orders */

app.get("/admin/orders", (req,res) => {

    res.sendFile(
        path.join(__dirname,
        "views/admin/orders.html")
    );

});

app.get("/track/:id", (req,res) => {

    res.sendFile(

        path.join(
            __dirname,
            "views/customer/track.html"
        )

    );

});

app.get("/myOrders.html", (req,res) => {

    res.sendFile(

        path.join(
            __dirname,
            "views/customer/myOrders.html"
        )

    );

});
app.get("/offers.html", (req,res) => {

    res.sendFile(

        path.join(
            __dirname,
            "views/customer/offers.html"
        )

    );

});
app.get("/admin/offers", (req,res) => {

    res.sendFile(

        path.join(
            __dirname,
            "views/admin/offers.html"
        )

    );

});

app.get("/contact.html", (req,res) => {

    res.sendFile(

        path.join(
            __dirname,
            "views/customer/contact.html"
        )

    );

});

app.get("/admin/completedOrders", (req,res) => {

    res.sendFile(

        path.join(
            __dirname,
            "views/admin/completedOrders.html"
        )

    );

});

/* Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
    `Server running on ${PORT}`
    );

});