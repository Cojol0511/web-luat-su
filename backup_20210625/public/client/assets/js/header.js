document.addEventListener("DOMContentLoaded", function(event) {

    document.getElementById('search-lawyer-btn') .addEventListener('click', async (event) => {
        event.preventDefault();

        const searchName = $('#search-lawyer-name').val();
        if(!searchName) {

            alert('Vui lòng nhập thông tin cần tìm!');

        } else {

            console.log(encodeURI("/lawyer/searchByName/" + searchName));

            const result = await fetch(encodeURI("/lawyer/searchByName/" + searchName), {
                method: "GET",
                headers: {
                    // "Content-Type": "application/json"
                }
            })
            .then(data => {
                if(data.status == 500) {
                    alert('Không tìm thấy Luật Sư!')
                } else {
                    // Nối Id của luật sư bằng dấu &
                    //console.log(data);
                    window.location.href = encodeURI('/lawyerList?NameRex=' + searchName);
                }
            })
            .catch(err => {
                console.log(err)
                alert('Có lỗi xảy ra trong quá trình tìm kiểm!')
            });
        }
    })

});

