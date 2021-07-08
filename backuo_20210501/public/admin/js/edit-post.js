const editable_items = Array.from(['i_title', 'i_category', 'i_thumbnail', 'i_content', 'update-btn', 'cancel-btn'])
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
            alert('Cập nhật thành công');
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