var editor;
var testEditor;
editor = editormd("test-editor", {
    width: "100%",
    height: 600,
    path: "../editormd/lib/",
    tocm: true,
    tex: true,
    emoji: true, //编辑主题
    saveHTMLToTextarea: true,
});
var account = window.location.toString().split("?")[1];
function getCon() {
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/WriteBlogServlet",
        data: {
            "title" : $("#title").val(),
            "blog" : $("#test-editor-html-code").val(),
            "userName": account
        },
        dataType: "json",
        success: function(data) {

            if (data.ret === "1") {
                alert("创建成功");
            }
        },
        error: function () {
            alert("error");
        }
    });
}