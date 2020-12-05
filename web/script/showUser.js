$(function () {
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
            pageNum = Math.ceil(blogList.length / 5);
            blogTotal = blogList.length;
        },
        error:function(){
            updatePageNum();
        }
    });
});