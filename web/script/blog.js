window.onload = function () {
    var id = window.location.toString().split('?')[1];
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowBlogServlet",
        data: {
            blogId: id
        },
        dataType: "json",
        success: function (data) {
            $("#blog").val(data.ret);
            preview();
        },
        error: function () {
            alert("1");
        }
    });
}

function deleteBlog() {
    var id = window.location.toString().split('?')[1];
    if (confirm("您真的准备删除此博客吗？")) {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/DeleteBlogServlet",
            data: {
                blogId: id
            },
            dataType: "json",
            success: function (data) {
                if (data.ret === "1") {
                    window.open("user.html?" + window.location.toString().split("?")[2]);
                }
            },
            error: function () {
                alert("error");
            }
        });
    }
}

function preview() {
    testEditor = editormd.markdownToHTML("blogContent", {
        width: "90%",
        height: "700",
        path: "../editormd/lib/",
        emoji: true,
        taskList: true,
        preview: true,
        watch: true,
        editor: false,
        tex: true, // 默认不解析
        sequenceDiagram: true, // 默认不解析
    });
}