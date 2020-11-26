function query() {
    var url = "user.html?" + $("#login_field").val();
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/LoginServlet",
        data: {
            "userName": $("#login_field").val(),
            "password": $("#password_field").val()
        },
        dataType: "json",
        success: function (data) {
            if (data.ret === "1") {

                window.open(url, "_self");
            } else {
                alert("您的账号或密码有误，请重试");
            }
        }
    });
}