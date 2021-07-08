  const catr_domain = document.querySelector("#catr_domain");

  $("#catr_registerForm").submit(function(event) {

    event.preventDefault(); //STOP default action

    if (catr_domain.value === "" ){
      catr_message.textContent = "Vui lòng nhập đầy đủ thông tin bắt buộc";
      catr_message.style.display = "block";
      catr_message.style.color = "red";
      catr_message.classList = "text-center mb-2";
      return;
    }
      
    const postData = {
      Name: catr_domain.value,
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
              catr_message.textContent = "Thêm danh mục thành công";
              catr_message.style.color = "green";
              catr_message.classList = "text-center mb-2";
              window.location.href = "/admin/domains";
            } else {
              catr_message.textContent = "Danh mục này đã tồn tại";
              catr_message.style.display = "block";
              catr_message.style.color = "red";
              catr_message.classList = "text-center mb-2";
            }
        },
        error: function(response) 
        {
            //if fails   
            console.log(response);
            catr_message.textContent = "Có lỗi xảy ra trong quá trình thêm danh mục";
            catr_message.style.display = "block";
            catr_message.style.color = "red";
            catr_message.classList = "text-center mb-2";
        }
    });

  });