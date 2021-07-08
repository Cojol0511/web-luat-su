const loginBtn = document.querySelector("#login_btn");
const divAlert = document.querySelector("#login_message");
const username_input = document.querySelector("#login_username");
const password_input = document.querySelector("#login_password");
var alert_div = document.querySelector("#login_message");
const AUTH_URL = 'http://api.veneris.bitiland.com/api/auth/';

const loginHandler = async (e) => {
    e.preventDefault();

    // Create Object with information from the form
    const userObj = {
        "UserName": username_input.value,
        "PasswordHash": password_input.value
    }

    // check if there are any empty fields
    if (userObj.userName === "" || userObj.passwordHash === "") {
        alert_div.textContent = "Vui lòng nhập đầy đủ thông tin";
        alert_div.style.display = "block";
        alert_div.style.fontWeight = "bold";

        // if(userObj.email === '') { email_input.focus(); }
        // else { password_input.focus(); }

        return;
    }

    // Request to server to log-in passing the User information (userObj)
    axios.post(AUTH_URL, userObj)
    .then(function (data) {
        console.log(data);
        if (data.message) {
            alert_div.textContent = data.message;
            alert_div.style.display = "block";
            alert_div.style.fontWeight  = "bold";
        } else {
            // redirect to Main page (Authorize)
            window.location.href = "/";
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

// Click event to submit the form
loginBtn.addEventListener("click", loginHandler);

$('.modal').on('shown.bs.modal', function (e) {
   $("body").addClass("modal-open")
 });