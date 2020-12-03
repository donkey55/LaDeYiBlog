window.onload = function () {
    var id = window.location.toString().split('?')[1];
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowBlogServlet",
        data: {
            "blogId": id
        },
        dataType: "json",
        success: function (data) {
            alert("hello world");
            document.getElementById("title").innerHTML = data.title;
            document.getElementById("topTitle").innerHTML = data.title;
            document.getElementById("author").innerHTML = data.userName;
            document.getElementById("blog").innerHTML = data.blog;
            preview();
        }
    });
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