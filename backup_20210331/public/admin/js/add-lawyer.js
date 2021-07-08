$(document).ready(function() {
    $("#lr_view_button3").bind("mousedown touchstart", function() {
           console.log("TEST");
           $("#lr_password").attr("type", "text");
       }), $("#lr_view_button3").bind("mouseup touchend", function() {
           $("#lr_password").attr("type", "password");
       }), $("#lr_view_button4").bind("mousedown touchstart", function() {
           $("#lr_verifyPassword").attr("type", "text");
       }), $("#lr_view_button4").bind("mouseup touchend", function() {
           $("#lr_verifyPassword").attr("type", "password")
       })
   });
   function checkPass()
   {
       //Store the password field objects into variables ...
       var pass1 = document.getElementById('lr_password');
       var pass2 = document.getElementById('lr_verifyPassword');
       //Store the Confimation Message Object ...
       var message = document.getElementById('lr_confirmMessage');
       //Set the colors we will be using ...
       var goodColor = "#66cc66";
       var badColor = "#ff6666";
       //Compare the values in the password field 
       //and the confirmation field
       if(pass1.value == pass2.value){
           //The passwords match. 
           //Set the color to the good color and inform
           //the user that they have entered the correct password 
           pass2.style.backgroundColor = goodColor;
           message.style.color = goodColor;
           message.innerHTML = "Mật khẩu trùng khớp"
       }else{
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
      document.getElementById("lr_status").innerHTML    = "<span class='text-danger'>Định dạng Email không phù hợp!</span>";
      }
      else
      {
      document.getElementById("lr_status").innerHTML	= "<span class='text-success'>Định dạng Email phù hợp!</span>";	
      }
  }
  
  
    const lr_username = document.querySelector("#lr_username");
    const lr_password = document.querySelector("#lr_password");
    const lr_phonenumber = document.querySelector("#lr_phonenumber");
    const lr_passwordConfirm = document.querySelector("#lr_passwordConfirm");
    const lr_email = document.querySelector("#lr_email");
    const lr_message = document.querySelector("#lr_message");
  
    $("#lr_registerForm").submit(function(event) {
  
      event.preventDefault(); //STOP default action
  
      if (lr_username.value === "" || lr_password.value === "" || lr_email.value === ""
                                   || lr_verifyPassword.value === "" ){
        lr_message.textContent = "Vui lòng nhập đầy đủ thông tin bắt buộc";
        lr_message.style.display = "block";
        lr_message.style.color = "red";
        lr_message.classList = "text-center mb-2";
        return;
      }
        
     
      const postData = {
        UserName: lr_username.value,
        PasswordHash: lr_password.value,
        Email: lr_email.value
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
                lr_message.textContent = "Thêm luật sư thành công";
                lr_message.style.color = "green";
                lr_message.classList = "text-center mb-2";
                window.location.href = "/admin";
              } else {
                lr_message.textContent = "Luật sư này đã tồn tại";
                lr_message.style.display = "block";
                lr_message.style.color = "red";
                lr_message.classList = "text-center mb-2";
              }
          },
          error: function(response) 
          {
              //if fails   
              console.log(response);
              lr_message.textContent = "Có lỗi xảy ra trong quá trình đăng ký";
              lr_message.style.display = "block";
              lr_message.style.color = "red";
              lr_message.classList = "text-center mb-2";
          }
      });
  
    });