let userName = window.location.href.split("?")[1];
let blogList;
let blogCount = 0;
let pageNum = 0;
let pageIndex = 1;
let blogTotal = 0;
let singlePageNum = 6;
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
        datatype: "json",
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
            "userName": userName
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
        blogCount -= (blogNum + singlePageNum);
        empty();
        showBLog();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function setHtml(obj, value) {
    obj.innerHTML = value;
}

function showBLog() {
    for (let index = 1; index <= singlePageNum && blogCount < blogTotal; index++, blogCount++, blogNum++) {
        const element = blogList[blogCount];
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let h2 = document.createElement("h2");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p2A = document.createElement("a");
        div1.setAttribute("class", "thumbnail");
        div2.setAttribute("class", "caption");

        setHtml(h2, element.title);
        setHtml(p1, element.blog);
        setHtml(p2A, "浏览");
        p2A.setAttribute("class", "btn btn-primary");
        p2A.setAttribute("href", "blog.html?" + element.blogId);
        p2.appendChild(p2A);
        div2.appendChild(h2);
        div2.appendChild(p1);
        div2.appendChild(p2);
        div1.appendChild(div2);
        $("#blog" + index).append(div1);
    }
}

function empty() {
   for (let index = 1; index <= singlePageNum; index++) {
       $("#blog" + index).empty();
   }
}



function updatePageNum() {
    document.getElementById("pageIndex").innerHTML = String(pageIndex);
    document.getElementById("pageNum").innerHTML = String(pageNum);
    document.getElementById("blogTotal").innerHTML = String(blogTotal);
}


function addAttention() {
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/WriteAttentionServlet",
        data: {
            "formUser" : $.cookie("account"),
            "toUser": userName
        },
        datatype: "json",
        success: function(data) {
            if (data.ret === "1" ) {
                alert("关注成功");
            } else {
                alert("关注失败");
            }
        },
    });
}