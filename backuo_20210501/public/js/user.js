const userName = document.querySelector(".userName");
const cpw_message = document.querySelector("#cpw_message");
// Get current User and display email information.
// Here you can display any User information coming from the server.
// fetch("/auth/user")
//     .then(response => response.json())
//     .then(data => { userName.textContent = data.email; })
//     .catch(err => console.log(err));

async function chgPw(loggedUserName, oldPsHash, newPsHash) {

    alert(["UserName: " + loggedUserName, "OldPass: "+ oldPsHash, "NewPass: " + newPsHash].join('\n'));

    const updateObj = {
        UserName: loggedUserName,
        PasswordHash: oldPsHash,
        NewPassWordHash: newPsHash
    };

    $.ajax(
    {
        url : "/changePassword",
        type: "POST",
        contentType: 'application/json',
        crossDomain: true,
        data : JSON.stringify(updateObj),
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(response) 
        {
            //data: return data from server
            // alert("The server says: " + response.accessToken);
            if (response.success == 1){
                //console.log(result);
                //console.log(response);
                cpw_message.textContent = "Cập nhật thành công";
                cpw_message.style.color = "green";
                cpw_message.classList = "text-center mb-2";
                logOut();
                //window.location.reload();
            } else {
                cpw_message.textContent = "Có lỗi xảy ra. Vui lòng thử lại.";
                cpw_message.style.display = "block";
                cpw_message.style.color = "red";
                cpw_message.classList = "text-center mb-2";
            }

           
        },
        error: function(response) 
        {
                console.log(response);
                cpw_message.textContent = "Có lỗi xảy ra. Vui lòng thử lại.";
                cpw_message.style.display = "block";
                cpw_message.style.color = "red";
                cpw_message.classList = "text-center mb-2";
            //if fails   
            //alert('it didnt work');   
        }
    });

    /*
    const response = await fetch("/changePassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateObj)
    })
    .then(result => {
        console.log(result);
        console.log(response);
        cpw_message.textContent = "Cập nhật thành công";
        cpw_message.style.color = "green";
        cpw_message.classList = "text-center mb-2";
        logOut();
        //window.location.reload();
    })
    .catch(err => {
        console.log(err);
        cpw_message.textContent = "Có lỗi xảy ra. Vui lòng thử lại.";
        cpw_message.style.display = "block";
        cpw_message.style.color = "red";
        cpw_message.classList = "text-center mb-2";
    });
    // const data = await response.json();
    */
}

$(document).ready(() => {


    document.getElementById('chgPw-btn').addEventListener('click', (event) => {
        event.preventDefault();

        const loggedUserName = $('#user-id').val();
        const oldPs = $('#old-password').val();
        const newPs = $('#new-password').val();
        const confirmPs = $('#confirm-password').val();

        // Kiểm tra giá trị được nhập
        if(oldPs === "" || newPs === "") {
            alert('Chưa nhập mật khẩu!')
            return;
        } else if(confirmPs === '') {
            alert('Chưa nhập mật khẩu xác nhận!')
            return;
        } else if(oldPs == newPs) {
            alert('Mật khẩu cũ và mới trùng nhau!')
            return;
        } else if(newPs != confirmPs) {
            alert('Mật khẩu mới và mật khẩu xác nhận không khớp!')
            return;
        }
        
        chgPw(loggedUserName, oldPs, newPs);
        // axios.post('http://api.venerispro.bitiland.com/api/auth/changepassword', {
        //     UserName: loggedUserName,
        //     PasswordHash: oldPs,
        //     NewPassWordHash: newPs
        // })
    })
})
