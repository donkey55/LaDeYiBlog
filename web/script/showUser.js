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

        }
    });
});

function setHtml(id, value) {
    $("#"+id).html(value);
}

function showBLog() {
    for (let index = 1; index <= 5 && blogCount < blogTotal; index++, blogCount++, blogNum++) {
        const element = blogList[blogCount];
        setHtml("blog" + index + "Title", element.title);
    }
}

