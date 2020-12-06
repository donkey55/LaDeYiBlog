let userName = window.location.split("?")[1];
let blogList;
let blogCount = 0;
let pageNum = 0;
let pageIndex = 1;
let blogTotal = 0;
$(function () {

    blogCount = 0;
    pageIndex = 1;
    blogNum = 0;
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowMyBlogInfoServlet",
        data: {
            "userName": userName
        },
        dataType: "json",
        success: function (data) {
            //保存得到的文章
            blogList = data;
            blogTotal = blogList.length;
            pageNum = Math.ceil(blogTotal/5);
            showBLog();
            updatePageNum();
        },
        error:function(){
            console.log("error");
            pageNum = 1;
            updatePageNum();
        }
    });

    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowUserInfoServlet",
        data: {
            "userName": id
        },
        dataType: "json",
        success: function (data) {
            $("#user h1").innerText = userName;
            setHtml("selfIntroduction", data.selfIntroduction);
        }, error() {
            alert("error");
        }
    });
});

function pageDown() {
    if(blogCount < blogTotal) {
        empty();
        //显示文章
        showBLog();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    if(blogCount > blogNum){
        blogCount -= (blogNum + 5);
        empty();
        showBLog();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function setHtml(id, value) {
    $("#"+id).html(value);
}

function showBLog() {
    for (let index = 1; index <= 5 && blogCount < blogTotal; index++, blogCount++, blogNum++) {
        const element = blogList[blogCount];
        setHtml("blog" + index + "Title", element.title);
        setHtml("blog" + index + "Summary", element.blog);
        let aLi1 = document.createElement("a");
        aLi1.setAttribute("id", element.blogId);
        aLi1.setAttribute("class", "btn btn-primary");
        aLi1.setAttribute("href", "blog.html?" + element.blogId);
        aLi1.innerHTML = "浏览";
        $("#blog" + index + "Href").append(aLi1);
    }
}

function empty() {
    $(".needEmpty").empty();
}

function updatePageNum() {
    document.getElementById("pageIndex").innerHTML = String(pageIndex);
    document.getElementById("pageNum").innerHTML = String(pageNum);
    document.getElementById("blogNum").innerHTML = String(blogTotal);
}


