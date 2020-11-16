let account;
account = window.location.toString().split("?")[1];
let userInfoLink = document.getElementById("myAccount"); //增加url 账号 可以通过jquery 选择类实现
userInfoLink.href = userInfoLink.href + "?" + account;
let createBlog = document.getElementById("createBlog");
createBlog.href = createBlog.href + "?" + account;
$(function () {
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/LoadBlogInfoServlet",
        data: {
            "userName": account
        },
        dataType: "json",
        success: function (data) {

            /* var array = JSON.parse(data);*/
            console.log(data);
            /*alert(JSON.stringify(array[0]));*/
            let ulList = document.getElementById("blogList");
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let li = document.createElement("li");
                let aLi = document.createElement("a");
                aLi.setAttribute('href', 'blog.html?' + element.blogId + '?' + account);
                aLi.setAttribute('class', 'linkList');
                aLi.setAttribute('id', element.blogId);
                aLi.innerHTML = element.title;
                li.appendChild(aLi);
                ulList.appendChild(li);
            }
        },
        error:function(){
            alert("1");
        }
    });
});
