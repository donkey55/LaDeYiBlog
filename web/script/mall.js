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
            goodsTotal = data.length;
            if(goodsList.length > 0){
                pageNum = Math.ceil(goodsTotal/9);
            }
            pageIndex = 1;
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
    for (let index = 0; index < 9 && goodsCount < goodsTotal; index++, goodsCount++, goodsNum++) {
        showBorder(index+1);
        const element = goodsList[goodsCount];
        let aLi = document.createElement("a");
        setHtml("goodsName" + String(index+1), element.goodsName);
        setHtml("goodsDescription" + String(index+1), goodsDescSummary(element.goodsIntroduction));
        //设置照片
        document.getElementById("goodsImg" + String(index+1))
            .setAttribute("src", element.goodsImg);
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
    document.getElementById("border" + String(index)).removeAttribute("hidden");
    document.getElementById("border" + index).innerHTML="<img alt=\"\" src=\"\" id=\"goodsImg"+ String(index) +"\" height=\"140\" width=\"140\"/>\n" +
        "                            <div class=\"caption\" align=\"center\">\n" +
        "                                <h3 id=\"goodsName"+ String(index) +"\" class=\"needEmpty\">\n" +
        "\n" +
        "                                </h3>\n" +
        "                                <p id=\"goodsDescription"+ String(index) +"\" class=\"needEmpty\">\n" +
        "\n" +
        "                                </p>\n" +
        "                                <p style=\"text-align: right;\" id=\"href"+ String(index) +"\" class=\"needEmpty\">\n" +
        "\n" +
        "                                </p>\n" +
        "                            </div>"
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
    //$(".needEmptyBorder").css("style", "border:none");
    for(let index = 1; index <= 9; index++){
        document.getElementById("border" + String(index))
            .setAttribute("style", "border:none");
        document.getElementById("border" + String(index))
            .setAttribute("hidden", "hidden");
        $("#border" + String(index)).empty();
    }
}