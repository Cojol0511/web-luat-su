const number_span_list = Array.from(document.querySelector("#number-list").getElementsByTagName("span"));
var spans_left = Array.from(document.querySelector("div.navbar-collapse").querySelector(".navbar-left").getElementsByTagName("span"));

spans_left.map(span => {
    span.innerHTML = number_span_list.find(num => num.id == span.id).textContent;
    window.sessionStorage.setItem(span.id, span.textContent);
});
