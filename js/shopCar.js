app.controller("shopCarCtrl",function ($scope,$http) {
    // 数量减
    $scope.minus = function (x) {
        if ($(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val()>1){
            $(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val($(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val()-1);
            $(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find(".GoodsPrices").text("¥"+$(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val()*x.price+".00");
        }

    }
    // 数量加
    $scope.plus = function (x) {
        $(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val($(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val()-(-1))
        $(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find(".GoodsPrices").text("¥"+$(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val()*x.price+".00")
    }
    $scope.heJiMoney="0";
    // 点击商品按钮
    $scope.GoodsCheck = function (x) {
        if($(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find(".goods-check").is(':checked')){
            $scope.heJiMoney=$scope.heJiMoney-(-$(".goods-msg").eq($scope.shopCarProduct.indexOf(x)).find('.am-num-text').val()*x.price);
        }else{
            $scope.heJiMoney="0";
        }
    }
    //店铺按钮
    $scope.ShopCheck = function () {
        if ($('.ShopCheck').prop("checked") == true) { //如果全选按钮被选中
            $(".goods-check").prop('checked', true); //所有按钮都被选中
            for(var i=0;i<$(".goods-msg").length;i++){
                $scope.heJiMoney=$scope.heJiMoney-(-($(".am-num-text").eq(i).val()*$(".shop-total-amount").eq(i).text().split('¥')[1].split('.')[0]))
            }

        } else {
            $(".goods-check").prop('checked', false); //else所有按钮不全选
            $scope.heJiMoney = "0";
        }
        $(".ShopCheck").change()
    }

    // 点击全选按钮
    $("#AllCheck").click(function() {
        if ($("#AllCheck").prop("checked") == true) { //如果全选按钮被选中
            $(".goods-check").prop('checked', true); //所有按钮都被选中
            for(var i=0;i<$(".goods-msg").length;i++){
                $scope.heJiMoney=$scope.heJiMoney-(-($(".am-num-text").eq(i).val()*$(".shop-total-amount").eq(i).text().split('¥')[1].split('.')[0]))
            }

        } else {
            $(".goods-check").prop('checked', false); //else所有按钮不全选
            $scope.heJiMoney = "0";
        }
        $(".ShopCheck").change(); //执行店铺全选的操作
    });
    //删除
    $scope.delete = function (tradeName,event) {

        console.log(tradeName);
        $http.jsonp("http://127.0.0.1:5202/deleteShopCar?username="+localStorage.username+"&tradeName="+tradeName+"&callback=JSON_CALLBACK").success(function (data) {
            console.log(data);
            if (data.info){
                alert("删除成功");
                $(event.target).parents("tr").remove();
            }else{
                alert("删除失败");
            }
        }).error(function (err) {
            console.log(err);
        })
    }
    //批量删除
    $(".del").click(function(){
    $(".shop-gouwu").css("display","block");
        $(".shop-gou").css("display","none");
    });

    //从数据库取购物车信息
    $http.jsonp("http://127.0.0.1:5202/shopCar?username="+localStorage.username+"&callback=JSON_CALLBACK").success(function (data) {
        // console.log(data[0].shopCar);
        $scope.shopCarProduct = data[0].shopCar;
    }).error(function (err) {
        console.log(err);
    })



});
