let blogList;
let blogTotal;
let blogCount = 0;
let blogNum = 0;
let pageIndex = 1;
let pageNum = 1;

$(function () {
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
                pageNum = Math.ceil(blogTotal / 15);
            }
            showBlog();
            showPage();
            updatePageNum();
        }, error: function () {
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
            pageNum = Math.ceil(blogList.length / 15);
            blogTotal = blogList.length;
            empty();
            showBlog();
            showPage();
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
        showBlog();
        showPage();
        pageIndex++;
        updatePageNum()
    }
}

function pageUp() {
    if(blogCount > blogNum){
        blogCount -= (blogNum + 15);
        empty();
        showBlog();
        showPage();
        pageIndex--;
        updatePageNum()
    }
}

function updatePageNum() {
    document.getElementById("pageIndex").innerHTML = String(pageIndex);
    document.getElementById("pageNum").innerHTML = String(pageNum);
    document.getElementById("blogTotal").innerHTML = String(blogTotal);
}

function showBlog() {
    for (let index  = 0; index < 15 && blogCount < blogTotal; index++, blogCount++, blogNum++) {
        const element = blogList[blogCount];

        let div1 = create("div");
        div1.setAttribute("class", "caption");
       
        let h1 = create("h1");
        h1.innerHTML = element.title;

        let span = create("span");
        span.setAttribute("class", "postMeta");
        let i1 = create("i");
        i1.setAttribute("class", "glyphicon glyphicon-user");
        i1.innerHTML = "&ensp;作者:" + element.userName +  "&ensp;";
        let i2 = create("i");
        i2.setAttribute("class", "glyphicon glyphicon-time");
        i2.innerHTML = "&ensp;发表于:" + element.time +  "&ensp;";
        let i3 = create("i");
        i3.setAttribute("class", "glyphicon glyphicon-star");
        i3.innerHTML = "&ensp;收藏:" + element.preferenceCount + "&ensp;";
        let i4 = create("i");
        i4.setAttribute("class", "glyphicon glyphicon-comment");
        i4.innerHTML = "&ensp;评论:" + element.commentCount + "&ensp;";
        let br1 = create("br")
        let br2 = create("br")
        span.appendChild(i1);
        span.appendChild(br1);
        span.appendChild(i2);
        span.appendChild(br2)
        span.appendChild(i3);
        span.appendChild(i4);

        let p1 = create("p");
        p1.innerHTML = "<br><span style='font-size: 1.2em ;font-weight: bold'>摘要：</span>" + element.summary;
        let p2 = create("p");
        let p2A = create("a");
        p2A.innerHTML = "查看全文";
        p2A.setAttribute("class", "btn btn-link");
        p2A.setAttribute("href", 'blog.html?' + element.blogId + '?' + $.cookie("account"));
        p2A.setAttribute("target", "_blank");
        p2A.setAttribute("style", "color : white");
        p2.appendChild(p2A);
        div1.appendChild(h1);
        div1.appendChild(span);
        div1.appendChild(p1);
        div1.appendChild(p2);
        $("#blogList").append(div1);
        $("#blogList").append(create("hr"));
    }
}


function empty() {
    blogNum = 0
    $("#blogList").empty();
}

function create(name) {
    return document.createElement(name);
}

function showPage() {
    let div = create("div");
    div.setAttribute("class", "caption");
    div.innerHTML = "<tr>\n" +
    "<th colspan=\"7\">\n" + 
    "<div class=\"ui inverted divided stackable grid\">\n" + 
    "<div class=\"three wide column\" align=\"center\">\n" +
    "<i class=\"chevron left icon\" onclick=\"pageUp()\"></i>\n" +
    " </div>\n" +
    "<div class=\"ten wide column\" align=\"center\">\n" + 
    "<p>第 <span id=\"pageIndex\"></span> 页，共 <span id=\"pageNum\"></span> 页，有 <span id=\"blogTotal\"></span> 篇博客</p>\n" +
    "</div>\n" +
    "<div class=\"three wide column\" align=\"center\">\n" +
    "<i class=\"chevron right icon\" onclick=\"pageDown()\"></i>\n" +
    "</div>\n" +
    "</div>\n" +
    "</th>\n" +
    "</tr>\n";
    $("#blogList").append(div);
}

