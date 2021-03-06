let count = 0;
let preferenceFlag;
let localPreferenceNum;
let commentList;

window.onload = function () {
    var id = window.location.toString().split('?')[1];
    //     //let str = {"blog":"$$\nsum=\sum k"};
    //console.log(JSON.stringify( {"blog":"$$\nsum=\sum k"}));

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
                document.getElementById("userName").innerHTML = $.cookie("account");
                document.getElementById("blog").innerHTML = data.blog;
                document.getElementById("time").innerHTML = data.time;
                document.getElementById("label").innerHTML = data.label;
                document.getElementById("author").href = "showUser.html?" + data.userName + "?" + $.cookie("account");
                preview();
            },
            error: function () {
                alert("此文章已被删除！")
                window.close()
            }
        });
        //console.log(count);
        count++;
    }

    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowSingleBlogInfoServlet",
        data: {
            "blogId": id,
            "userName":$.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            document.getElementById("preference_num").innerHTML =data.preferenceCount;
            localPreferenceNum = parseInt(data.preferenceCount);
            document.getElementById("comment_num").innerHTML = data.commentCount;
            console.log(data.concerned)
            if(data.concerned === "1"){
                preferenceFlag = 1;
            }else{
                preferenceFlag = 0;
            }
            showStyle();
        }
    });

    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowBlogCommentServlet",
        data: {
            "blogId": id
        },
        dataType: "json",
        success: function (data) {
            commentList = data;
            //console.log(data)
            if(commentList.length === 0){
                let p = document.createElement("p")
                p.innerText = "暂时没有评论哦~"
                document.getElementById("all_comments").appendChild(p)
            }
            for(let index = 0; index < commentList.length; index++){
                let topUserName = commentList[index].userName;
                let topComment = commentList[index].comment;
                let topCommentId = commentList[index].commentId;
                let commentTime = commentList[index].time;
                let userNames = new Array();
                let replies = new Array();
                let times = new Array();
                //console.log(commentList[index].commentId)
                $.ajax({
                    type: "post",
                    url: "../com/ladeyi/test/ShowCommentReplyServlet",
                    data: {
                        "commentId": commentList[index].commentId
                    },
                    dataType: "json",
                    success: function (data) {
                        for(let index = 0; index < data.length; index++){
                            userNames[index] = data[index].userName;
                            replies[index] = data[index].reply;
                            times[index] = data[index].time;
                        }
                        //console.log(topUserName)
                        //console.log(topComment)
                        //console.log(userNames)
                        //console.log(replies)
                        insertComment(document.getElementById("all_comments"),
                            topUserName,
                            topCommentId,
                            topComment,
                            commentTime,
                            userNames,
                            replies,
                            times);
                    },
                    error: function () {
                        //console.log(topUserName);
                        //console.log(topComment);
                        /*insertComment(document.getElementById("all_comments"),
                            topUserName,
                            topComment,
                            undefined,
                            undefined);*/
                        //alert("error")
                    }
                });
            }
        },
        error: function () {
            //alert("error");
        }
    });
    //console.log(commentList)
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

function showStyle() {
    if(preferenceFlag === 1){
        document.getElementById("preference").setAttribute("class","ui red button");
        document.getElementById("preference_num").setAttribute("class","ui basic red left pointing label");
    }else{
        document.getElementById("preference").setAttribute("class","ui button");
        document.getElementById("preference_num").setAttribute("class","ui basic left pointing label");
    }
}

function changeStyle() {
    var id = window.location.toString().split('?')[1];
    if(preferenceFlag === 0){
        let label = ""
        while(label === ""){
            label = prompt("请输入标签", "");
        }
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/WritePreferenceServlet",
            data: {
                "blogId": id,
                "userName":$.cookie("account"),
                "label": label
            },
            dataType: "json",
            success: function (data) {
                if(data.ret === "1"){
                    alert("收藏成功")
                    document.getElementById("preference_num").innerHTML = String(++localPreferenceNum);
                    preferenceFlag = -preferenceFlag + 1;
                    showStyle();
                }else {
                    alert("收藏失败")
                }
            },
            error: function () {
                alert("收藏失败")
            }
        });
    }else{
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/DeletePreferenceServlet",
            data: {
                "blogId": id,
                "userName":$.cookie("account")
            },
            dataType: "json",
            success: function (data) {
                if(data.ret === "1"){
                    alert("取消收藏成功")
                    document.getElementById("preference_num").innerHTML = String(--localPreferenceNum);
                    preferenceFlag = -preferenceFlag + 1;
                    showStyle();
                }else {
                    alert("取消收藏失败")
                }
            },
            error: function () {
                alert("取消收藏失败")
            }
        });
    }
}

//向commentsDiv元素中加入一条回复
function insertReply(commentDivs,userName, reply, replyTime) {
    let a1 = document.createElement("a")
    a1.setAttribute("class","avatar")
    let img = document.createElement("img")
    img.setAttribute("src","../images/defaultAvatar.jpg")
    a1.appendChild(img)
    let div1 = document.createElement("div")
    div1.setAttribute("class","content")
    let a2 = document.createElement("a")
    a2.setAttribute("class","ui teal image label")
    a2.setAttribute("href","showUser.html?" + userName + "?" + $.cookie("account"))
    a2.setAttribute("target","blank")
    a2.innerText = userName
    let i = document.createElement("i")
    i.setAttribute("class", "clock outline icon m-font-size-text-mini")
    i.setAttribute("style", "color: #808080")
    let span = document.createElement("span")
    span.setAttribute("class", "m-font-size-text-mini")
    span.setAttribute("style", "color: #808080")
    span.innerText = replyTime
    let div2 = document.createElement("div")
    div2.setAttribute("class", "text")
    div2.innerText = reply
    div1.appendChild(a2)
    div1.appendChild(i)
    div1.appendChild(span)
    div1.appendChild(div2)
    let div3 = document.createElement("div")
    div3.setAttribute("class","comment")
    div3.appendChild(a1)
    div3.appendChild(div1)
    commentDivs.appendChild(div3)
}

//添加一条评论及其所有回复
function insertComment(topDiv,topUserName,topCommentId,comment, commentTime, userNames,replies, replyTimes) {
    let a1 = document.createElement("a")
    a1.setAttribute("class","avatar")
    let img = document.createElement("img")
    img.setAttribute("src","../images/defaultAvatar.jpg")
    a1.appendChild(img)
    let div1 = document.createElement("div")
    div1.setAttribute("class","content")
    let a2 = document.createElement("a")
    a2.setAttribute("class","ui teal image label")
    a2.setAttribute("href","showUser.html?" + topUserName + "?" + $.cookie("account"))
    a2.setAttribute("target","blank")
    a2.innerText = topUserName
    let i = document.createElement("i")
    i.setAttribute("class", "clock outline icon m-font-size-text-mini")
    i.setAttribute("style", "color: #808080")
    let span = document.createElement("span")
    span.setAttribute("class", "m-font-size-text-mini")
    span.setAttribute("style", "color: #808080")
    span.innerText = commentTime
    let div2 = document.createElement("div")
    div2.setAttribute("class", "text")
    div2.innerText = comment
    let div5 = document.createElement("div")
    div5.setAttribute("class","action")
    let a3 = document.createElement("a")
    a3.setAttribute("onclick","reply(this)")
    a3.innerHTML = "<i class=\"reply icon\"></i>回复"
    let a4 = document.createElement("a")
    a4.setAttribute("onclick","expand(this)")
    //a4.setAttribute("class","expand")
    a4.innerHTML = "<i class=\"reply all icon\"></i>查看所有回复"
    let div6 = document.createElement("div")
    div6.setAttribute("hidden","hidden")
    div6.setAttribute("id","reply_field" + topCommentId)
    div6.innerHTML = "<div class=\"ui form\">\n" +
        "<div class=\"field\">\n" +
        "<textarea id='reply_text_field" + topCommentId + "' placeholder=\"请输入评论...\"></textarea>\n" +
        "</div>\n" +
        "<button class=\"ui button\" onclick='submit_reply(this, "+ topCommentId +")'>发表</button>\n" +
        "</div>"
    div5.appendChild(a3)
    div5.appendChild(a4)
    div1.appendChild(a2)
    div1.appendChild(i)
    div1.appendChild(span)
    div1.appendChild(div2)
    div1.appendChild(div5)
    div1.appendChild(div6)
    let div3 = document.createElement("div")
    div3.setAttribute("class","comment")
    div3.setAttribute("id", topCommentId)
    div3.appendChild(a1)
    div3.appendChild(div1)
    let div4 = document.createElement("div")
    div4.setAttribute("class","comments")
    div4.setAttribute("hidden","hidden")
    div3.appendChild(div4)
    if(userNames.length > 0){
        for(let index = 0; index < userNames.length; index++){
            insertReply(div4, userNames[index], replies[index], replyTimes[index])
        }
    }else{
        let p = document.createElement("p")
        p.innerText = "暂时没人回复哦~"
        div4.appendChild(p)
    }
    topDiv.appendChild(div3)
}

function expand(obj) {
    let target = obj.parentNode.parentNode.parentNode.childNodes[2]
    //console.log(target.hidden)
    if(target.hidden === true){
        target.removeAttribute("hidden")
        obj.innerHTML = "<i class=\"reply all icon\"></i>收起所有回复"
    }else{
        target.setAttribute("hidden","hidden")
        obj.innerHTML = "<i class=\"reply all icon\"></i>查看所有回复"
    }

}

function reply(obj) {
    let target = obj.parentNode.parentNode.childNodes[5]
    //console.log(target.hidden)
    if(target.hidden === true){
        target.removeAttribute("hidden")
        obj.innerHTML = "<i class=\"reply icon\"></i>收起回复"
    }else{
        target.setAttribute("hidden","hidden")
        obj.innerHTML = "<i class=\"reply icon\"></i>回复"
    }
}

function submit_reply(obj, topCommentId) {
    let target = obj.parentNode.parentNode.parentNode.parentNode.id
    var id = window.location.toString().split('?')[1];
    //console.log(target)
    //console.log($("#reply_text_field" + topCommentId).val())
    let reply = $("#reply_text_field" + topCommentId).val()
            .replace(/\\/g,'\\\\' )
            .replace(/"/g,'\\"')
            .replace(/\r\n|\n/g, '\\n')
            .replace(/\s/g, ' ')
    console.log(reply)
    if(reply === ""){
        alert("你还啥回复都没写呢")
    }else{
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/WriteReplyServlet",
            data: {
                "commentId": target,
                "userName":$.cookie("account"),
                "reply": reply,
            },
            dataType: "json",
            success: function (data) {
                if(data.ret === "1"){
                    alert("回复成功");
                    location.reload();
                    //向被回复的评论的作者发送消息
                    //对应的messageType为2
                    $.ajax({
                        type: "post",
                        url: "../com/ladeyi/test/WriteMessageServlet",
                        data: {
                            "fromUserName": $.cookie("account"),
                            "toUserName": obj.parentNode.parentNode.parentNode.childNodes[0].innerText,
                            "message": id + "#" + document.getElementById("title").innerText
                                .replace(/\\/g,'\\\\' )
                                .replace(/"/g,'\\"')
                                .replace(/\r\n|\n/g, '\\n')
                                .replace(/\s/g, ' ') + "#" +
                                obj.parentNode.parentNode.parentNode.childNodes[3].innerText
                                    .replace(/\\/g,'\\\\' )
                                    .replace(/"/g,'\\"')
                                    .replace(/\r\n|\n/g, '\\n')
                                    .replace(/\s/g, ' ') + "#" + reply,
                            "messageType": "2"
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data.ret)
                            if(data.ret === "1"){
                                //alert("回复消息添加失败")
                            } else {
                                alert("回复消息添加失败")
                            }
                        },
                        error: function () {
                            alert("回复消息添加失败")
                        }
                    });
                }else {
                    alert("回复失败")
                }
            },
            error: function () {
                alert("回复失败")
            }
        });
    }
}

function addComment(obj) {
    let target = document.getElementById("comment_field")
    //console.log(target.hidden)
    if(target.hidden == true){
        target.removeAttribute("hidden")
        obj.innerHTML = "<i class=\"comment outline icon\"></i>收起"
    }else{
        target.setAttribute("hidden","hidden")
        obj.innerHTML = "<i class=\"comment outline icon\"></i>添加评论"
    }
}

function publishComment() {
    var id = window.location.toString().split('?')[1];
    let comment = $("#comment_text_field").val()
        .replace(/\\/g,'\\\\' )
        .replace(/"/g,'\\"')
        .replace(/\r\n|\n/g, '\\n')
        .replace(/\s/g, ' ')
    if(comment === ""){
        alert("你还啥评论都没写呢")
    } else{
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/WriteCommentServlet",
            data: {
                "blogId": id,
                "userName":$.cookie("account"),
                "comment": comment,
            },
            dataType: "json",
            success: function (data) {
                if(data.ret === "1"){
                    alert("评论成功")
                    location.reload();
                    //向被评论的博客的作者发送消息
                    //对应的messageType为1
                    //console.log($.cookie("account"))
                    //console.log(document.getElementById("author").innerText)
                    //console.log(id)
                    $.ajax({
                        type: "post",
                        url: "../com/ladeyi/test/WriteMessageServlet",
                        data: {
                            "fromUserName": $.cookie("account"),
                            "toUserName": document.getElementById("author").innerText,
                            "message": id + "#" + document.getElementById("title").innerText
                                .replace(/\\/g,'\\\\' )
                                .replace(/"/g,'\\"')
                                .replace(/\r\n|\n/g, '\\n')
                                .replace(/\s/g, ' ') + "#" +comment,
                            "messageType": "1"
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data.ret)
                            if(data.ret === "1"){
                                //alert("评论消息添加成功")
                            }else {
                                alert("评论消息添加失败")
                            }
                        },
                        error: function () {
                            alert("评论消息添加失败")
                        }
                    });
                }else {
                    alert("评论失败")
                }
            },
            error: function () {
                alert("评论失败")
            }
        });
    }
}