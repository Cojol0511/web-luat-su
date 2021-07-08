document.addEventListener("DOMContentLoaded", function () {
    // 1. Activate current selected item: Dash Board, Pages, Posts, Users
    const currentUrl = window.location.href.toString().split(window.location.host).toString().split('/');
    let currentPage = currentUrl[4];

    var item = '';
    // index
    if (currentPage === '') {
        item = '#index';
    }
    // others: pages, posts, users, lawyers
    else {
        item = '#' + currentPage;
    }

    const selectedClassname = " active main-color-bg ";
    // Dash Board of naviagtion bar
    document.querySelector('.navbar-left').querySelector(item).className += selectedClassname;

    // Sub Dash Board element of document
    document.querySelector('#dash-board').querySelector(item).className += selectedClassname;

    // 2. Print number of pages, posts, guests, lawyers
    Array.from(document.querySelector("div.navbar-collapse").querySelector(".navbar-left").getElementsByTagName("span"))
    .forEach(span => {
        document.querySelector(".list-group#dash-board").querySelector(".badge#" + span.id).innerHTML =
            window.sessionStorage.getItem(span.id);
    });
});