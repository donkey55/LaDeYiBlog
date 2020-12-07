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
            //保存得到的文章
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
            "                    <a class=\"header\">"+element.userName+"</a>\n" +
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
        message = "收藏了你的博客<a href='blog.html?"+ messageSet[0] + "?" + $.cookie("account") +"'>"+ messageSet[1] +"</a>"
    }else if(element.messageType === "-1"){
        let messageSet = element.message.split('#')
        message = "取消了对你的博客<a href='blog.html?"+ messageSet[0] + "?" + $.cookie("account") +"'>"+ messageSet[1] +"</a>的收藏"
    }
    return message
}
