const a_username = document.querySelector("#a_username");
const a_password = document.querySelector("#a_password");
var alert_div = document.querySelector("#a_message");

function validateForm() {

    var errorCount = 0; 
    var fields = ['email','password'];
    var a = $('#email').val(); 
    var b = $('#password').val(); 
    fields.forEach((el)=> {
        var x = $("#" + el).val(); 
        if (x === null || x === "") {
            $("#" + el + "_error").html("This field can't be empty");
            $("#" + el).css({"margin-bottom":"0px"});
            ++errorCount;
        } else  {
            $("#" + el + "_error").html("");
            $("#" + el).css({"margin-bottom":"10px"});
        }
    });

    regex = /\S+@\S+\.\S+/;
    if(a!=null && a.length!=0 && !regex.test(a)) {
        $('#email_error').html("Please enter a valid email");
        $("#email").css({"margin-bottom":"0px"});
        ++errorCount;
    } 
    if(b!=null && b.length!=0 && b.length < 8) {
        $('#password_error').html("Password is not valid");
        $("#password").css({"margin-bottom":"0px"});
        ++errorCount;
    } 
    if (errorCount) return 0;
    return 1
}


$("#a_loginForm").submit(function(event)  {
    event.preventDefault();

    // Create Object with information from the form
    const postData = {
        UserName: a_username.value,
        PasswordHash: a_password.value
    }

    // check if there are any empty fields
    if (postData.UserName === "" || postData.PasswordHash === "") {
        alert_div.textContent = "Vui lòng nhập đủ thông tin";
        alert_div.style.display = "block";
        alert_div.style.color = "red";
        alert_div.classList = "text-center mb-2";

        // if(userObj.email === '') { email_input.focus(); }
        // else { password_input.focus(); }

        return;
    }

    // Request to server to log-in passing the User information (userObj)

    var formURL = $(this).attr("action");
    console.log(postData)

    $.ajax(
    {
        url : formURL,
        type: "POST",
        contentType: 'application/json',
        crossDomain: true,
        data : JSON.stringify(postData),
        dataType: 'json',
        success:function(response, textStatus, request) 
        {
            //data: return data from server
            //alert("The server says: " + response.accessToken);
            if (response.success === 0 ){
                console.log(response);
                alert_div.textContent = "Tên người dùng hoặc mật khẩu không đúng";
                alert_div.style.display = "block";
                alert_div.style.color = "red";
                alert_div.classList = "text-center mb-2";
            } else { 
                document.cookie = `token=${response.accessToken};path=/;SameSite=Lax`;
                document.cookie = `refreshtoken=${response.refreshToken};path=/;SameSite=Lax`;
                document.cookie = `username=${response.username};path=/;SameSite=Lax`; 
                document.cookie = `userID=${response.userID};path=/;SameSite=Lax`; 
                document.cookie = `email=${response.email};path=/;SameSite=Lax`;
                document.cookie = `role=${response.role};path=/;SameSite=Lax`; 

                alert_div.textContent = "Đăng nhập thành công";
                alert_div.style.color = "green";
                alert_div.classList = "text-center mb-2";
            }
            // console.log(request.getResponseHeader('Set-Cookie'));
            //alert(document.cookie);
            window.location.replace('/admin');
        },
        error: function(response) 
        {
            console.log(response);
            alert_div.textContent = "Tên người dùng hoặc mật khẩu không đúng";
            alert_div.style.display = "block";
            alert_div.style.color = "red";
            alert_div.classList = "text-center mb-2";
            //if fails   
            //alert('it didnt work');   
        }
    });

});

/*
$("#a_registerForm").submit(function(event)  {
    event.preventDefault();

    // Create Object with information from the form
    const postData = {
        UserName: a_username.value,
        PasswordHash: a_password.value
    }

    // check if there are any empty fields
    if (postData.UserName === "" || postData.PasswordHash === "") {
        alert_div.textContent = "Vui lòng nhập đủ thông tin";
        alert_div.style.display = "block";
        alert_div.style.color = "red";
        alert_div.classList = "text-center mb-2";

        // if(userObj.email === '') { email_input.focus(); }
        // else { password_input.focus(); }

        return;
    }

    // Request to server to log-in passing the User information (userObj)

    var formURL = $(this).attr("action");
    console.log(postData)

    $.ajax(
    {
        url : formURL,
        type: "POST",
        contentType: 'application/json',
        crossDomain: true,
        data : JSON.stringify(postData),
        success:function(response) 
        {
            //data: return data from server
            // alert("The server says: " + response.accessToken);
            document.cookie = `token=${response.accessToken}`;
            document.cookie = `refreshtoken=${response.refreshToken}`;
            document.cookie = "username=admin"; 
            alert_div.textContent = "Đăng nhập thành công";
            alert_div.style.color = "green";
            alert_div.classList = "text-center mb-2";

            window.location.href = "/admin";
        },
        error: function(response) 
        {
            console.log(response);
            alert_div.textContent = "Tên người dùng hoặc mật khẩu không đúng";
            alert_div.style.display = "block";
            alert_div.style.color = "red";
            alert_div.classList = "text-center mb-2";
            //if fails   
            //alert('it didnt work');   
        }
    });

});
*/