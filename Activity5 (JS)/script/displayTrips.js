const classTripPrchs = document.getElementById("id_trips_prchs");

const usersData = JSON.parse(localStorage.getItem("users_db"));
const tripsData = JSON.parse(localStorage.getItem("trips_db"));

const activeUserName = sessionStorage.getItem("user");

function updateTotal(tripsArray) {

    const total = tripsArray.reduce((sum, trip) => {
        return sum + Number(trip.price);
    }, 0);

    document.getElementById("total").textContent = total.toFixed(2);
}

function displayPrchs() {

    classTripPrchs.innerHTML = "";

    if (!usersData || !tripsData) return;

    const currentUser = usersData.users.find(
        user => user.username === activeUserName
    );

    if (!currentUser) {
        classTripPrchs.innerHTML = "<p>Usuário não encontrado.</p>";
        return;
    }

    const purchasedIds = currentUser.purchase_trip;

    const purchasedTrips = tripsData.trips.filter(trip =>
        purchasedIds.includes(trip.id_trip)
    );

    createCard(purchasedTrips, classTripPrchs);
    updateTotal(purchasedTrips);

    createCard(purchasedTrips, classTripPrchs);
}

displayPrchs();

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
    } 
    else {
        classTrip.innerHTML = "<p>Nenhuma viagem comprada encontrada.</p>";
    }
}

displayPrchs();