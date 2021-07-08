const errClass = { className: "alert-warning", message: "Phát sinh lỗi khi xóa bài viết!" };
const infoClass = { className: "alert-info", message: "Đã xóa bài viết thành công!"};
const alertDiv = $('#alert-div')
    // .addClass('alert-warning')
    // .html('Reloading Page!');

$(document).ready(() => {
    // Nút Xóa Chính
    // document.getElementsByName('delete-btn').forEach(node => (node) => {
    //     node.addEventListener('click', (event) => {
    //         event.preventDefault();
    //         alert("main delete btn")
    //     });
    // });

    // Nút Xác Nhận Xóa
    document.getElementsByName('delete-post-btn').forEach(node => handleClickEvent(node));
});

function handleClickEvent(node) {
    node.addEventListener('click', (event) => {
        event.preventDefault();
        
        const postID = $(node).attr('id');
        alert('Delete: ' + postID)

        $.ajax({
            url: $(node).attr('formaction'),// '/admin/posts/' + postID,
            type: 'DELETE',
            contentType: 'application/json',
            headers: { "Authorization": getCookie("mylawyer") },
            success: function (responseData, textStatus, request) {
                alertDiv
                    .attr('hidden', false)
                    .addClass(infoClass.className)
                    .html(infoClass.message)
                    .delay(2000).fadeOut('slow');

                $('#post-info-' + postID).remove();
            },
            error: function (err) {
                console.log(err);
                alertDiv
                .attr('hidden', false)
                .addClass(errClass.className)
                .html(errClass.message)
                .delay(1500).fadeOut('slow');
                    
                // $('html, body').animate({
                //     scrollTop: alertDiv.offset().top
                // });
            }
        });
    });
}