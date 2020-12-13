var blogCount = 0;
var blogNum = 0;
var blogList;
var pageIndex = 1;
var pageNum = 1;
var blogTotal = 0;
let singlePageNum = 5;
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
        url:"../com/ladeyi/test/ShowAllBlogServlet",
        data: {
        },
        datatype: "json",
        success: function (data) {
            blogList = data;
            blogTotal = data.length;
            if(blogList.length > 0){
                pageNum = Math.ceil(blogTotal / singlePageNum);
            }
            addTd();
            updatePageNum();
        }, error: function () {
            pageNum = 1;
            updatePageNum();
        }
    });
});

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
            //console.log(SBlogList);
            if(blogList.length > 0){
                pageNum = Math.ceil(blogList.length / singlePageNum);
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
        blogCount -= (blogNum + singlePageNum);
        empty();
        addTd();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}






function addTd() {
    for (let index = 0; index < singlePageNum && blogCount < blogTotal; index++, blogCount++, blogNum++) {
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

        aLi2.innerHTML = "删除";
        tableElement.appendChild(td1);
        td2.appendChild(aLi1);
        tableElement.appendChild(td2);
        td3.appendChild(aLi2);
        tableElement.appendChild(td3);
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