let userName = $.cookie("account");
let shopId;
let goodsList;
let pageIndex = 1;
let pageNum = 0;
let goodsNum = 0;
let goodsTotal;
let goodsCount = 0;
$(function(){
    $("#test").setAttribute("style", "");
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowShopInfoServlet",
        data: {
        },
        dataType: "json",
        success: function (data) {
            let shopList = data;
            shopId = data[0].shopId;
        },
        error:function(){
            console.log("error");
        }
    });

    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowGoodsInfoServlet",
        data: {
            "shopId" : shopId
        },
        dataType: "json",
        success: function (data) {
            goodsList = data;
            pageNum = pageNum = Math.ceil(goodsTotal/5);
            pageIndex = 1;
            goodsTotal = data.length;
            showGoods();
            updatePageNum();
        },
        error:function(){
            console.log("error");
            updatePageNum();
        }
    });
});

function pageDown() {
    if(goodsCount < goodsTotal) {
        empty();
        //显示文章
        showGoods();
        pageIndex++;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function pageUp() {
    if(goodsCount > goodsNum){
        goodsCount -= (goodsNum + 9);
        empty();
        showGoods();
        pageIndex--;
        document.getElementById("pageIndex").innerHTML = String(pageIndex);
    }
}

function showGoods() {
    for (let index = 1; index <= 9 && index < goodsTotal; index++, goodsCount++, goodsNum++) {
        const element = goodsList[goodsCount];
        let aLi = document.createElement("a");
        setHtml("goodsName" + index, element.goodsName);
        setHtml("goodsDescription" + index, goodsDescSummary(element.introduction));
        showBorder(index);
        aLi.setAttribute("class", "btn btn-primary");
        aLi.innerHTML = "购买";
        aLi.setAttribute("href", "goods.html?" + index);
        $("#href" + index).append(aLi);
    }
}

function setHtml(id, value) {
    $("#"+id).html(value);
}

function showBorder(index) {
    document.getElementById("border" + index).setAttribute("style", "");
}

function goodsDescSummary(goodsIntroduction) {
    return goodsIntroduction;
}

function updatePageNum() {
    document.getElementById("pageIndex").innerHTML = String(pageIndex);
    document.getElementById("pageNum").innerHTML = String(pageNum);
    document.getElementById("goodsTotal").innerHTML = String(goodsTotal);
}

function empty() {
    $(".needEmpty").empty();
    $(".needEmptyBorder").css("style", "border:none");

}