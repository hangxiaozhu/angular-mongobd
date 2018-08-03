app.controller("myCollect",function ($scope,$http,$location) {
    var username = localStorage.getItem("username");
    $http.jsonp("http://10.90.93.228:5202/aginCollect?username="+ username  +"&callback=JSON_CALLBACK").success(function (data) {

            console.log(data);
            $scope.myCollect=data;

    })
    $scope.removeCtrl=function (info,event) {
        var tradeName=info.tradeName;
        console.log($(event.target).parent());

        $http.jsonp("http://10.90.93.228:5202/cancelCollect?username="+ username  +"&tradeName="+ tradeName +"&callback=JSON_CALLBACK").success(function (data) {
            console.log(data);
            if (data==true){
                alert("取消收藏成功");
                $(event.target).parent("li").remove();
            }else{
                alert("取消收藏失败");
            }
        })
        // location.reload();
    }


});
