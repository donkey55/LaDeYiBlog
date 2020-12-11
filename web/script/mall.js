let userName = $.cookie("account");
let goodsList;
let pageIndex = 1;
let pageNum = 1;
let goodsNum = 0;
let goodsTotal = 0;
let goodsCount = 0;
$(function(){
    setHtml("userName", userName);
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowGoodsInfoServlet",
        data: {
        },
        dataType: "json",
        success: function (data) {
            goodsList = data;
            if(goodsList.length > 0){
                pageNum = Math.ceil(goodsTotal/9);
            }
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
        updatePageNum();
    }
}

function pageUp() {
    if(goodsCount > goodsNum){
        goodsCount -= (goodsNum + 9);
        empty();
        showGoods();
        pageIndex--;
        updatePageNum();
    }
}

function showGoods() {
    for (let index = 0; index < 9 && index < goodsTotal; index++, goodsCount++, goodsNum++) {
        const element = goodsList[goodsCount];
        let aLi = document.createElement("a");
        setHtml("goodsName" + String(index+1), element.goodsName);
        setHtml("goodsDescription" + String(index+1), goodsDescSummary(element.goodsIntroduction));
        //设置照片
        document.getElementById("goodsImg" + String(index+1))
            .setAttribute("src", element.goodsImg);
        showBorder(index+1);
        aLi.setAttribute("class", "btn btn-primary");
        aLi.innerHTML = "购买";
        aLi.setAttribute("href", "goods.html?" + element.goodsId + "?" + $.cookie("account"));
        $("#href" + String(index+1)).append(aLi);
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
    goodsNum = 0;
    $(".needEmpty").empty();
    $(".needEmptyBorder").css("style", "border:none");

}