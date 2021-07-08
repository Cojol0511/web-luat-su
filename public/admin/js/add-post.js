$(document).ready(function() {
  $("#ar_view_button3").bind("mousedown touchstart", function() {
         console.log("TEST");
         $("#ar_password").attr("type", "text");
     }), $("#ar_view_button3").bind("mouseup touchend", function() {
         $("#ar_password").attr("type", "password");
     }), $("#ar_view_button4").bind("mousedown touchstart", function() {
         $("#ar_verifyPassword").attr("type", "text");
     }), $("#ar_view_button4").bind("mouseup touchend", function() {
         $("#ar_verifyPassword").attr("type", "password")
     })
 });
 function checkPass()
 {
     //Store the password field objects into variables ...
     var pass1 = document.getElementById('ar_password');
     var pass2 = document.getElementById('ar_verifyPassword');
     //Store the Confimation Message Object ...
     var message = document.getElementById('ar_confirmMessage');
     //Set the colors we will be using ...
     var goodColor = "#66cc66";
     var badColor = "#ff6666";
     //Compare the values in the password field 
     //and the confirmation field
     if (pass1.value == pass2.value){
         //The passwords match. 
         //Set the color to the good color and inform
         //the user that they have entered the correct password 
         pass2.style.backgroundColor = goodColor;
         message.style.color = goodColor;
         message.innerHTML = "Mật khẩu trùng khớp"
     } else {
         //The passwords do not match.
         //Set the color to the bad color and
         //notify the user.
         pass2.style.backgroundColor = badColor;
         message.style.color = badColor;
         message.innerHTML = "Mật khẩu không trùng khớp"
     }
 } 

function validatephone(phone) 
{
    var maintainplus = '';
    var numval = phone.value
    if ( numval.charAt(0)=='+' )
    {
        var maintainplus = '';
    }
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g,'');
    phone.value = maintainplus + curphonevar;
    var maintainplus = '';
    phone.focus;
}

// validates text only
function Validate(txt) {
  txt.value = txt.value.replace(/[^a-zA-Z0-9_\n\r.]+/g, '');
}

// validate email
function email_validate(email)
{
var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

    if(regMail.test(email) == false)
    {
    document.getElementById("ar_status").innerHTML    = "<span class='text-danger'>Định dạng Email không phù hợp!</span>";
    }
    else
    {
    document.getElementById("ar_status").innerHTML	= "<span class='text-success'>Định dạng Email phù hợp!</span>";	
    }
}


  const ar_username = document.querySelector("#ar_username");
  const ar_password = document.querySelector("#ar_password");
  const ar_phonenumber = document.querySelector("#ar_phonenumber");
  const ar_passwordConfirm = document.querySelector("#ar_passwordConfirm");
  const ar_email = document.querySelector("#ar_email");
  const ar_message = document.querySelector("#ar_message");

  $("#ar_registerForm").submit(function(event) {

    event.preventDefault(); //STOP default action

    if (ar_username.value === "" || ar_password.value === "" || ar_email.value === ""
                                 || ar_verifyPassword.value === "" ){
      ar_message.textContent = "Vui lòng nhập đầy đủ thông tin bắt buộc";
      ar_message.style.display = "block";
      ar_message.style.color = "red";
      ar_message.classList = "text-center mb-2";
      return;
    }
      
   
    const postData = {
      UserName: ar_username.value,
      PasswordHash: ar_password.value,
      Email: ar_email.value
    }

    console.log(JSON.stringify(postData));

    var formURL = $(this).attr("action");

    $.ajax(
    {
        url : formURL,
        type: "POST",
        contentType: 'application/json',
        crossDomain: true,
        data : JSON.stringify(postData),
        success:function(response) 
        {
            if (response.success === 1){
              //data: return data from server
              ar_message.textContent = "Thêm admin thành công";
              ar_message.style.color = "green";
              ar_message.classList = "text-center mb-2";
              window.location.href = "/admin";
            } else {
              ar_message.textContent = "Admin này đã tồn tại";
              ar_message.style.display = "block";
              ar_message.style.color = "red";
              ar_message.classList = "text-center mb-2";
            }
        },
        error: function(response) 
        {
            //if fails   
            console.log(response);
            ar_message.textContent = "Có lỗi xảy ra trong quá trình đăng ký";
            ar_message.style.display = "block";
            ar_message.style.color = "red";
            ar_message.classList = "text-center mb-2";
        }
    });

  });