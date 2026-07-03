const classTripPrchs = document.getElementById("id_trips_prchs");
const classTripFav = document.getElementById("id_trips_fav");

let localData = localStorage.getItem("users");
let tripsData = localStorage.getItem("trips_db");
let activeUserName = sessionStorage.getItem("user"); 

const data = JSON.parse(localData);
const tripsDb = JSON.parse(tripsData);

function displayPcrhs(){
    classTripPrchs.innerHTML = "";

    if (!data || !tripsDb || !tripsDb.trips || !activeUserName) return;

    const currentUser = data.find(user => user.username === activeUserName || user.name === activeUserName);

    if (!currentUser) {
        classTripPrchs.innerHTML = "<p>Usuário não encontrado.</p>";
        return;
    }

    const purchasedIds = currentUser.purchasedTrips || [];

    const purchasedTrips = tripsDb.trips.filter(trip => purchasedIds.includes(trip.id_trip));

    createCard(purchasedTrips, classTripPrchs);
}

function createCard(tripsArray, classTrip){
    if (tripsArray && tripsArray.length > 0) {
        tripsArray.forEach(trip => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = "trip.html";

            const image = document.createElement("img");
            image.className = "card-image";
            image.src = trip.iconImage;
            image.alt = trip.name;

            const content = document.createElement("div");
            content.className = "card-content";

            const title = document.createElement("h2");
            title.textContent = trip.name;

            content.appendChild(title);

            const actions = document.createElement("div");
            actions.className = "card-actions";

            const favorite = document.createElement("img");
            favorite.className = "action favorite";
            favorite.src = "../../assets/icons/not_hover/star.svg";

            const purchase = document.createElement("img");
            purchase.className = "action purchase";
            purchase.src = "../../assets/icons/not_hover/purchase.svg";

            actions.append(favorite, purchase);
            card.append(image, content, actions);
            classTrip.appendChild(card);
        });
    } else {
        classTrip.innerHTML = "<p>Nenhuma viagem comprada encontrada.</p>";
    }
}

displayPcrhs();