app.controller("cityCtrl",function ($scope,$http) {
    $http.jsonp("http://10.90.93.228:5202/city?callback=JSON_CALLBACK").success(function (data) {
        console.log(data);
        $scope.kind=data;

        $scope.city=data;

        $scope.getType =  function(index,ser){
            $(".city-lei a").eq(index+1).attr("class","lei-click");
            $(".city-lei a").eq(index+1).siblings().attr("class","lei-wei");
            console.log(index);


            var arr=[];
            // console.log(ser);
            for(var i =0;i<data.length;i++){
                if(ser.type==data[i].type){
                    arr.push(ser);
                }
            }
            $scope.city=arr;
            //如果点击全部
            $scope.getAll = function () {
                $scope.city=data;
                $(".city-lei a").eq(0).attr("class","lei-click");
                $(".city-lei a").eq(0).siblings().attr("class","lei-wei");
            }
        };
    $scope.change = function (ser) {
         sessionStorage.setItem("des",ser.description);
    }


    }).error(function (err) {
        console.log(err);
    })


});
