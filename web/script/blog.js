//
let count = 0;

window.onload = function () {
    var id = window.location.toString().split('?')[1];
    let str = {"blog":"$$\nsum=\sum k"};
    console.log(JSON.stringify( {"blog":"$$\nsum=\sum k"}));

    if (count === 0) {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/ShowBlogServlet",
            data: {
                "blogId": id
            },
            dataType: "json",
            success: function (data) {
                document.getElementById("title").innerHTML = data.title;
                document.getElementById("topTitle").innerHTML = data.title;
                document.getElementById("author").innerHTML = data.userName;
                document.getElementById("blog").innerHTML = data.blog;
                document.getElementById("preferenceNum").innerHTML = data.preferenceNum;
                document.getElementById("commentNum").innerHTML = data.commentNum;
                preview();
            }
        });
        count++;
    }

    $.ajax({
       type: "post",
       url: "",
       data: {
           "blogId": id
       },
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

