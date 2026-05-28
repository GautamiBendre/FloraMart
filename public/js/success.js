/* =========================
   GET ORDER ID
========================= */

const params =
new URLSearchParams(
    window.location.search
);



const orderId =
params.get("id");



/* =========================
   SHOW ORDER ID
========================= */

document.getElementById(
    "orderId"
).innerText = orderId;



/* =========================
   TRACK BUTTON
========================= */

document.getElementById(
    "trackBtn"
).href =
`/track/${orderId}`;



/* =========================
   CLEAR CART
========================= */

localStorage.removeItem("cart");