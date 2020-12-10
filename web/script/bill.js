let billCount;
let billTotal;
let billList;
let billNum;
let pageIndex = 1;
let pageNum;

$(function() {
    $.ajax({
        type: "post",
        url : "",
        data: {
            "userName": $.cookie("account")
        },
        datatype: "json",
        success: function(data){
            billList = data;
            billTotal = data.length;
            pageIndex = 1;
            pageNum = Math.ceil(blogList.length / 5);
            showBill();
            updatePageNum();
        }, 
        error: function (data) {
            alert("error");
            updatePageNum();
        }
    });
});

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
    document.getElementById("blogTotal").innerHTML = String(blogTotal);
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