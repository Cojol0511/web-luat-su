$(document).ready(function() {
    $("#cr_view_button3").bind("mousedown touchstart", function() {
           console.log("TEST");
           $("#cr_password").attr("type", "text");
       }), $("#cr_view_button3").bind("mouseup touchend", function() {
           $("#cr_password").attr("type", "password");
       }), $("#cr_view_button4").bind("mousedown touchstart", function() {
           $("#cr_verifyPassword").attr("type", "text");
       }), $("#cr_view_button4").bind("mouseup touchend", function() {
           $("#cr_verifyPassword").attr("type", "password")
       })
   });
   function checkPass()
   {
       //Store the password field objects into variables ...
       var pass1 = document.getElementById('cr_password');
       var pass2 = document.getElementById('cr_verifyPassword');
       //Store the Confimation Message Object ...
       var message = document.getElementById('cr_confirmMessage');
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
      document.getElementById("cr_status").innerHTML    = "<span class='text-danger'>Định dạng Email không phù hợp!</span>";
      }
      else
      {
      document.getElementById("cr_status").innerHTML	= "<span class='text-success'>Định dạng Email phù hợp!</span>";	
      }
  }
  
  
    const cr_username = document.querySelector("#cr_username");
    const cr_password = document.querySelector("#cr_password");
    //const cr_phonenumber = document.querySelector("#cr_phonenumber");
    const cr_passwordConfirm = document.querySelector("#cr_passwordConfirm");
    const cr_email = document.querySelector("#cr_email");
    const cr_message = document.querySelector("#cr_message");
  
    $("#cr_registerForm").submit(function(event) {
  
      event.preventDefault(); //STOP default action
  
      if (cr_username.value === "" || cr_password.value === "" || cr_email.value === ""
                                   || cr_verifyPassword.value === "" ){
        cr_message.textContent = "Vui lòng nhập đầy đủ thông tin bắt buộc";
        cr_message.style.display = "block";
        cr_message.style.color = "red";
        cr_message.classList = "text-center mb-2";
        return;
      }
        
     
      const postData = {
        UserName: cr_username.value,
        PasswordHash: cr_password.value,
        Email: cr_email.value
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
                cr_message.textContent = "Thêm người dùng thành công";
                cr_message.style.color = "green";
                cr_message.classList = "text-center mb-2";
                window.location.reload();
              } else {
                cr_message.textContent = "Người dùng này đã tồn tại";
                cr_message.style.display = "block";
                cr_message.style.color = "red";
                cr_message.classList = "text-center mb-2";
              }
          },
          error: function(response) 
          {
              //if fails   
              //console.log(response);
              cr_message.textContent = "Có lỗi xảy ra trong quá trình đăng ký";
              cr_message.style.display = "block";
              cr_message.style.color = "red";
              cr_message.classList = "text-center mb-2";
          }
      });
  
    });