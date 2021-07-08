document.getElementById("alert-div").style.display = "none";

$(document).on('click', 'form input[id=upload-btn][type=submit]', function (e) {
    var file = document.getElementById("uploaded-photo").value;
    console.log(file)
    if (file == null || file == '') {
        document.getElementById("alert-div").style.display = "inline";
        e.preventDefault();
    } else {
        document.getElementById("alert-div").style.display = "none";
    }
});