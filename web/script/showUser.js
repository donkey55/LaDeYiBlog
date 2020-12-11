let userName = window.location.href.split("?")[1];
let blogList;
let blogCount = 0;
let pageNum = 1;
let pageIndex = 1;
let blogTotal = 0;
let singlePageNum = 6;
let blogNum = 0;


$(function () {
    document.getElementById("username").innerText = $.cookie("account");
    document.getElementById("topTitle").innerText = userName + "的空间";
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowUserInfoServlet",
        data: {
            "userName": userName
        },
        dataType: "json",
        success: function (data) {
            document.getElementById("account").innerText = userName;
            document.getElementById("selfIntroduction").innerText = data.selfIntroduction;
            document.getElementById("fans").innerText = data.fansCount;
            document.getElementById("attention").innerText = data.attentionCount;
        },
        error() {

        }
    });
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
            if(blogList.length > 0){
                pageNum = Math.ceil(blogTotal / singlePageNum);
            }
            showBLog();
            updatePageNum();
        },
        error: function () {
            console.log("error");
            pageNum = 1;
            updatePageNum();
        }
    });
});

function pageDown() {
    if (blogCount < blogTotal) {
        empty();
        //显示文章
        showBLog();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    //console.log("into")
    if (blogCount > blogNum) {
        //console.log("into2")
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
        setHtml(p1, element.summary);
        setHtml(p2A, "浏览");
        p2A.setAttribute("class", "btn btn-primary");
        p2A.setAttribute("href", "blog.html?" + element.blogId + "?" + $.cookie("account"));
        p2A.setAttribute("target","_blank")
        p2.appendChild(p2A);
        div2.appendChild(h2);
        div2.appendChild(p1);
        div2.appendChild(p2);
        div1.appendChild(div2);
        $("#blog" + index).append(div1);
    }
}

function empty() {
    blogNum = 0;
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
    console.log($.cookie("account"))
    console.log(userName)
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/WriteAttentionServlet",
        data: {
            "fromUserName": $.cookie("account"),
            "toUserName": userName
        },
        datatype: "json",
        success: function (data) {
            if (data.ret === "1") {
                alert("关注成功");
            } else if(data.ret === "2"){
                alert("不能关注自己哦~~");
            }else {
                alert("你已经关注过他了");
            }
        },
    });
}