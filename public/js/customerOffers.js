/* =========================
   LOAD OFFERS
========================= */

async function loadOffers(){

    try{

        const response =
        await fetch("/api/offers");



        const data =
        await response.json();



        const offersContainer =
        document.getElementById(
            "offersContainer"
        );



        offersContainer.innerHTML = "";



        /* EMPTY */

        if(data.offers.length === 0){

            offersContainer.innerHTML = `

            <div class="empty-offers">

                <h2>

                    No Offers Available

                </h2>

            </div>

            `;

            return;

        }



        /* DISPLAY */

        data.offers.forEach((offer) => {

            offersContainer.innerHTML += `

            <div class="offer-card">


                <!-- IMAGE -->

                ${offer.image ? `

                <div class="offer-image">

                    <img src="${offer.image}">

                </div>

                ` : ""}



                <!-- CONTENT -->

                <div class="offer-content">

                    ${offer.discount ? `

                    <span class="offer-discount">

                        ${offer.discount}

                    </span>

                    ` : ""}

                    <h2>

                        ${offer.title}

                    </h2>

                    <p>

                        ${offer.description}

                    </p>

                    <div class="offer-date">

                        Valid Till :
                        ${offer.expiryDate || "Limited Time"}

                    </div>

                </div>

            </div>

            `;

        });

    }
    catch(error){

        console.log(error);

    }

}



/* =========================
   LOAD
========================= */

loadOffers();