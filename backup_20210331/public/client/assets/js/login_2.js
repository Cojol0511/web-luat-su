$(document).ready(function () {

    const BASE_URL = 'http://34.68.53.204/';
    const INDEX_URL = BASE_URL + '/api/auth';
    const AUTH_URL = 'http://api.veneris.bitiland.com/api/auth/';
    const data = [];

    $('.modal').on('shown.bs.modal', function (e) {
        $("body").addClass("modal-open");
        const loginBtn = document.getElementById("#login_btn");
        const messageDiv = document.getElementById("#login_message");
        const username_input = document.getElementById("#login_username");
        const password_input = document.getElementById("#login_password");
        // Click event to submit the form
        loginBtn.addEventListener("click", loginHandler);
    });


    const loginHandler = async (e) => {
        e.preventDefault();
    
        // Create Object with information from the form
        const userObj = {
            userName: username_input.value,
            passwordHash: password_input.value
        }
    
        console.log(userObj);

        // check if there are any empty fields
        if (userObj.userName === "" || userObj.passwordHash === "") {
            messageDiv.textContent = "Vui lòng nhập đầy đủ thông tin";
            messageDiv.style.display = "block";
            messageDiv.style.fontWeight = "bold";
    
            // if(userObj.email === '') { email_input.focus(); }
            // else { password_input.focus(); }
    
            return;
        }
    
        // Request to server to log-in passing the User information (userObj)
            // Transfer the data from API to variable data
        axios.post(AUTH_URL, userObj)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        
        const data = await response.json();
        // If there is an error, display error to screen.
        if (data.message) {
            messageDiv.textContent = data.message;
            messageDiv.style.display = "block";
            messageDiv.style.fontWeight  = "bold";
        } else {
            // redirect to Main page (Authorize)
            window.location.href = "/";
        }
    }
});