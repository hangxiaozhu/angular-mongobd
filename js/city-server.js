app.controller("city-serverCtrl",function ($scope,$http,$stateParams) {
    // console.log($stateParams.pn);
    // $scope.pn = $stateParams.pn;
    var des = sessionStorage.getItem("des");
    $http.jsonp("http://127.0.0.1:5202/cityServer?des="+des+"&callback=JSON_CALLBACK").success(function (data) {
        console.log(data);
        var arr=[];
        $scope.cityType = data[0].server;

        $scope.des=data[0].description;
        $scope.type=data[0].type;

        $scope.address = data[0].address;
        $scope.time = data[0].time;
        $scope.price = data[0].price;
        $scope.phone = data[0].phoneNum;
        $scope.photo = data[0].photo;
        $scope.server = data[0].Score.server;
        $scope.shop = data[0].Score.shop;
        $scope.descript = data[0].Score.descript;
        for (var i =0;i<data[0].server.length;i++){
            for (var k =0;k<data[0].server[i].servers.length;k++){
                arr.push(data[0].server[i].servers[k]);
            }
        }
        $scope.cityInfo = arr;
        console.log(arr);

        $scope.giveType=function (index,p) {
            $(".server-title a").removeClass("server-click");
            $(".server-title a").eq(index+1).addClass("server-click");
            var arrType=[];
            console.log(p);
            for(var i =0;i<data[0].server.length;i++){

                if(p.type==data[0].server[i].type){
                    for (var k=0;k<data[0].server[i].servers.length;k++){
                        arrType.push(data[0].server[i].servers[k]);
                    }

                }
            }
            $scope.cityInfo=arrType;
            console.log(arrType);
        }
        $scope.giveAll=function () {
            $scope.cityInfo=arr;
            console.log(arr);
        }




    }).error(function (err) {
        console.log(err);
    });
    var smallDiv = document.getElementsByClassName("server-left")[0];
    var zoomEle = document.getElementById("server-zoom");
    var bigDiv = document.querySelector(".server-big");
    var bigImg = bigDiv.firstElementChild;
    // var flag = false;
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
            // console.log(e.clientY);
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
    };

    //当鼠标移除左侧小图区域时 隐藏右侧大图区域和放大镜方块
    smallDiv.onmouseout = function() {
        zoomEle.style.display = "none";
        bigDiv.style.display = "none";
    }



});
