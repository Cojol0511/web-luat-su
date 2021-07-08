let selected_id = "";
let selected_name = "";

// Chỉnh Sửa
function showInfo(id, name) {
    selected_id = id;
    selected_name = name;

    $('#selected-id').val(id);
    $('#selected-name').val(name);
    $('#selected-name').attr('readonly', false);
    $('#submit-btn').attr('disabled', false);
    $('#cancel-btn').attr('disabled', false);
}

// Cập Nhật
function update() {
    const areaName = $('#selected-name').val();
    if(areaName === '') {
        alert("Nhập Tên Lĩnh Vực!");
        return;
    }

    const areaId = $('#selected-id').val();
    $.ajax({
        url: '/admin/update-practice-area',
        type: 'PUT',
        contentType: 'application/json',
        crossDomain: true,
        data: JSON.stringify({
            DomainID: areaId,
            Name: areaName
        }),
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (responseData) {
            alert('Cập nhật thành công');
            document.getElementById('domain-id-' + areaId).innerText = areaName;
            // console.log(responseData);
        },
        error: function (err) {
            alert(err.message)
            console.log(err);
        }
    });
}

// Hủy
function reset() {
    $('#selected-id').val(selected_id);
    $('#selected-name').val(selected_name);
    $('#selected-name').attr('readonly', true);
    $('#submit-btn').attr('disabled', true);
    $('#cancel-btn').attr('disabled', true);
}