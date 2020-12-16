var attentionCount = 0;
var attentionList;
var pageIndex = 1;
var attentionNum = 0;
var pageNum = 1;
var attentionTotal = 0;

$(function () {
    /* if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    } */
    attentionCount = 0;
    pageIndex = 1;
    attentionNum = 0;
    document.getElementById("username").innerHTML = $.cookie("account");
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowFromAttentionServlet",
        data: {
            "userName": $.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            //保存得到的人
            attentionList = data;
            if(attentionList.length > 0){
                pageNum = Math.ceil(attentionList.length / 5);
            }
            attentionTotal = attentionList.length;
            //显示关注
            addTd();
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("attentionTotal").innerHTML = String(attentionTotal);
        },
        error: function () {
            console.log("error");
            pageNum = 1;
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("attentionTotal").innerHTML = String(attentionTotal);
        }
    });
});

function searchAttention() {
    let keywords = document.getElementById("keywords").value;
    $.ajax({
        //等接口
        type: "post",
        url: "../com/ladeyi/test/SearchAttentionServlet",
        data: {
            "keyword": keywords,
            "userName": $.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            //保存得到的用户
            attentionList = data;
            attentionCount = 0;
            pageIndex = 1;
            attentionNum = 0;
            if(attentionList.length > 0){
                pageNum = Math.ceil(attentionList.length / 5);
            }else{
                pageNum = 1;
            }
            attentionTotal = attentionList.length;
            emptyTd();
            //显示用户
            addTd();
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("attentionTotal").innerHTML = String(attentionTotal);
        },
        error: function () {
            console.log("error");
            emptyTd();
            pageNum = 1;
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("attentionTotal").innerHTML = String(attentionTotal);
        }
    });

}

function deleteAttention(obj) {
    var toUserName = obj.id;
    if (confirm("您真的准备取消关注他吗？")) {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/DeleteAttentionServlet",
            data: {
                "fromUserName": $.cookie("account"),
                "toUserName": toUserName
            },
            dataType: "json",
            success: function (data) {
                if (data.ret > 0) {
                    alert("取消成功");
                    location.reload();
                } else {
                    alert("取消失败");
                }
            },
            error: function () {
                alert("error");
            }
        });
    }
}

function pageDown() {
    if (attentionCount < attentionTotal) {
        attentionNum = 0;
        emptyTd();
        addTd();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    if (attentionCount > attentionNum) {
        attentionCount -= (attentionNum + 5);
        attentionNum = 0;
        emptyTd();
        addTd();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}


function addTd() {
    for (let index = 0; index < 5 && attentionCount < attentionTotal; index++, attentionCount++, attentionNum++) {
        const element = attentionList[attentionCount];
        let tableElement = document.getElementById("tableElement" + String(index + 1));
        let td1 = document.createElement("td"); //ID
        let td2 = document.createElement("td"); //作者
        let td3 = document.createElement("td"); //操作
        let aLi1 = document.createElement("a"); //user显示
        let aLi2 = document.createElement("a"); //取消收藏
        td1.innerHTML = String(attentionCount + 1);
        aLi1.innerHTML = element.userName;
        aLi1.setAttribute('href', 'showUser.html?' + element.userName + '?' + $.cookie("account"));
        aLi1.setAttribute("target", "_blank");

        aLi2.setAttribute("id", element.userName);
        aLi2.setAttribute("href", "#");
        aLi2.setAttribute("onclick", "deleteAttention(obj)");
        aLi2.setAttribute("class", "ui mini red basic button");
        aLi2.innerHTML = "取消关注"

        tableElement.appendChild(td1);
        td2.appendChild(aLi1);
        tableElement.appendChild(td2);
        td3.appendChild(aLi2);
        tableElement.appendChild(td3);
    }
}

function emptyTd() {
    $("#tableElement1").empty();
    $("#tableElement2").empty();
    $("#tableElement3").empty();
    $("#tableElement4").empty();
    $("#tableElement5").empty();
}
