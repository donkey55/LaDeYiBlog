var account = window.location.toString().split("?")[1];
var userInfoLink = document.getElementById("changePassword");
userInfoLink.href = userInfoLink.href + "?" + account;
var deleteAccountId = document.getElementById("deleteAccount");
deleteAccountId.href = deleteAccountId.href + "?" + account;

function deleteAccount() {
    if (confirm("您真的要删除您的账号吗？所有与您有关的信息都将被删除，请您慎重选择")) {
        $.ajax({
            type: "post",
            url: "",
            data: {
                "userName": $("#userName").val(),
                "password": $("#password").val()
            },
            success: function (data) {
                if (data.ret === "1") {
                    alert("您的账号已经被删除");
                    window.open("../index.html","_self");
                } else {
                    alert("您的账号或密码有误，请重试");
                }
            }
        });
    }

}