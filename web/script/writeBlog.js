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
    let title = $("#title").val()
        .replace(/\\/g,'\\\\' )
        .replace(/"/g,'\\"')
        .replace(/\r\n|\n/g, '\\n')
        .replace(/\s/g, ' ');
    let blog = $("#test-editor-html-code").val()
        .replace(/\\/g,'\\\\' )
        .replace(/"/g,'\\"')
        .replace(/\$\$\r\n|\$\$\n/g, '$$$$')
        .replace(/\r\n\$\$|\n\$\$/g, '$$$$')
        .replace(/\r\n|\n/g, '\\n')
        .replace(/\s/g, ' ');
    if(title === ""){
        title = blog.substr(0, 32);
    }
    console.log(title)
    if(blog === ""){
        alert("你还啥都没写呢~~");
    }else{
        let label = ""
        while(label === ""){
            label = prompt("请输入标签", "");
        }
        if(label == null){
            label = "未设置"
        }
        console.log(label)
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/WriteBlogServlet",
            data: {
                "title" : title,
                "blog" : blog,
                "userName": $.cookie("account"),
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
                if (parseInt(data.ret) > 0) {
                    let blogId = parseInt(data.ret);
                    alert("发布成功");
                    //向粉丝发送消息
                    //对应的messageType为3
                    //首先找到该用户的所有粉丝
                    $.ajax({
                        type: "post",
                        url: "../com/ladeyi/test/ShowToAttentionServlet",
                        data: {
                            "userName": $.cookie("account"),
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data.length)
                            for(let index = 0; index < data.length; index++){
                                let element = data[index];
                                $.ajax({
                                    type: "post",
                                    url: "../com/ladeyi/test/WriteMessageServlet",
                                    data: {
                                        "fromUserName": $.cookie("account"),
                                        "toUserName": element.userName,
                                        "message": blogId + "#" + title,
                                        "messageType": "3"
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        console.log(data.ret)
                                        if(data.ret === "1"){
                                            //alert("给粉丝发消息成功")
                                        }else {
                                            alert("给粉丝发消息失败")
                                        }
                                    },
                                    error: function () {
                                        alert("给粉丝发消息失败")
                                    }
                                });
                            }
                        },
                        error: function () {
                            alert("给粉丝的消息添加失败")
                        }
                    });
                    //location.reload();
                }else{
                    alert("发布失败");
                }
            },
            error: function () {
                alert("error");
            }
        });
        window.open("user.html", "_self")
    }
}




