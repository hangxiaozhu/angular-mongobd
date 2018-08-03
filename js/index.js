var filters = angular.module("filters",[]);
var app = angular.module("app",["ui.router","filters"]);
app.config(function ($stateProvider,$urlRouterProvider) {
    // $urlRouterProvider.otherwise("/home");
    $stateProvider.state("home",{
        url:"/home",
        templateUrl:"home.html",
        controller:"homeCtrl"
    }).state("city",{
        url:"/city",
        templateUrl:"city.html",
        controller:"cityCtrl"
    }).state("friday",{
        url:"/friday",
        templateUrl:"friday.html"
    }).state("integralStore",{
        url:"/integralStore",
        templateUrl:"integralStore.html",
        controller:"integralStoreCtrl"
    }).state("myCenter",{
        url:"/myCenter",
        templateUrl:"myCenter.html",
        controller:"myCenterCtrl"
    }).state("shopCar",{
        url:"/shopCar",
        templateUrl:"shopCar.html",
        controller:"shopCarCtrl"
    }).state("login",{
        url:"/login",
        templateUrl:"login.html",
        controller:"loginCtrl"
    }).state("special",{
        url:"/special",
        templateUrl:"special.html"
    }).state("protect",{
        url:"/protect",
        templateUrl:"protect.html"
    }).state("base",{
        url:"/base",
        templateUrl:"base.html"
    }).state("punctual",{
        url:"/punctual",
        templateUrl:"punctual.html"
    }).state("monitor",{
        url:"/monitor",
        templateUrl:"monitor.html"
    }).state("myCenter.myAcc",{
        url:"/myAcc",
        templateUrl:"myAcc.html",
        controller:"myAccCtrl"
    }).state("myCenter.myOder",{
        url:"/myOder",
        templateUrl:"myOder.html",
        controller:"myOderCtrl"
    }).state("myCenter.myScore",{
        url:"/myScore",
        templateUrl:"myScore.html"
    }).state("myCenter.scoreOder",{
        url:"/scoreOder",
        templateUrl:"scoreOder.html"
    }).state("myCenter.myMoney",{
        url:"/myMoney",
        templateUrl:"myMoney.html",
        controller:"myMonerCtrl"
    }).state("myCenter.fillCar",{
        url:"/fillCar",
        templateUrl:"fillCar.html"
    }).state("myCenter.mySelfData",{
        url:"/mySelfData",
        templateUrl:"mySelfData.html"
    }).state("myCenter.address",{
        url:"/address",
        templateUrl:"address.html",
        controller:"addressCtrl"
    }).state("myCenter.myshoucang",{
        url:"/myshoucang",
        templateUrl:"myshoucang.html",
        controller:"myCollect"
    }).state("myCenter.myLook",{
        url:"/myLook",
        templateUrl:"myLook.html"
    }).state("myCenter.changePw",{
        url:"/changePw",
        templateUrl:"changePw.html"
    }).state("myCenter.myIfo",{
        url:"/myIfo",
        templateUrl:"myIfo.html"
    }).state("myCenter.myIdea",{
        url:"/myIdea",
        templateUrl:"myIdea.html"
    }).state("newuser",{
        url:"/newuser",
        templateUrl:"newuser.html"
    }).state("sort",{
    	url:"/sort",
        templateUrl:"sort.html",
        controller:"sortCtrl"
    }).state("handlens",{
        url:"/handlens?discounts&price&tradeName&imgSrc",
        templateUrl:"handlens.html",
        controller:"handlensCtrl"
    }).state("city-server",{
        url:"/city-server",
        templateUrl:"city-server.html",
        controller:"city-serverCtrl"
    }).state("confirm",{
        url:"/confirm?heJiMoney&tradeName&imgSrc&price",
        templateUrl:"confirm.html",
        controller:"confirmCtrl"
    }).state("contentpay",{
        url:"/contentpay",
        templateUrl:"contentpay.html",
        controller:"contentpayCtrl"
    }).state("myCenter.addAddress",{
        url:"/addAddress",
        templateUrl:"addAddress.html",
        controller:"addAddressCtrl"
    }).state("myCenter.changeAddress",{
        url:"/changeAddress",
        templateUrl:"changeAddress.html",
        controller:"changeAddress"
    })
});
app.controller("mainCtrl",function ($scope,$http,$rootScope,$location,$timeout) {
    //进入购物车的点击事件
    // $(".shop-click").click(function () {
    //     $(".index-bottom").hide();
    //     $(".index-nav").hide();
    //
    //
    // });
    $(".index-nav>a").click(function () {
        $(".index-nav>a").removeClass("index-nav-active");
        $(this).addClass("index-nav-active");
    });
    $(".index-nav>span").mouseenter(function () {
        $(".index-nav>ul").css("display","block");
    });
    $(".index-nav").mouseleave(function () {
        $(".index-nav>ul").css("display","none");
    });
    $(".index-nav>ul").mouseenter(function () {
        $(".index-nav-classify").css("display","block");
    });
    $(".index-nav>ul").mouseleave(function () {
        $(".index-nav-classify").css("display","none");
    });
    $http.jsonp("http://10.90.93.228:5202/index?callback=JSON_CALLBACK").success(function (data) {

        $scope.category=[];
        for (var i = 0; i < data.length; i++){
            $scope.category.push(data[i].category);
        }
        $scope.category0=[];
        for (var i = 0; i < $scope.category.length;i++){
            if ($scope.category0.indexOf($scope.category[i].category1)==-1){
                $scope.category0.push($scope.category[i].category1);
            }
        }
        $scope.indexME = function (index,name) {
            $scope.categoryE=[];
            $(".index-nav>ul>li").eq(index).css("background","#f4f9ed");
            for (var i = 0; i < $scope.category.length; i++){
                if ($scope.category[i].category1 == name){
                    $scope.categoryE.push($scope.category[i].category2);
                }
            }
            $scope.categoryE0=[];
            for (var i = 0; i < $scope.categoryE.length; i++){
                if ($scope.categoryE0.indexOf($scope.categoryE[i])==-1){
                    $scope.categoryE0.push($scope.categoryE[i]);
                }
            }
        }
        $scope.indexML = function (index,name) {
            $(".index-nav>ul>li").eq(index).css("background","white");
        }
    }).error(function (err) {
        console.log(err);
    })
    //退出用户
    $scope.exit = function () {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("username");

        $rootScope.login = false;
        $rootScope.username = "";
    }
    $rootScope.login = localStorage.isLogin;
    $rootScope.username = localStorage.username;

//顶部登录注册按钮
    $scope.indexLogin = function () {
        $(".index-on").hide();
        $(".index-nav").hide();
        $(".forget").hide();
        $(".index-title").css("display","inline-block");
        $(".index-title>span").text("会员登录");
        $(".register").hide();
        $(".login-log").show();
    }

    $scope.indexRegister = function () {
        $(".index-on").hide();
        $(".index-nav").hide();
        $(".forget").hide();
        $(".index-title").css("display","inline-block");
        $(".index-title>span").text("会员注册");
        $(".login-log").hide();
        $(".register").show();
    }
    $("#index-logo a").click(function () {
        $(".index-on").show();
        $(".index-nav").show();
        $(".index-title").css("display","none");
    })

    //检查是否登录,登录可以进个人页面,不登录跳转到登录页面
    $scope.myCenter = function () {
        if ($rootScope.login){
            $location.path("/myCenter");
        }else {
            $location.path("/login");
        }
    }
    //我的订单
    $scope.myIndent = function () {
        if ($rootScope.login){
            $location.path("/myCenter/myOder");
        }else {
            $location.path("/login");
        }
    }
    $scope.myInfo = function () {
        if ($rootScope.login){
            $location.path("/myCenter/myIfo");
        }else {
            $location.path("/login");
        }
    }
    $scope.shopCar = function () {
        if ($rootScope.login){
            console.log(111);
            $location.path("/shopCar");
        }else {
            console.log(222);
            $location.path("/login");
        }
    }
    //购物车商品数量
    $http.jsonp("http://10.90.93.228:5202/shopCar?username="+localStorage.username+"&callback=JSON_CALLBACK").success(function (data) {
        $scope.shopCarShu = data[0].shopCar.length;
    }).error(function (err) {
        console.log(err);
    })


    //三级联动
    	var sheng = document.getElementById("sheng");
		var shi = document.getElementById("shi");
		var xian = document.getElementById("xian");
		
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
		$(".index-city").click(function(){
			$(".index-zhe").css("display","block");
			$(".index-zhao").css("display","block");
			$("body").css("height","100%").css("overflow","hidden");
		});
		$(".index-zhao>input").click(function(){
			$(".index-zhe").css("display","none");
			$(".index-zhao").css("display","none");
			$("body").css("height","100%").css("overflow","visible");
		var sheng = $("#sheng").find("option:selected").text();
        var shi = $("#shi").find("option:selected").text();
        var qu = $("#xian").find("option:selected").text();
        $(".index-city").text(sheng+shi+qu);
        $(".index-success").css("display","block"); 
        $(".index-success").fadeOut();
		});

		//搜索按钮事件
    $("#search").click(function () {

    })
});

