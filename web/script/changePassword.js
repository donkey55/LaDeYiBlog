var account = window.location.toString().split('?')[1];
var deleteAccount = document.getElementById("deleteAccount");
deleteAccount = deleteAccount + "?" + account;
var userInfoLink = document.getElementById("changePassword");
userInfoLink.href = userInfoLink + "?" + account;

function change() {
    if ($("#newPassword").val() !== $("#newPassword1").val()) {
        alert("两次输入的密码需要一致");
    } else if ($("#newPassword").val().length < 6 || $("#newPassword").val().length > 64) {
        alert("您的新密码长度需要在6-64个字符之间");
    } else {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/ChangePasswordServlet",
            data: {
                "userName": account,
                "oldPassword": $("#oldPassword").val(),
                "newPassword": $("#newPassword").val()
            },
            success: function (data) {
                if (data.ret === "1") {
                    alert("更改成功");
                } else {
                    alert("您的旧密码有误，请重试");
                }
            }
        });
    }
}