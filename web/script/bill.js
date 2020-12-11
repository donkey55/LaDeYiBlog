let billCount=0;
let billTotal=0;
let billList;
let billNum=0;
let pageIndex = 1;
let pageNum = 1;

$(function() {
    $("#username").html($.cookie("account"));
    $.ajax({
        type: "post",
        url : "../com/ladeyi/test/ShowMyBillServlet",
        data: {
            "userName": $.cookie("account")
        },
        datatype: "json",
        success: function(data){
            billList = data;
            billTotal = data.length;
            pageIndex = 1;
            if(billList.length > 0){
                pageNum = Math.ceil(billList.length / 5);
            }
            showBill();
            updatePageNum();
        }, 
        error: function (data) {
            //alert("error");
            updatePageNum();
        }
    });
});

function searchUserBlog() {
    let keyword = document.getElementById("keywords").value;
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/SearchBillServlet",
        data: {
            "userName" : $.cookie("account"),
            "keyword" : keyword
        },
        dataType: "json",
        success: function (data) {
            //保存得到订单
            billList = data;
            //console.log(billList);
            billCount = 0;
            pageIndex = 1;
            //console.log(SBlogList);
            if(data.length > 0){
                pageNum = Math.ceil(billList.length / 5);
            }else{
                pageNum = 1;
            }
            billTotal = billList.length;
            empty();
            showBill();
            updatePageNum();
        },
        error:function(){
            console.log("error");
            pageNum = 1;
            updatePageNum();
        }
    });
}

function pageDown() {
    if(billCount < billTotal) {
        empty();
        showBill();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    if(billCount > billNum){
        billCount -= (billNum + 5);
        empty();
        showBill();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}
function showBill() {
    for (let index = 0; index < 5 && billCount < billTotal; index++, billCount++, billNum++) {
        const element = billList[billCount];
        let tableElement = document.getElementById("tableElement" + String(index + 1));
        let td1 = document.createElement("td"); // ID
        let td2 = document.createElement("td"); // 商品名称
        let td3 = document.createElement("td"); // 购买数量
        let td4 = document.createElement("td"); // 账单号
        let aLi1 = document.createElement("a"); // 商品名称链接到商品的详细界面
        td1.innerHTML = String(billCount + 1);
        td3.innerHTML = element.amount;
        td4.innerHTML = element.billId;
        aLi1.href = "goods.html?" + element.goodsId;
        aLi1.innerHTML = element.goodsName;
        td2.appendChild(aLi1);
        tableElement.appendChild(td1);
        tableElement.appendChild(td2);
        tableElement.appendChild(td3);
        tableElement.appendChild(td4);
    }
}

function updatePageNum() {
    document.getElementById("pageIndex").innerHTML = String(pageIndex);
    document.getElementById("pageNum").innerHTML = String(pageNum);
    document.getElementById("billTotal").innerHTML = String(billTotal);
}

function empty() {
    billNum = 0;
    //清空子元素
    $("#tableElement1").empty();
    $("#tableElement2").empty();
    $("#tableElement3").empty();
    $("#tableElement4").empty();
    $("#tableElement5").empty();
}