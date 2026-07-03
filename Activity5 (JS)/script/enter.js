function validateRegister(event){
    event.preventDefault()

    const username_ = document.getElementById("username_register").value;
    const email_ = document.getElementById("email_register").value;
    const password_ = document.getElementById("password_register").value;

    const obj = {
        username: username_,
        email: email_,
        password: password_,
        favorite_trip: [],
        purchase_trip: []
    };

    let localData = localStorage.getItem("users_db");
    if(!localData){
        localData = JSON.stringify({users: []});
    }

    const data = JSON.parse(localData);

    data.users.push(obj);

    sessionStorage.setItem("user", obj.username)
    localStorage.setItem("users_db", JSON.stringify(data, null, 2));

    alert("The user was registered!");
    window.location.href = "../hub/store.html";
}

function login(event){
    event.preventDefault()

    const username_ = document.getElementById("username_login").value;
    const password_ = document.getElementById("password_login").value;

    const obj = {
        username: username_,
        password: password_
    };

    let localData = localStorage.getItem("users_db");
    if(!localData){
        alert("User not found");
        throw new Error("User not found");
    }

    const data = JSON.parse(localData);

    hasUser = false;
    data.users.forEach(user => {
        
        if(user.username == username_ && user.password == password_){
            
            sessionStorage.setItem("user", user.username)
            window.location.href = "../hub/store.html";

            hasUser = true;
        }
    });

    if (!hasUser) {

        alert("Incorrect username or password");
        throw new Error("Incorrect username or password");
    }
}

function delete_user(event) {
    event.preventDefault();

    sessionStorage.removeItem("user");
    window.location.href = "../../index.html";
}