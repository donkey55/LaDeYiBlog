var editor;
var testEditor;

editor = editormd("test-editor", {
    width: "100%",
    height: "80%",
    path: "../editormd/lib/",
    saveHTMLToTextarea: true,
    tocm: true,
    tex: true,
    emoji: true, //编辑主题
    saveHTMLToTextarea: true,
});

$(function(){
    /* if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    } */
    document.getElementById("username").innerHTML = $.cookie("account");
});

function getCon() {
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/WriteBlogServlet",
        data: {
            "title" : $("#title").val()
                .replace(/\\/g,'\\\\' )
                .replace(/"/g,'\\"')
                .replace(/\r\n|\n/g, '\\n')
                .replace(/\s/g, ' '),
            "blog" : $("#test-editor-html-code").val()
                .replace(/\\/g,'\\\\' )
                .replace(/"/g,'\\"')
                .replace(/\$\$\r\n|\$\$\n/g, '$$$$')
                .replace(/\r\n\$\$|\n\$\$/g, '$$$$')
                .replace(/\r\n|\n/g, '\\n')
                .replace(/\s/g, ' '),
            "userName": $.cookie("account")
        },
        dataType: "json",
        success: function(data) {
            //console.log($("#test-editor-html-code").val());
            if (data.ret === "1") {
                alert("发布成功");
                location.reload();
            }else{
                alert("发布失败");
            }
        },
        error: function () {
            alert("error");
        }
    });
}




