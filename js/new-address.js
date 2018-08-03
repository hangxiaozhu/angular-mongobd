app.controller("addressCtrl",function ($scope,$http,$location) {
    $scope.addNews = function () {
        $(".add-news").hide();
        $(".add-none").hide();
        $location.path("myCenter/addAddress");

    };
    var username = localStorage.getItem("username");
    $http.jsonp("http://127.0.0.1:5202/show-address?username="+ username +"&callback=JSON_CALLBACK").success(function (data) {
        // console.log(data[0].address);
        if (data[0].address==""){
            $(".add-none").show();
            $(".add-news").hide();
        }else{
            $(".add-none").hide();
            $(".add-news").show();
            $scope.addRess=data[0].address;
        }


    });
    $scope.deleteAdd=function (index, event) {
        // console.log($(event.target));
        $http.jsonp("http://10.90.93.228:5202/deleteAddress?username="+ username +"&index="+ index +"&callback=JSON_CALLBACK").success(function (data) {
            console.log(data);
           if(data=="true"){
               alert("删除成功");
               $(event.target).parent().parent().remove();
           }else{
               alert("删除失败");
           }

        });
        // location.reload();

    };
    $scope.changeAddress=function (user,index) {
        $location.path("myCenter/changeAddress").search({"user":user,"index":index});

    }

    
});