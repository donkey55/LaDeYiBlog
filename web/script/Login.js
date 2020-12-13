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
                if ($("#login_field").val() == "admin") {
                    window.open("admin.html", "_self");
                } else {
                    window.open(url, "_self");
                }

            } else {
                alert("用户名或密码未填写或错误");
                location.reload();
            }
        }
    });
}

function login(){
    console.log(event.keyCode)
    // 13为回车键
    if (event.keyCode==13){
        // 调用登陆按钮或者登陆方法
        query();
    }
}