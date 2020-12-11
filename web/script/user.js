var blogCount = 0;
var blogNum = 0;
var blogList;
var pageIndex = 1;
var pageNum = 1;
var blogTotal = 0;

$(function () {
    /* if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    } */
    blogCount = 0;
    pageIndex = 1;
    blogNum = 0;
    document.getElementById("username").innerHTML=$.cookie("account");
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowMyBlogInfoServlet",
        data: {
            "userName": $.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            //保存得到的文章
            blogList = data;
            if(blogList.length > 0){
                pageNum = Math.ceil(blogList.length / 5);
            }
            blogTotal = blogList.length;
            //显示文章
            addTd();
            updatePageNum();
        },
        error:function(){
            console.log("error");
            pageNum = 1;
            updatePageNum();
        }
    });
});

function searchUserBlog() {
    let keyword = document.getElementById("keywords").value;
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/SearchBlogServlet",
        data: {
            "keyword": keyword
        },
        dataType: "json",
        success: function (data) {
            //保存得到的文章
            blogList = data;
            console.log(blogList);
            blogCount = 0;
            pageIndex = 1;
            //显示文章
            for(let i = 0; i < blogList.length; i++){
                if(blogList[i].userName !== $.cookie("account")){
                    blogList.splice(i, 1);
                }
            }
            //console.log(SBlogList);
            if(blogList.length > 0){
                pageNum = Math.ceil(blogList.length / 5);
            }else{
                pageNum = 1;
            }
            blogTotal = blogList.length;
            empty();
            addTd();
            updatePageNum();
        },
        error:function(){
            console.log("error");
            pageNum = 1;
            updatePageNum();
        }
    });
}

function pageDown() {
    if(blogCount < blogTotal) {
        empty();
        //显示文章
        addTd();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    if(blogCount > blogNum){
        blogCount -= (blogNum + 5);
        empty();
        addTd();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}



function deleteBlog(obj) {
    var id = obj.id;
    if (confirm("您真的准备删除此博客吗？")) {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/DeleteBlogServlet",
            data: {
                "blogId" : id
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

function changeBlog(obj) {
    let id = obj.id;
    window.open("changeBlog.html?" + id + "?" + $.cookie("account"));
}

function writeBlog() {
    window.open("writeBlog.html?" + $.cookie("account"), "_blank");
}

function addTd() {
    for (let index = 0; index < 5 && blogCount < blogTotal; index++, blogCount++, blogNum++) {
        const element = blogList[blogCount];
        let tableElement = document.getElementById("tableElement" + String(index + 1));
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let aLi1 = document.createElement("a");
        let aLi2 = document.createElement("a");
        let aLi3 = document.createElement("a");

        td1.innerHTML = String(blogCount + 1);
        aLi1.innerHTML = element.title;
        aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
        aLi1.setAttribute("target", "_blank");

        aLi2.setAttribute("id", element.blogId);
        aLi2.setAttribute("href","#");
        aLi2.setAttribute("onclick","deleteBlog(this)");
        aLi2.setAttribute("class", "ui mini red basic button");

        aLi3.setAttribute("id", element.blogId);
        aLi3.setAttribute("href","#");
        aLi3.setAttribute("onclick","changeBlog(this)");
        aLi3.setAttribute("class", "ui mini green basic button");
        aLi2.innerHTML = "删除";
        aLi3.innerHTML = "修改";
        tableElement.appendChild(td1);
        td2.appendChild(aLi1);
        tableElement.appendChild(td2);
        td4.appendChild(aLi2);
        td3.appendChild(aLi3);
        tableElement.appendChild(td3);
        tableElement.appendChild(td4);
    }
}

function empty() {
    blogNum = 0;
    //清空子元素
    $("#tableElement1").empty();
    $("#tableElement2").empty();
    $("#tableElement3").empty();
    $("#tableElement4").empty();
    $("#tableElement5").empty();
}

function updatePageNum() {
    document.getElementById("pageIndex").innerHTML = String(pageIndex);
    document.getElementById("pageNum").innerHTML = String(pageNum);
    document.getElementById("blogNum").innerHTML = String(blogTotal);
}