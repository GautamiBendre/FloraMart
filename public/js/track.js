/* =========================
   LOAD ORDER
========================= */

async function loadOrder(){

    /* Get Order ID */

    const orderId =
    window.location.pathname
    .split("/")[2];



    try{

        /* Fetch Single Order */

        const response =
        await fetch(
            `/api/orders/${orderId}`
        );



        const data =
        await response.json();



        /* Container */

        const trackInfo =
        document.getElementById(
            "trackInfo"
        );



        /* Order Not Found */

        if(!data.success){

            trackInfo.innerHTML = `

            <div class="track-info-box">

                <h3>

                    Order Not Found

                </h3>

            </div>

            `;

            return;

        }



        const order =
        data.order;



        /* Show Order Info */

        trackInfo.innerHTML = `

        <div class="track-info-box">

            <h3>

                ${order.customerName}

            </h3>

            <p>

                Order ID :
                ${order._id}

            </p>

            <p>

                Total :
                ₹${order.total}

            </p>

            <p>

                Payment :
                ${order.paymentMethod}

            </p>

            <p>

                Current Status :
                ${order.status}

            </p>

        </div>

        `;



        /* Timeline Steps */

        const steps = [

            "Pending",
            "Confirmed",
            "Preparing",
            "Out For Delivery",
            "Delivered"

        ];



        const currentStep =
        steps.indexOf(order.status);



        /* Activate Steps */

        steps.forEach((step,index) => {

            let elementId = "";



            if(step === "Pending"){

                elementId =
                "step-pending";

            }

            if(step === "Confirmed"){

                elementId =
                "step-confirmed";

            }

            if(step === "Preparing"){

                elementId =
                "step-preparing";

            }

            if(step === "Out For Delivery"){

                elementId =
                "step-delivery";

            }

            if(step === "Delivered"){

                elementId =
                "step-delivered";

            }



            const stepElement =
            document.getElementById(
                elementId
            );



            if(index <= currentStep){

                stepElement.classList
                .add("active");

            }

        });

    }
    catch(error){

        console.log(error);

    }

}



/* =========================
   LOAD
========================= */

loadOrder();