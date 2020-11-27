var SBlogCount = 0;
var SBlogNum = 0;
var SBlogList;
var SPageIndex = 1;
var SPageNum;

$(function () {
    if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    }
    document.getElementById("username").innerHTML=$.cookie("account")
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/SearchBlogServlet",
        async: false,
        data: {
            "keyword": $.cookie("keywords")
        },
        dataType: "json",
        success: function (data) {
            SBlogList = data;
            console.log(data);
            console.log(SBlogList);
            for(let i = 0; i < SBlogList.length; i++){
                if(SBlogList[i].userName !== $.cookie("account")){
                    SBlogList.splice(i, 1);
                }
            }
            console.log(SBlogList);
        },
        error:function(){
            alert("error");
        }
    });
    console.log(SBlogList);
    //显示文章
    for (let index = 0; index < 5 && SBlogCount < SBlogList.length; index++, SBlogCount++, SBlogNum++) {
        const element = SBlogList[SBlogCount];
        let tableElement = document.getElementById("tableElement" + String(index + 1));
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let aLi1 = document.createElement("a");
        let aLi2 = document.createElement("a");
        td1.innerHTML = String(SBlogCount + 1);
        aLi1.innerHTML = element.title;
        aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
        aLi1.setAttribute("target", "_blank");
        aLi2.setAttribute("href","#");
        aLi2.setAttribute("onclick","return confirm('确定要删除该文章吗？三思啊! 删了可就没了！')");
        aLi2.setAttribute("class", "ui mini red basic button");
        aLi2.innerHTML = "删除"
        tableElement.appendChild(td1);
        td2.appendChild(aLi1);
        tableElement.appendChild(td2);
        td3.appendChild(aLi2);
        tableElement.appendChild(td3);
    }
    if(SBlogList.length == 0){
        SPageNum = 1;
    }else{
        SPageNum = Math.ceil(SBlogList.length / 5);
    }
    document.getElementById("pageIndex").innerHTML = String(SPageIndex);
    document.getElementById("pageNum").innerHTML = String(SPageNum);
    document.getElementById("blogNum").innerHTML = String(SBlogList.length);
});

function gotoLogin() {
    $.removeCookie("account",{ path: '/'});
    window.location.href="../HTML/login.html";
}

function pageDown() {
    if(SBlogCount < SBlogList.length){
        SBlogNum = 0;
        //清空子元素
        $("#tableElement1").empty();
        $("#tableElement2").empty();
        $("#tableElement3").empty();
        $("#tableElement4").empty();
        $("#tableElement5").empty();
        //显示文章
        for (let index = 0; index < 5 && SBlogCount < SBlogList.length; index++, SBlogCount++, SBlogNum++) {
            const element = SBlogList[SBlogCount];
            let tableElement = document.getElementById("tableElement" + String(index + 1));
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let aLi1 = document.createElement("a");
            let aLi2 = document.createElement("a");
            td1.innerHTML = String(SBlogCount + 1);
            aLi1.innerHTML = element.title;
            aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
            aLi1.setAttribute("target", "_blank");
            aLi2.setAttribute("href","#");
            aLi2.setAttribute("onclick","return confirm('确定要删除该文章吗？三思啊! 删了可就没了！')");
            aLi2.setAttribute("class", "ui mini red basic button");
            aLi2.innerHTML = "删除"
            tableElement.appendChild(td1);
            td2.appendChild(aLi1);
            tableElement.appendChild(td2);
            td3.appendChild(aLi2);
            tableElement.appendChild(td3);
        }
        SPageIndex++;
        document.getElementById("pageIndex").innerHTML = String(SPageIndex);
    }
}

function pageUp() {
    if(SBlogCount > SBlogNum){
        SBlogCount -= (SBlogNum + 5);
        SBlogNum = 0;
        //清空子元素
        $("#tableElement1").empty();
        $("#tableElement2").empty();
        $("#tableElement3").empty();
        $("#tableElement4").empty();
        $("#tableElement5").empty();
        //显示文章
        for (let index = 0; index < 5 && SBlogCount < SBlogList.length; index++, SBlogCount++, SBlogNum++) {
            const element = SBlogList[SBlogCount];
            let tableElement = document.getElementById("tableElement" + String(index + 1));
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let aLi1 = document.createElement("a");
            let aLi2 = document.createElement("a");
            td1.innerHTML = String(SBlogCount + 1);
            aLi1.innerHTML = element.title;
            aLi1.setAttribute('href', 'blog.html?' + element.blogId + '?' + $.cookie("account"));
            aLi1.setAttribute("target", "_blank");
            aLi2.setAttribute("href","#");
            aLi2.setAttribute("onclick","return confirm('确定要删除该文章吗？三思啊! 删了可就没了！')");
            aLi2.setAttribute("class", "ui mini red basic button");
            aLi2.innerHTML = "删除"
            tableElement.appendChild(td1);
            td2.appendChild(aLi1);
            tableElement.appendChild(td2);
            td3.appendChild(aLi2);
            tableElement.appendChild(td3);
        }
        SPageIndex--;
        document.getElementById("pageIndex").innerHTML = String(SPageIndex);
    }
}

function searchUserBlog() {
    let keywords = document.getElementById("keywords").value
    $.cookie("keywords", keywords, { expires: 7, path: '/', secure: false});
    let url = "searchUserBlog.html?" + $.cookie("account");
    window.open(url, "_self");
}