app.controller("confirmCtrl",function ($scope,$stateParams) {
    $scope.product = $stateParams;
    console.log($scope.product);
/* 购物车订单计算价格区域 */
(function(range){
    $(".sub",range).click(function(){
        var val = $(this).next().children("input"), num;
        num = parseInt(val.val());
        if(num > 1) val.val(num-1);
        finalTotal();
    });
    $(".add",range).click(function(){
        var val = $(this).prev().children("input"), num;
        num = parseInt(val.val());
        var store_num=val.attr('sun');
        if(num>=store_num){
            val.val(store_num);
        }else{
            val.val(num+1);
        }
        finalTotal();
    });
    $(".num input",range).blur(function(){
        var val = $(this);
        var num = parseInt(val.val());
        var store_num=val.attr('sun');
        if(num>=store_num){
            val.val(store_num);
        }
        if(num > 0){
            finalTotal();
        }else{
            $(this).val(1);
        }
    });
}($(".trans-num")));

//计算每一列价格
function everyList(){
    var listCalcObj = $("table");
    $("tr",listCalcObj).not(".last,.first").each(function(i,f){
        var unitPrice = parseFloat($scope.product.price);
        var unitCount = parseInt($(".num input",$(f)).val());
        $(".list-total-price",$(f)).html(parseFloat(unitPrice*unitCount).toFixed(2));
    });
}
//分类产品价格额计算
function classTotal(){
    everyList();
    var range = $(".cat-goods");
    range.each(function(i,f){
        var listTotal = 0;
        $(".list-total-price",$(f)).each(function(i,t){
            var _p = $(t).parents("tr");
            listTotal += parseFloat($(t).html());
        });
        var freeshipp=parseFloat($('.freeshipp',$(f)).val()).toFixed(2);
        var total_price=0
        if(freeshipp>0&&freeshipp<=parseFloat(listTotal)){
            $(".postage-price",$(f)).html(total_price);
            $(".total-price",$(f)).html(parseFloat(listTotal).toFixed(2));
        }else{
            var postage_price=0
            $('input[name="nums[]"]',$(f)).each(function(i,t){
                postage_price += parseFloat($(t).attr('cid'))*parseFloat($(t).val());
            });
            total_price =parseFloat(parseFloat(postage_price)+parseFloat(listTotal)).toFixed(2);
            $(".postage-price",$(f)).html(postage_price);
            $(".total-price",$(f)).html(total_price);
        }
        $(".class-total-price",$(f)).html(parseFloat(listTotal).toFixed(2));
    });
}
//计算最终价格
function finalTotal(){
    classTotal();
    var totalNum = 0;
    var scale=1;
    $(".total-price").each(function(i,f){
        totalNum += parseFloat($(f).html());
    });
    var jifen=parseInt(totalNum*scale);
    $('#jifen').html(jifen);
    $("#final-price").html(totalNum.toFixed(2));
}


finalTotal();

$(".time-1").click(function () {
    $(".time-2").toggle();
});
$(".but-a").click(function () {
    $(".time-2").hide();
});
$("td").click(function () {
    var butd = $(this).text();
    $("#times").text(butd);
});

$(".but-a").click(function () {
    $(".address-a").css("display","none");
    $(".address-list").css("display","block");
});
$(".address-new p").click(function () {
    $(".address-total").css("display","block");
});

$(".address-return").click(function () {
    $(".address-total").css("display","none");
});

$(".address-submit").click(function () {
    $(".address-total").css("display","none");
});
$(".update").click(function () {
    $(".address-total").css("display","block");
});

//    $(".default").click(function () {
//        $(this).css("display","none");
//    });

    //三级联动
    var sheng = document.getElementsByClassName("province")[0];
    var shi = document.getElementsByClassName("city_add")[0];
    var xian = document.getElementsByClassName("area")[0];

    //省的输入框被点击时
    sheng.onclick = function() {
        //调用省份的函数
        shengFun();
        //输入框内容发生变化时
        /*onchange 事件会在域的内容改变时发生。
         * onchange 事件也可用于单选框与复选框改变后触发的事件。
         * onchange 属性可以使用于： <input>, <select> , <textarea>。
         */
        //控制省份的输入框内容发生变化时
        sheng.onchange = function () {
            //selectedIndex 属性可设置或返回下拉列表中被选中选项的索引号
            var n = this.selectedIndex;
            //调用控制市的函数
            shiFun(n);

            //当市的输入框内容发生变化时
            shi.onchange = function () {
                var m = this.selectedIndex;
                //调用控制县的函数
                xianFun(n,m);
            };
        };
    }

    //省份的函数
    function shengFun () {
        //定义外部地址资源 provinceList数组的长度 为len
        var len = provinceList.length;
        var show = ""; //定义显示的内容
        for (var i = 0; i < len; i++) {
            show += "<option value =" + i + ">" + provinceList[i].name + "</option>";
        }
        sheng.innerHTML = show;
        //调用控制市的函数
        shiFun(0);
    }
    //控制市的函数
    function shiFun (n) {
        /*
         * 在provinceList数组中: cityList是市列表
         */
        var shiArr = provinceList[n].cityList;
        var len = shiArr.length;
        var show = "";
        for (var i = 0; i < len; i++) {
            show += "<option value = " + i + ">" + shiArr[i].name + "</option>";

        }
        shi.innerHTML = show;
        //调用控制县的函数
        xianFun(n,0);
    }

    //控制xian的函数
    function xianFun (n,m) {
        /*
         * 在provinceList数组中: areaList是县/区列表
         */
        var xianArr = provinceList[n].cityList[m].areaList;
        var len = xianArr.length;
        var show = "";
        for (var i = 0; i < len; i++) {
            show += "<option>" + xianArr[i] + "</option>";
        }
        xian.innerHTML = show;
    }


});