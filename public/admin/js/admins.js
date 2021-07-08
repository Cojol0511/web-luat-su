const chgBtnId = "#chg-pass-btn";
const chgFormId = "#chg-pass-form";
const inOldPassId = "#ad-old-pass";
const inNewPassId = "#ad-new-pass";
const inConfirmPassId = "#ad-confirm-pass";

$(document).ready(() => {
    $(chgBtnId).on('click', (event) => {
        if($(chgFormId).is(':hidden')) {
            $(chgFormId).show();
            $(chgBtnId).html('Hủy').attr('class', 'btn btn-md btn-danger');
        } else {
            $(chgFormId).hide();
            $(chgBtnId).html('Đổi Mật Khẩu').attr('class', 'btn btn-md btn-primary');
            $(inOldPassId).val('');
            $(inNewPassId).val('');
            $(inConfirmPassId).val('');
        }
    });
})