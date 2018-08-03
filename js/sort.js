app.controller("sortCtrl",function ($scope,$http,$rootScope) {
	$(".sort-sequence p").click(function(){
		$(".sort-sequence p").removeClass("sort-aa");
		$(this).addClass("sort-aa");
	});
    $http.jsonp("http://127.0.0.1:5202/sort?callback=JSON_CALLBACK").success(function (data) {

		//所有商品的category数组
        $scope.category=[];
        for (var i = 0; i < data.length; i++){
            $scope.category.push(data[i].category);
        }
        //去重后的category1的数组
        $scope.category0=[];
        for (var i = 0; i < $scope.category.length;i++){
            if ($scope.category0.indexOf($scope.category[i].category1)==-1){
                $scope.category0.push($scope.category[i].category1);
            }
        }

        //声明一级分类全部商品
        $scope.categoryFen = data;
		//1级分类的各个按钮点击事件
        $rootScope.sortC1 = function (index,name) {
        	//所有的二级分类数组 包括重复的
            $scope.categoryE=[];
            //每个分类的商品数组
            $scope.categoryF = [];
            for (var i = 0; i < $scope.category.length; i++){
                if ($scope.category[i].category1 == name){
                    $scope.categoryE.push($scope.category[i].category2);
                    $scope.categoryF.push(data[i]);
                    getPageCount();
                    $scope.getProsByPage(1);
                }
            }
            $scope.categoryFen = $scope.categoryF;
			//去重后的二级分类数组
            $scope.categoryE0=[];
            for (var i = 0; i < $scope.categoryE.length; i++){
                if ($scope.categoryE0.indexOf($scope.categoryE[i])==-1){
                    $scope.categoryE0.push($scope.categoryE[i]);
                    getPageCount();
                    $scope.getProsByPage(1);
                }
            }
			$(".sort-first p").removeClass("us");
			$(".sort-first p").eq(index+1).addClass("us");
			$(".sort-second>p").removeClass("sort-rs");
			$(".sort-second .sort-ab").addClass("sort-rus");
			$(".sort-second").css("display","block");
			$(".sort-two").css("visibility","visible");
			var b = $(".sort-first p").eq(index+1).text();
			$(".sort-two").text(">"+b);
			$(".sort-thire").text("");
        }
        //1级分类的全部按钮点击事件
        $rootScope.sortOneAll = function () {
            $(".sort-first p").removeClass("us");
            $(".sort-first p").eq(0).addClass("us");
			$(".sort-second").css("display","none");
			$(".sort-two").css("visibility","hidden");
			$(".sort-thire").css("visibility","hidden");
			$scope.categoryFen = data;
            getPageCount();
            $scope.getProsByPage(1);
        }
        //二级分类的各个按钮点击事件
        $rootScope.sortC2 = function (index,name) {
        	// console.log(index,name);
			//二级分类的筛选后的数组
        	$scope.categoryFenTwo = [];
			$(".sort-second .sort-ab").removeClass("sort-rus");
			$(".sort-second>p").removeClass("sort-rs");
			$(".sort-second>p").eq(index+1).addClass("sort-rs");
			$(".sort-thire").css("visibility","visible");
			var c = $(".sort-second>p").eq(index+1).text();
			$(".sort-thire").text(">"+c);
			for (var i = 0; i < data.length; i++){
				if (data[i].category.category2 == name){
                    $scope.categoryFenTwo.push(data[i]);
                    getPageCount();
                    $scope.getProsByPage(1);
				}
			}
            $scope.categoryFen = $scope.categoryFenTwo;
            getPageCount();
            $scope.getProsByPage(1);
        }
        //二级分类的全部按钮点击事件
        $rootScope.sortSeAll = function () {
            $(".sort-thire").css("visibility","hidden");
            $(".sort-second>p").removeClass("sort-rs");
            $(".sort-second>p").eq(0).addClass("sort-rs");
            $scope.categoryFen = $scope.categoryF;
            getPageCount();
            $scope.getProsByPage(1);
        }
        //点击从高到低排序
		$scope.highToLow = function () {
            function compare(price){
                return function(a,b){
                    var value1 = a[price];
                    var value2 = b[price];
                    return value2 - value1;
                }
            }
            $scope.categoryFen.sort(compare('price'));
            // console.log($scope.categoryFen);
            $scope.getProsByPage(1);
        }
        //点击从低到高排序
        $scope.lowToHigh = function () {
            function compare(price){
                return function(a,b){
                    var value1 = a[price];
                    var value2 = b[price];
                    return value1 - value2;
                }
            }
            $scope.categoryFen.sort(compare('price'));
            $scope.getProsByPage(1);
        }

        // console.log($scope.categoryFen);

        //分页器
        function getPageCount() {
            var count = Math.ceil($scope.categoryFen.length / 20);
            var arr = [];
            for (var i = 1; i <= count; i++){
                arr.push(i);
            }
            $scope.page = arr;
        }
        getPageCount();

        //声明一个变量存储当前的分页按钮
        $scope.clickBtn = "1";
        //分页按钮的点击事件
        $scope.getProsByPage = function (page) {
            // console.log(page);
            $scope.categoryFens= $scope.categoryFen.slice((page-1)*20,page*20);
            $scope.clickBtn = page;
        }
        $scope.getProsByPage(1);

        //给分页按钮赋classde函数
        $scope.getClassByPage = function (className) {
            // console.log(className);
            return $scope.clickBtn == className ? "btn-primary" : "";
        }
    }).error(function (err) {
        console.log(err);
    })


});