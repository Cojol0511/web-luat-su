var parentChk = document.querySelector('input[type="checkbox"]#parent');
var childrenChk = document.querySelectorAll('input[type="checkbox"]#child');

function toggleCheckbox() {
    childrenChk.forEach(chk => chk.checked = parentChk.checked);
}

function detectCheckedAll() {
    parentChk.checked = Array.from(childrenChk).filter(chk => chk.checked).length == childrenChk.length;
}

let titleTrNode = document.querySelector("tr#lawyer-info-title");
let trList = Array.from(document.querySelectorAll("tr#lawyer-info"));
function sort(itemId) {
    Array.from(document.querySelectorAll("tr#lawyer-info")).forEach(node => node.remove());

    trList.reverse();
    trList.forEach(tr => {titleTrNode.parentNode.appendChild(tr)});
}