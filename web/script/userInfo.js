let account = window.location.toString().split('?')[1];
let userInfoLink = document.getElementById("changePassword");
userInfoLink.href = userInfoLink.href + "?" + account;
let deleteAccount = document.getElementById("deleteAccount");
deleteAccount = deleteAccount + "?" + account;