const editable_items = Array.from(['i_title', 'i_category', 'i_thumbnail', 'i_content', 'i_upload_image', 'update-btn', 'cancel-btn'])
const alertDiv = $('#alert-div').addClass('alert-warning').html('Reloading Page!');

// Chỉnh Sửa
document.getElementById('edit-btn').addEventListener('click', (event) => {
    editable_items.forEach(item => {
        $('#' + item).removeAttr('disabled').removeAttr('readonly')
    })

    $('#edit-btn').attr('disabled', true)
})

// Cập Nhật
document.getElementById('update-btn').addEventListener('click', (event) => {
    event.preventDefault();

    const postData = {
        Title: $('#i_title').val(),
        // AdminID: $('#i_publisher').val(),
        // Category: $('#i_category').val(),
        Content: CKEDITOR.instances.i_content.getData(),
        ImageUrl: $('#i_thumbnail').val()
    };

    var file = document.getElementById("i_upload_image").value;


    if (file != ''){
        // Request to server to log-in passing the User information (userObj)
        var formURL = '/admin/post/upload?PostID=' + $('#i_post_id').val();
        // var formURL = 'http://api.veneris.bitiland.com/api/<%= user.ClientID %>'


        var idxDot = file.lastIndexOf(".") + 1;
        var extFile = file.substr(idxDot, file.length).toLowerCase();

        if (extFile == "jpg") {
            extFile = "jpeg";
        }

        postData.ImageUrl = "/admin/uploads/posts/" + $('#i_post_id').val() + "." + extFile;

        var file_data = $('#i_upload_image').prop('files')[0];   
        var form_data = new FormData(); 

        form_data.append('photo', file_data);

        console.log(form_data);
        
        $.ajax(
        {
            url : formURL,
            type: "POST",
            contentType: false,
            crossDomain: true,
            data : form_data,
            cache:false,
            contentType: false,
            processData: false,
            success:function(response) 
            {
                //data: return data from server
                console.log(response.message);
                //alert("Cập nhật ảnh bìa thành công");
                
                //ld_message.textContent = "Cập nhật thành công";
                //ld_message.style.color = "green";
                //ld_message.classList = "text-center mb-2";
                //window.location.reload();
            },
            error: function(response) 
            {
                console.log(response.message);
                //alert("Cập nhật ảnh bìa thất bại");
            }
        });
    }

    console.log(postData);
    
    $.ajax({
        type: 'PUT',
        // url: 'http://api.veneris.bitiland.com/api/post/' + $('#i_post_id').val(),
        url: '/admin/post/' + $('#i_post_id').val(),
        contentType: 'application/json',
        crossDomain: true,
        data: JSON.stringify(postData),
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("mylawyer"));
        // },
        success: function (responseData) {
            // alert('Cập nhật thành công');
            console.log(responseData);
            window.location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
    
})

// Hủy
document.getElementById('cancel-btn').addEventListener('click', (event) => {
    alertDiv.show()

    // don't cache ajax or content won't be fresh
    $.ajaxSetup ({
        cache: false
    });
    $.ajax({
        type: 'GET',
        url: 'http://api.veneris.bitiland.com/api/post/' + $('#i_post_id').val(),
        success: function(postData) {
            $('#i_title').val(postData.Title);
            $('#i_publisher').val(postData.AdminID);
            $('#i_category').val(postData.Category);
            $('#i_thumbnail').val(postData.ImageUrl);
            $('#i_thumbnail_preview').attr('src', postData.ImageUrl);
            $('#i_content').val(postData.Content.toString().split('<br>').join('\n'));

            alertDiv.hide()
        },
        error: function (err) {
            alert('Error occured when reloading page.')
            console.log(err)
        }
    })
})

// Trở Về
document.getElementById('return-btn').addEventListener('click', (event) => {
    window.history.back();
})

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }