var preferenceCount = 0;
var preferenceList;
var pageIndex = 1;
var preferenceNum = 0;
var pageNum = 1;
var preferenceTotal = 0;

$(function () {
    /* if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    } */
    preferenceCount = 0;
    pageIndex = 1;
    preferenceNum = 0;
    document.getElementById("username").innerHTML = $.cookie("account");
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowPreferenceServlet",
        data: {
            "userName": $.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            //保存得到的收藏
            preferenceList = data;
            if(preferenceList.length > 0){
                pageNum = Math.ceil(preferenceList.length / 5);
            }
            preferenceTotal = preferenceList.length;
            //显示收藏
            addTd();
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("preferenceTotal").innerHTML = String(preferenceTotal);
        },
        error: function () {
            console.log("error");
            pageNum = 1;
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("preferenceTotal").innerHTML = String(preferenceTotal);
        }
    });
});

function searchPreference() {
    let keywords = document.getElementById("keywords").value;
    $.ajax({
        //等接口
        type: "post",
        url: "../com/ladeyi/test/SearchPreferenceServlet",
        data: {
            "keyword": keywords,
            "userName": $.cookie("account")
        },
        dataType: "json",
        success: function (data) {
            //保存得到的收藏
            preferenceList = data;
            preferenceCount = 0;
            pageIndex = 1;
            preferenceNum = 0;
            if(preferenceList.length > 0){
                pageNum = Math.ceil(preferenceList.length / 5);
            }else{
                pageNum = 1;
            }
            preferenceTotal = preferenceList.length;
            emptyTd();
            //显示收藏
            addTd();
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("preferenceTotal").innerHTML = String(preferenceTotal);      
        },
        error: function () {
            console.log("error");
            emptyTd();
            pageNum = 1;
            document.getElementById("pageIndex").innerHTML = String(pageIndex);
            document.getElementById("pageNum").innerHTML = String(pageNum);
            document.getElementById("preferenceTotal").innerHTML = String(preferenceTotal);
        }
    });

}

function deletePreference(obj) {
    var id = obj.id;
    if (confirm("您真的准备取消收藏博客吗？")) {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/DeletePreferenceServlet",
            data: {
                "userName": $.cookie("account"),
                "blogId": id
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
    if (preferenceCount < preferenceTotal) {
        emptyTd();
        addTd();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    if (preferenceCount > preferenceNum) {
        preferenceCount -= (preferenceNum + 5);
        emptyTd();
        addTd();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}


function addTd() {
    for (let index = 0; index < 5 && preferenceCount < preferenceTotal; index++, preferenceCount++, preferenceNum++) {
        const element = preferenceList[preferenceCount];
        let tableElement = document.getElementById("tableElement" + String(index + 1));
        let td1 = document.createElement("td"); //ID
        let td2 = document.createElement("td"); //标题
        let td3 = document.createElement("td"); //标签
        let td4 = document.createElement("td"); //操作
        let aLi1 = document.createElement("a"); //blog 显示
        let aLi2 = document.createElement("a"); //取消收藏
        td1.innerHTML = String(preferenceCount + 1);
        td3.innerHTML = element.label;
        aLi1.innerHTML = element.title;
        aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
        aLi1.setAttribute("target", "_blank");

        aLi2.setAttribute("id", element.blogId);
        aLi2.setAttribute("href", "#");
        aLi2.setAttribute("onclick", "deletePreference(this)");
        aLi2.setAttribute("class", "ui mini red basic button");
        aLi2.innerHTML = "取消收藏"

        tableElement.appendChild(td1);
        td2.appendChild(aLi1);
        tableElement.appendChild(td2);
        tableElement.appendChild(td3);
        td4.appendChild(aLi2);
        tableElement.appendChild(td4);
    }
}

function emptyTd() {
    preferenceNum = 0;
    $("#tableElement1").empty();
    $("#tableElement2").empty();
    $("#tableElement3").empty();
    $("#tableElement4").empty();
    $("#tableElement5").empty();
}
