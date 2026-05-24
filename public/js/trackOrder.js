async function loadOrder(){

    const orderId =
    window.location.pathname
    .split("/")[2];



    try{

        const response =
        await fetch("/api/orders");



        const data =
        await response.json();



        const order =
        data.orders.find((item) => {

            return item._id === orderId;

        });



        const trackContent =
        document.getElementById(
            "trackContent"
        );



        if(!order){

            trackContent.innerHTML =

            `<h2>
            Order Not Found
            </h2>`;

            return;

        }



        const steps = [

            "Pending",
            "Confirmed",
            "Preparing",
            "Out For Delivery",
            "Delivered"

        ];



        let timelineHTML = "";



        steps.forEach((step,index) => {

            const currentIndex =
            steps.indexOf(order.status);



            let activeClass = "";



            if(index <= currentIndex){

                activeClass = "active-step";

            }



            timelineHTML += `

            <div class="timeline-step
            ${activeClass}">

                <div class="step-circle">

                    ✓

                </div>

                <p>

                    ${step}

                </p>

            </div>

            `;

        });



        trackContent.innerHTML = `

        <div class="track-card">

            <h2>

                ${order.customerName}

            </h2>

            <p>

                Total:
                ₹${order.total}

            </p>

            <p>

                Payment:
                ${order.paymentMethod}

            </p>



            <div class="timeline">

                ${timelineHTML}

            </div>

        </div>

        `;

    }
    catch(error){

        console.log(error);

    }

}



loadOrder();