let goodId = window.location.toString().split("?")[1];
let element;
let userName = $.cookie("account")
$(function () {
    $("#userName").html(userName)
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowGoodsServlet",
        data: {
            "goodsId" : goodId
        },
        success: function (data) {
            element = data;
            setHtml("goodsName", data.goodsName);
            setHtml("goodsDescription", data.goodsIntroduction);
            setHtml("price", data.goodsPrice);
            setHtml("stockNum", data.goodsNum);
            document.getElementById("goodsImg")
                .setAttribute("src", data.goodsImg);
        },
        error: function () {
            alert("error");
        }
    });
});

function setHtml(id, value) {
    $("#"+id).html(value);
}

function buy() {
    console.log(element.goodsId);
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/BuyGoodsServlet" ,
        data: {
            "userName": $.cookie("account"),
            "goodsId": element.goodsId,
            "amount": $("#count").html()
        },
        datatype:"json",
        success:function (data) {
            if (data.ret === "1") {
                alert("购买成功");
            } else if(data.ret === "0"){
                alert("不是你钱不够就是你买的太多了~~");
            } else{
                alert("异常！！！");
            }

        },
        error: function () {
            alert("error");
        }
    });
}

function increase() {
    let value = parseInt($("#count").html());
    value++;
    $("#count").html(value);
}

function decrease() {
    let value = parseInt($("#count").html());
    value--;
    if (value < 0) {
        value = 0;
    }
    $("#count").html(value);
}