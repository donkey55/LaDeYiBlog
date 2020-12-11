function register() {
    var userName;
    userName= $("#userName").val();
    var passWord;
    passWord= $("#password_field").val();
    if (userName.length >= 64) {
        alert("您的用户名长度需要小于64个字符");
    } else if (passWord.length < 6 || passWord.length >= 64){
        alert("您的密码长度需要在6-64个字符之间");
    } else {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/RegisterServlet",
            data: {
                "userName": userName,
                "password": passWord,
            },
            success: function (data) {
                if (data.ret === "1") {
                    alert("您已经注册成功，点击确定进入登录界面进行登录");
                    window.location.href="../HTML/login.html";
                } else {
                    alert("用户名已经存在，请选择其他用户名");
                    location.reload()
                }
            }
        });
    }
}