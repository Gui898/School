const main = document.getElementById("trips");

const data = JSON.parse(localStorage.getItem("trips_db"));

if (data && data.trips) {

    data.trips.forEach(trip => {

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

        main.appendChild(card);
    });
}