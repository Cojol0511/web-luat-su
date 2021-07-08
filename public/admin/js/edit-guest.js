function show_password() {
    var passwordEle = document.querySelector("input#password-input");
    passwordEle.setAttribute("type", passwordEle.getAttribute("type") == "password" ? "text" : "password");
}