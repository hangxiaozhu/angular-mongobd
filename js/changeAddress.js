app.controller("changeAddress",function ($scope,$location,$http) {
    // //三级联动
    // alert(111111);
    console.log($location.$$search);
    $scope.user = $location.$$search.user;
    var index= $location.$$search.index;
    // console.log(index);
    var sheng = document.getElementById("change-province1");
    var shi = document.getElementById("change-city_add1");
    var xian = document.getElementById("change-area1");
    var username = localStorage.getItem("username");
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
    $scope.saveChange=function () {

        var name = $("#change-name").val();
        var shengs = $("#change-province1").find("option:selected").text();
        var city = $("#change-city_add1").find("option:selected").text();
        var county = $("#change-area1").find("option:selected").text();
        var detailed = $("#change-detailed").val();
        var liphone = $("#change-iphone1").val();
        var giphone = $("#change-iphone2").val();
        $http.jsonp("http://10.90.93.228:5202/changeAddress?name="+ name +"&sheng="+ shengs +"&city="+ city +"&county="+ county +"&detailed="+ detailed +"&liphone="+ liphone +"&giphone="+ giphone +"&username="+ username +"&index="+ index +"&callback=JSON_CALLBACK").success(function (data) {
            console.log(data);
            if (data=="true"){
                alert("修改成功");
                $location.path("myCenter/address");
            }else{
                alert("请完善您的地址信息");
            }


        }).error(function (err) {
            console.log(err)
        });
        // location.reload();
        // $(".add-news").show();
        // $(".add-new").hide();
    };

});