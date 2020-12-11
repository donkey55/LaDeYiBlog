function query() {
    var url = "main.html";
    /*window.open("user.html","_self");*/
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
                $.cookie("account", $("#login_field").val(), { expires: 7, path: '/', secure: false});
                //alert($.cookie("account") + "1");
                window.open(url, "_self");
            } else {
                alert("用户名或密码未填写或错误");
                location.reload();
            }
        }
    });
}