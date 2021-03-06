let lastLabel
$(function(){
    /* if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    } */
    document.getElementById("username").innerHTML = $.cookie("account");
    let id = location.href.split("?")[1];
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowBlogServlet",
        data: {
            "blogId": id
        },
        dataType: "json",
        success: function (data) {
            document.getElementById("title").value = data.title;
            document.getElementById("blogContent").innerText = data.blog;
            document.getElementById("summary_text_field").innerText = data.summary;
            lastLabel = data.label;
        }, error: function () {
            alert("error");
        }
    });
    show();
});

function show() {
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
}

function getCon() {
    var id = window.location.toString().split('?')[1];
    let label = "";
    while(label === ""){
        label = prompt("请输入标签", lastLabel);
    }
    if(label == null){
        label = "未设置"
    }
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ChangeBlogServlet",
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
            "blogId": id,
            "summary" : $("#summary_text_field").val()
                .replace(/\\/g,'\\\\' )
                .replace(/"/g,'\\"')
                .replace(/\r\n|\n/g, '\\n')
                .replace(/\s/g, ' '),
            "label" : label
        },
        dataType: "json",
        success: function(data) {
            //console.log($("#test-editor-html-code").val());
            if (data.ret === "1") {
                alert("修改成功");
                location.reload();
            }else{
                alert("修改失败");
            }
        },
        error: function () {
            alert("error");
        }
    });
}




