var messageCount = 0;
var messageNum = 0;
var messageList;
var pageIndex = 1;
var pageNum = 0;
var messageTotal = 0;
var pageCapacity = 20;

$(function () {
    /* if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    } */
    document.getElementById("username").innerHTML=$.cookie("account");
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowToMessageServlet",
        data: {
            "toUserName": $.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            //保存得到的消息
            messageList = data;
            if(messageList.length == 0){
                pageNum = 1;
            }else{
                pageNum = Math.ceil(messageList.length / pageCapacity);
            }
            messageTotal = messageList.length;
            //显示消息
            addMessage();
            updatePageNum();
        },
        error:function(){
            console.log("error");
        }
    });
});


function addMessage() {
    for (let index = 0; index < pageCapacity && messageCount < messageTotal; index++, messageCount++, messageNum++) {
        const element = messageList[messageCount];

        let div = document.createElement("div")
        div.setAttribute("class", "item")
        div.innerHTML="<img class=\"ui avatar image\" src=\"../images/defaultAvatar.jpg\">\n" +
            "                <div class=\"content\">\n" +
            "                    <a class=\"header\" target='_blank' href='showUser.html?" + element.userName + "?" + $.cookie("account") + "'>"+element.userName+"</a>\n" +
            "                    <i class=\"clock outline icon m-font-size-text-mini\" style='color: #808080'></i>\n" +
            "                    <span class=\"m-font-size-text-mini\" id=\"time\" style='color: #808080'>" + element.time + "</span>"+
            "                    <div class=\"description\">"+transform(element)+"</div>\n" +
            "                </div>"
        document.getElementById("messageList").appendChild(div)
    }
}

function updatePageNum() {
    document.getElementById("pageIndex").innerHTML = String(pageIndex);
    document.getElementById("pageNum").innerHTML = String(pageNum);
    document.getElementById("messageNum").innerHTML = String(messageTotal);
}

function pageDown() {
    if(messageCount < messageTotal) {
        empty();
        //显示消息
        addMessage();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    if(messageCount > messageNum){
        messageCount -= (messageNum + pageCapacity);
        empty();
        addMessage();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function empty() {
    messageNum = 0;
    //清空子元素
    $("#messageList").empty();
}

function transform(element) {
    let message
    if(element.messageType === "0"){
        message = element.message
    }else if(element.messageType === "1"){
        let messageSet = element.message.split('#')
        message = "评论了你的博客<a href='blog.html?"+ messageSet[0] + "?" + $.cookie("account") +"' target='_blank' style='color:white'>"+ messageSet[1] +"</a>" +
            "<br>评论内容为：<br>" + messageSet[2]
    }else if(element.messageType === "2"){
        let messageSet = element.message.split('#')
        message = "回复了你对博客<a href='blog.html?"+ messageSet[0] + "?" + $.cookie("account") +"' target='_blank' style='color:white'>"+ messageSet[1] +"</a>" +
            "的评论<br>评论内容为：<br>" + messageSet[2] +
            "<br>回复内容为：<br>" + messageSet[3]
        //console.log(message)
    }
    else if(element.messageType === "3"){
        let messageSet = element.message.split('#')
        message = "发表了新博客<a href='blog.html?"+ messageSet[0] + "?" + $.cookie("account") +"' target='_blank' style='color:white'>"+ messageSet[1] +"</a>"
    }
    return message
}
