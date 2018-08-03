app.controller("handlensCtrl",function ($scope,$rootScope,$stateParams,$http) {

    $scope.product = $stateParams;

    // console.log($stateParams);
    var smallDiv = document.getElementsByClassName("lens-small")[0];
    var zoomEle = document.getElementById("zoom");
    var bigDiv = document.querySelector(".lens-big");
    var bigImg = bigDiv.firstElementChild;
    var username = localStorage.getItem("username");
    var tradeName=$stateParams.tradeName;
    var flag;
    $http.jsonp("http://10.90.93.228:5202/getinfo?username="+ username +"&name="+ tradeName +"&callback=JSON_CALLBACK").success(function (data) {
        // console.log(data);
        if(data==true){
            flag=true;
        }else{
            flag=false;
        }
        if(flag==true){

            $(".sprite").css("background-position","-59px -37px");
            $(".sprite").next().text("已收藏");
        }else if(flag==false){

            $(".sprite").css("background-position","-60px -76px");
            $(".sprite").next().text("收藏此藏品");
        }


    });


//			var num = $("#lens-nums").val();
    //当鼠标移入到左侧小图区域时
    smallDiv.onmouseover = function() {
        //让放大镜和右侧大图区域出现
        zoomEle.style.display = "block";
        bigDiv.style.display = "block";

        //当鼠标在左侧小图区域移动时
        smallDiv.onmousemove = function(eve) {
            var e = window.event || eve;
            //获取鼠标位于左侧小图区域的位置
            var x = e.pageX - smallDiv.parentElement.offsetLeft - zoomEle.clientWidth / 2;
            var y = e.pageY - smallDiv.parentElement.offsetTop - zoomEle.clientHeight / 2;
//					console.log(e.clientY);
            //边界限制
            //获取最大可移动的距离
            var maxL = smallDiv.offsetWidth - zoomEle.offsetWidth;
            var maxT = smallDiv.offsetHeight - zoomEle.offsetHeight;
            //左侧超出
            if(x < 0) x = 0;
            //右侧超出
            if(x > maxL) x = maxL;
            //上侧超出
            if(y < 0) y = 0;
            //下侧超出
            if(y > maxT) y = maxT;

            //修改放大镜区域的位置
            zoomEle.style.left = x + "px";
            zoomEle.style.top = y + "px";

            //让右侧区域展示一定比例的放大镜区域的放大图
            //比例：放大镜方块当前移动的位置占可移动距离的比例=右侧大图移动的位置占所能移动的距离
            var scaleX = x / maxL;
            var scaleY = y / maxT;
            /*方式1：*/

            bigDiv.scrollLeft = scaleX * (bigImg.offsetWidth - bigDiv.offsetWidth);
            bigDiv.scrollTop = scaleY * (bigImg.offsetHeight - bigDiv.offsetHeight);

            /*方式2： 修改右侧大图区域内图片的偏移量
             */
//					bigImg.style.position = "absolute";
//					bigImg.style.left = -scaleX * (bigImg.offsetWidth - bigDiv.offsetWidth) + "px";
//					bigImg.style.top = -scaleY * (bigImg.offsetHeight - bigDiv.offsetHeight) + "px";

        }
    }

    //当鼠标移除左侧小图区域时 隐藏右侧大图区域和放大镜方块
    smallDiv.onmouseout = function() {
        zoomEle.style.display = "none";
        bigDiv.style.display = "none";
    }

    $("#minus").click(function(){
        var n=$(this).next().val();
        var num=parseInt(n)-1;
        if(num==0){ return;}
        $(this).next().val(num);
    })
    $("#add").click(function(){
        var n=$(this).prev().val();
        var num=parseInt(n)+1;
        if(num==0){ return;}
        $(this).prev().val(num);
    })
    $scope.myCollect=function () {
        var discounts=$stateParams.discounts;
        var imgSrc=$stateParams.imgSrc;
        var price=$stateParams.price;

        if (flag==false) {
            $(".sprite").css("background-position","-59px -37px");
            $(".sprite").next().text("已收藏");
            //收藏商品
                $http.jsonp("http://10.90.93.228:5202/myCollect?username="+ username +"&tradeName="+ tradeName +"&imgSrc="+ imgSrc +"&price="+ price +"&discounts="+ discounts +"&callback=JSON_CALLBACK").success(function (data) {
                    console.log(data);
                    if (data){
                        alert("收藏成功");
                    }else{
                        alert("收藏失败");
                    }
                });
            flag=!flag;
        }else if (flag==true) {
            $(".sprite").css("background-position","-60px -76px");
            $(".sprite").next().text("收藏此藏品");
            //取消收藏
            // $scope.myCollect=function (info) {

                $http.jsonp("http://10.90.93.228:5202/removeCollect?username="+ username +"&tradeName="+ tradeName +"&callback=JSON_CALLBACK").success(function (data) {
                    console.log(data);
                    if(data){
                        alert("取消收藏成功");
                    }else{
                        alert("取消收藏失败");
                    }

                })


            // };
            flag=!flag;
        }

    }
    $(".l-come")[0].onclick = leftClick;

    function leftClick(){
        $(".l-come")[0].onclick = null;
//				console.log($(".l-show>ul").offset().left);

        if ($(".l-show>ul").offset().left!=80) {
            $(".l-show>ul").animate({
                left:"+=115"
            }, "normal", function(){
                $(".l-come")[0].onclick = leftClick;
            })
        }


    };


    $(".l-next")[0].onclick = rightClick;

    function rightClick(){
        $(".l-next")[0].onclick = null;
//				console.log($(".l-show>ul").offset().left);
        if ($(".l-show>ul").offset().left!=-35) {
            $(".l-show>ul").animate({
                left:"-=115"

            },"normal",function(){
                $(".l-next")[0].onclick = rightClick;
            })
        }
    }
    $(".lens-title a").click(function(){
        $(".lens-title a").removeClass("lens-active");
        $(this).addClass("lens-active");
    })
    $(".l-show ul li>img").click(function(){
        var smi = $(this).prop("src");
        $("#small-img").attr("src",smi);
    });
    $(".l-show ul li>img").click(function(){
        var smq = $(this).prop("src");
        $("#big-img").attr("src",smq);
    });

    //加入购物车
    $rootScope.addShopCar = function (product) {
        console.log(product);
        $.ajax("http://10.90.93.228:5202/addShopCar",{
            dataType:"jsonp",
            type:"get",
            data:{
                username:localStorage.username,
                tradeName:product.tradeName,
                imgSrc:product.imgSrc,
                price:product.price
            },
            success:function(data){
                console.log(data);
                if (data.info){
                    // alert("加入购物车成功");
                    $("#small-img1").animate({
                        left:"+=1100px",
                        top:"-=200px",
                        width:"20px",
                        height:"20px",
                    },1000);
                    setTimeout(function () {
                        $("#small-img1").css("display","none");
                    },1000)
                }else{
                    alert("加入购物车失败");
                }
            }
        })
    }

    //立即购买
    $scope.buyNow = function (product) {
        console.log(product);
    }



})