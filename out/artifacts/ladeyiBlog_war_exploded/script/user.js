var blogCount = 0;
var blogNum = 0;
var blogList;
var pageIndex = 1;
var pageNum;

$(function () {
    if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    }
    document.getElementById("username").innerHTML=$.cookie("account")
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowBlogInfoServlet",
        data: {
            "userName": $.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            //保存得到的文章
            blogList = data;
            //显示文章
            for (let index = 0; index < 5 && blogCount < blogList.length; index++, blogCount++, blogNum++) {
                const element = blogList[blogCount];
                let tableElement = document.getElementById("tableElement" + String(index + 1));
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let aLi1 = document.createElement("a");
                let aLi2 = document.createElement("a");
                td1.innerHTML = String(blogCount + 1);
                aLi1.innerHTML = element.title;
                aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
                aLi1.setAttribute("target", "_blank");
                aLi2.setAttribute("href","#");
                aLi2.setAttribute("onclick","return confirm('确定要删除该文章吗？三思啊! 删了可就没了！')");
                aLi2.setAttribute("class", "ui mini red basic button");
                aLi2.innerHTML = "删除"
                tableElement.appendChild(td1);
                td2.appendChild(aLi1);
                tableElement.appendChild(td2);
                td3.appendChild(aLi2);
                tableElement.appendChild(td3);
            }
            if(blogList.length == 0){
                pageNum = 1;
            }else{
                pageNum = Math.ceil(blogList.length / 5);
            }
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("blogNum").innerHTML = String(blogList.length);
        },
        error:function(){
            alert("error");
        }
    });
});

function gotoLogin() {
    $.removeCookie("account",{ path: '/'});
    window.location.href="../HTML/login.html";
}

function pageDown() {
   if(blogCount < blogList.length){
       blogNum = 0;
       //清空子元素
       $("#tableElement1").empty();
       $("#tableElement2").empty();
       $("#tableElement3").empty();
       $("#tableElement4").empty();
       $("#tableElement5").empty();
       //显示文章
       for (let index = 0; index < 5 && blogCount < blogList.length; index++, blogCount++, blogNum++) {
           const element = blogList[blogCount];
           let tableElement = document.getElementById("tableElement" + String(index + 1));
           let td1 = document.createElement("td");
           let td2 = document.createElement("td");
           let td3 = document.createElement("td");
           let aLi1 = document.createElement("a");
           let aLi2 = document.createElement("a");
           td1.innerHTML = String(blogCount + 1);
           aLi1.innerHTML = element.title;
           aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
           aLi1.setAttribute("target", "_blank");
           aLi2.setAttribute("href","#");
           aLi2.setAttribute("onclick","return confirm('确定要删除该文章吗？三思啊! 删了可就没了！')");
           aLi2.setAttribute("class", "ui mini red basic button");
           aLi2.innerHTML = "删除"
           tableElement.appendChild(td1);
           td2.appendChild(aLi1);
           tableElement.appendChild(td2);
           td3.appendChild(aLi2);
           tableElement.appendChild(td3);
       }
       pageIndex++;
       document.getElementById("pageIndex").innerHTML = String(pageIndex);
   }
}

function pageUp() {
    if(blogCount > blogNum){
        blogCount -= (blogNum + 5);
        blogNum = 0;
        //清空子元素
        $("#tableElement1").empty();
        $("#tableElement2").empty();
        $("#tableElement3").empty();
        $("#tableElement4").empty();
        $("#tableElement5").empty();
        //显示文章
        for (let index = 0; index < 5 && blogCount < blogList.length; index++, blogCount++, blogNum++) {
            const element = blogList[blogCount];
            let tableElement = document.getElementById("tableElement" + String(index + 1));
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let aLi1 = document.createElement("a");
            let aLi2 = document.createElement("a");
            td1.innerHTML = String(blogCount + 1);
            aLi1.innerHTML = element.title;
            aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
            aLi1.setAttribute("target", "_blank");
            aLi2.setAttribute("href","#");
            aLi2.setAttribute("onclick","return confirm('确定要删除该文章吗？三思啊! 删了可就没了！')");
            aLi2.setAttribute("class", "ui mini red basic button");
            aLi2.innerHTML = "删除"
            tableElement.appendChild(td1);
            td2.appendChild(aLi1);
            tableElement.appendChild(td2);
            td3.appendChild(aLi2);
            tableElement.appendChild(td3);
        }
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function searchUserBlog() {
    let keywords = document.getElementById("keywords").value
    $.cookie("keywords", keywords, { expires: 7, path: '/', secure: false});
    let url = "searchUserBlog.html?" + $.cookie("account");
    window.open(url, "_self");
}