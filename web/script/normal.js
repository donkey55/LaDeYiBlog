function gotoLogin() {
    $.removeCookie("account",{ path: '/'});
    window.location.href="../HTML/login.html";
}

$('.ui.dropdown').dropdown({
    on : 'hover'
});