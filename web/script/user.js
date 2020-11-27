var blogCount = 0;
var blogNum = 0;
var blogList;
var pageIndex = 1;
var pageNum;
var blogTotal = 0;

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
            pageNum = Math.ceil(blogList.length / 5);
            blogTotal = blogList.length;
            //显示文章
            for (let index = 0; index < 5 && blogCount < blogTotal; index++, blogCount++, blogNum++) {
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
                aLi2.setAttribute("id", element.blogId);
                aLi2.setAttribute("href","#");
                aLi2.setAttribute("onclick","deleteBlog(this)");
                aLi2.setAttribute("class", "ui mini red basic button");
                aLi2.innerHTML = "删除"
                tableElement.appendChild(td1);
                td2.appendChild(aLi1);
                tableElement.appendChild(td2);
                td3.appendChild(aLi2);
                tableElement.appendChild(td3);
            }
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("blogNum").innerHTML = String(blogTotal);
        },
        error:function(){
            console.log("error");
            pageNum = 1;
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("blogNum").innerHTML = String(blogTotal);
        }
    });
});

function gotoLogin() {
    $.removeCookie("account",{ path: '/'});
    window.location.href="../HTML/login.html";
}

function pageDown() {
   if(blogCount < blogTotal){
       blogNum = 0;
       //清空子元素
       $("#tableElement1").empty();
       $("#tableElement2").empty();
       $("#tableElement3").empty();
       $("#tableElement4").empty();
       $("#tableElement5").empty();
       //显示文章
       for (let index = 0; index < 5 && blogCount < blogTotal; index++, blogCount++, blogNum++) {
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
           aLi2.setAttribute("id", element.blogId);
           aLi2.setAttribute("href","#");
           aLi2.setAttribute("onclick","deleteBlog(this)");
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
        for (let index = 0; index < 5 && blogCount < blogTotal; index++, blogCount++, blogNum++) {
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
            aLi2.setAttribute("id", element.blogId);
            aLi2.setAttribute("href","#");
            aLi2.setAttribute("onclick","deleteBlog(this)");
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

function deleteBlog(obj) {
    var id = obj.id;
    if (confirm("您真的准备删除此博客吗？")) {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/DeleteBlogServlet",
            data: {
                blogId: id
            },
            dataType: "json",
            success: function (data) {
                if(data.ret > 0){
                    alert("删除成功");
                    location.reload();
                }else{
                    alert("删除失败");
                }
            },
            error: function () {
                alert("error");
            }
        });
    }
}

function writeBlog() {
    window.open("writeBlog.html?" + $.cookie("account"), "_blank");
}