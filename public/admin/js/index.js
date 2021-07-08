const number_span_list = Array.from(document.querySelector("#number-list").getElementsByTagName("span"));
var spans_left = Array.from(document.querySelector("div.navbar-collapse").querySelector(".navbar-left").getElementsByTagName("span"));

$(document).ready(() => {
    document.getElementById('send-mail-btn').addEventListener('click', sendMail);
});

function sendMail() {
    $.ajax(
        {
            url : '/admin/sendMail',
            type: "POST",
            contentType: 'application/json',
            crossDomain: true,
            data : JSON.stringify({
                sender: 'yuritakayama1993@gmail.com',
                receiver: 'mikhailaleksandrovichsholokhov@gmail.com',
                subject: 'Sending Email using Node.js',
                content: 'That was easy!'
            }),
            success:function(response) 
            {
                console.log(response);
                alert('Gửi thành công!')
            },
            error: function(error) 
            {
                console.log(error);
                alert('Error!')
            }
        });
}

spans_left.map(span => {
    // span.innerHTML = number_span_list.find(num => num.id == span.id).textContent;
    window.sessionStorage.setItem(span.id, span.textContent);
});