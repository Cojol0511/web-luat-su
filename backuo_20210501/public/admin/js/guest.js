var parentChk = document.querySelector('input[type="checkbox"]#parent');
var childrenChk = document.querySelectorAll('input[type="checkbox"]#child');
const editableDivId = ["#ten-nguoi-dung", "#so-dien-thoai", "#hang", "#dia-chi"];

function toggleCheckbox() {
    childrenChk.forEach(chk => chk.checked = parentChk.checked);
}

function detectCheckedAll() {
    parentChk.checked = Array.from(childrenChk).filter(chk => chk.checked).length == childrenChk.length;
}

var doc = new DOMParser();
let titleTrNode = document.querySelector("tr#guest-info-title");
// save all td of guest info
var trList = Array.from(document.querySelectorAll("tr#guest-info"));
let guestNameTrList = [];
// save by guest's name
trList.forEach(node => {
    guestNameTrList.push({
        "guestName": node.querySelector("td#guest-name").innerText,
        "node": node
    });
});

// save by lawyer's name
/*
let lawyerNameTrList = [];
trList.forEach(node => {
    lawyerNameTrList.push({
        "lawyerName": node.querySelector("td#lawyer-name").innerText,
        "node": node
    });
});
*/

function edit() {
    editableDivId.forEach(id => {
        div = document.querySelector(id);
        if(div) {
            div.removeAttribute("readonly");
        }
    });
}

function sort(itemId) {
    Array.from(document.querySelectorAll("tr#guest-info")).forEach(node => node.remove());

    if(itemId == "guest-name") {
        guestNameTrList = guestNameTrList.reverse();
        guestNameTrList.forEach(tr => {
            titleTrNode.parentNode.appendChild(tr.node);
        });
    }
    else if(itemId == "lawyer-name") {
        lawyerNameTrList = lawyerNameTrList.reverse();
        lawyerNameTrList.forEach(tr => {
            titleTrNode.parentNode.appendChild(tr.node);
        });
    }
}