var SBlogCount = 0;
var SBlogNum = 0;
var SBlogList;
var SPageIndex = 1;
var SPageNum;
var SBlogTotal = 0;

$(function () {
    /* if($.cookie("account") == undefined){
        window.location.href="../HTML/login.html";
    } */
    document.getElementById("username").innerHTML=$.cookie("account")
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/SearchBlogServlet",
        data: {
            "keyword": $.cookie("keywords")
        },
        dataType: "json",
        success: function (data) {
            SBlogList = data;
            //console.log(data);
            //console.log(SBlogList);
            for(let i = 0; i < SBlogList.length; i++){
                if(SBlogList[i].userName !== $.cookie("account")){
                    SBlogList.splice(i, 1);
                }
            }
            //console.log(SBlogList);
            if(SBlogList == undefined){
                SPageNum = 1;
            }else{
                SPageNum = Math.ceil(SBlogList.length / 5);
                SBlogTotal = SBlogList.length;
            }
            //显示文章
            for (let index = 0; index < 5 && SBlogCount < SBlogTotal; index++, SBlogCount++, SBlogNum++) {
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
                aLi2.setAttribute("id", element.blogId);
                aLi2.setAttribute("href","#");
                aLi2.setAttribute("onclick","deleteBlog(this)");
                aLi2.setAttribute("class", "ui mini red basic button");
                aLi2.innerHTML = "删除"
                tableElement.appendChild(td1);
                td2.appendChild(aLi1);
                tableElement.appendChild(td2);
                td3.appendChild(aLi2);
                tableElement.appendChild(td3);
            }
            document.getElementById("pageIndex").innerHTML = String(SPageIndex);
            document.getElementById("pageNum").innerHTML = String(SPageNum);
            document.getElementById("blogNum").innerHTML = String(SBlogTotal);
        },
        error:function(){
            console.log("error");
            SPageNum = 1;
            document.getElementById("pageIndex").innerHTML = String(SPageIndex);
            document.getElementById("pageNum").innerHTML = String(SPageNum);
            document.getElementById("blogNum").innerHTML = String(SBlogTotal);
        }
    });
    //console.log(SBlogList);
});

function pageDown() {
    if(SBlogCount < SBlogTotal){
        SBlogNum = 0;
        //清空子元素
        $("#tableElement1").empty();
        $("#tableElement2").empty();
        $("#tableElement3").empty();
        $("#tableElement4").empty();
        $("#tableElement5").empty();
        //显示文章
        for (let index = 0; index < 5 && SBlogCount < SBlogTotal; index++, SBlogCount++, SBlogNum++) {
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
            aLi2.setAttribute("id", element.blogId);
            aLi2.setAttribute("href","#");
            aLi2.setAttribute("onclick","deleteBlog(this)");
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
        for (let index = 0; index < 5 && SBlogCount < SBlogTotal; index++, SBlogCount++, SBlogNum++) {
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
            aLi2.setAttribute("id", element.blogId);
            aLi2.setAttribute("href","#");
            aLi2.setAttribute("onclick","deleteBlog(this)");
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

function deleteBlog(obj) {
    var id = obj.id;
    if (confirm("您真的准备删除此博客吗？")) {
        $.ajax({
            type: "post",
            url: "../com/ladeyi/test/DeleteBlogServlet",
            data: {
                blogId: id
            },
            dataType: "json",
            success: function (data) {
                if(data.ret > 0){
                    alert("删除成功");
                    location.reload();
                }else{
                    alert("删除失败");
                }
            },
            error: function () {
                alert("error");
            }
        });
    }
}

function writeBlog() {
    window.open("writeBlog.html?" + $.cookie("account"), "_blank");
}