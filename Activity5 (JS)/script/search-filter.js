const classTrip = document.getElementById("id_trips");

const nameBar = document.getElementById("search-name");
const priceBar = document.getElementById("search-price");
const dateBar = document.getElementById("search-date");

function filterTrips() {
    const localData = localStorage.getItem("trips_db") || JSON.stringify({trips: []});
    const data = JSON.parse(localData);
    const allTrips = data.trips;

    const nameTerm = nameBar.value.toLowerCase();
    const maxPrice = parseFloat(priceBar.value) || Infinity;
    const dateFilter = dateBar.value;

    const filtered = allTrips.filter(trip => {
        const matchName = trip.name ? trip.name.toLowerCase().includes(nameTerm) : false;

        const matchPrice = trip.price ? parseFloat(trip.price) <= maxPrice : true;

        const matchDate = dateFilter === "" || trip.date === dateFilter;

        return matchName && matchPrice && matchDate;
    });

    display(filtered);
}

nameBar.addEventListener('input', filterTrips);
priceBar.addEventListener('input', filterTrips);
dateBar.addEventListener('change', filterTrips);

function display(listTrips) {
    classTrip.innerHTML = "";

    if (listTrips.length === 0) {
        classTrip.innerHTML = "<p class='no_results'>Trip not found.</p>";
        return;
    }

    listTrips.forEach(trip => {
        
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

        favorite.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            add_favorite_trip(trip.id_trip);
        });

        purchase.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            add_purchase_trip(trip.id_trip);
        });

        actions.append(favorite, purchase);

        card.append(image, content, actions);

        classTrip.appendChild(card);
    });
}

function add_favorite_trip(id) {

    let localData = JSON.parse(localStorage.getItem("users_db"));

    if(!localData){
        alert("User not found");
        throw new Error("User not found");
    }

    const username = sessionStorage.getItem("user");

    hasUser = false;
    localData.users.forEach(user => {
            
        if(user.username == username){
                
            user.favorite_trip.push(id);

            hasUser = true;
        }
    });

    if (!hasUser) {
        alert("Incorrect username or password");
        throw new Error("Incorrect username or password");
    }

    localStorage.setItem("users_db", JSON.stringify(localData, null, 2));
}

function add_purchase_trip(id) {

    let localData = JSON.parse(localStorage.getItem("users_db"));

    if(!localData){
        alert("User not found");
        throw new Error("User not found");
    }

    const username = sessionStorage.getItem("user");

    hasUser = false;
    localData.users.forEach(user => {
            
        if(user.username == username){
                
            user.purchase_trip.push(id);

            hasUser = true;
        }
    });

    if (!hasUser) {
        alert("Incorrect username or password");
        throw new Error("Incorrect username or password");
    }

    localStorage.setItem("users_db", JSON.stringify(localData, null, 2));
}

filterTrips();