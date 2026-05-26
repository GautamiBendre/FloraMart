/* =========================
   GENERATE ORDER ID
========================= */

const orderId =
"BH" +
Math.floor(
    100000 + Math.random() * 900000
);



/* =========================
   SHOW ORDER ID
========================= */

document.getElementById(
    "orderId"
).innerText = orderId;



/* =========================
   CLEAR CART
========================= */

localStorage.removeItem("cart");