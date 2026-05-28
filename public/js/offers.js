/* =========================
   FORM
========================= */

const offerForm =
document.getElementById(
    "offerForm"
);



/* =========================
   CREATE OFFER
========================= */

offerForm.addEventListener(
"submit",
async (e) => {

    e.preventDefault();



    const offerData = {

        title:
        document.getElementById(
            "title"
        ).value,

        description:
        document.getElementById(
            "description"
        ).value,

        image:
        document.getElementById(
            "image"
        ).value,

        discount:
        document.getElementById(
            "discount"
        ).value,

        expiryDate:
        document.getElementById(
            "expiryDate"
        ).value

    };



    try{

        const response =
        await fetch("/api/offers", {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify(
                offerData
            )

        });



        const data =
        await response.json();



        if(data.success){

            alert(
                "Offer Created"
            );



            offerForm.reset();



            loadOffers();

        }

    }
    catch(error){

        console.log(error);

    }

});



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



        data.offers.forEach((offer) => {

            offersContainer.innerHTML += `

            <div class="offer-card">


                <!-- IMAGE -->

                <div class="offer-image">

                    <img
                    src="${offer.image}">

                </div>



                <!-- CONTENT -->

                <div class="offer-content">

                    <span class="offer-discount">

                        ${offer.discount}

                    </span>

                    <h2>

                        ${offer.title}

                    </h2>

                    <p>

                        ${offer.description}

                    </p>

                    <div class="offer-date">

                        Expires :
                        ${offer.expiryDate || "No Expiry"}

                    </div>

                    <button
                    class="delete-offer-btn"

                    onclick="deleteOffer('${offer._id}')">

                        Delete Offer

                    </button>

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
   DELETE OFFER
========================= */

async function deleteOffer(id){

    const confirmDelete =
    confirm(
        "Delete this offer?"
    );



    if(!confirmDelete){

        return;

    }



    try{

        const response =
        await fetch(`/api/offers/${id}`, {

            method:"DELETE"

        });



        const data =
        await response.json();



        if(data.success){

            loadOffers();

        }

    }
    catch(error){

        console.log(error);

    }

}



/* =========================
   LOAD
========================= */

loadOffers();