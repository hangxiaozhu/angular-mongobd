app.controller("myCenterCtrl",function($scope,$rootScope,$http){
	$(".mc-left>a").click(function(){
		$(".mc-left>a").removeClass("left-click");
		$(this).addClass("left-click");
	})
});
app.controller("myAccCtrl",function ($scope,$http) {
	$http.jsonp("http://10.90.93.228:5202/myAcc?username="+localStorage.username+"&callback=JSON_CALLBACK").success(function (data) {
		// console.log(data);
		$scope.myAcc = data[0];
		// console.log($scope.myAcc);
    }).error(function (err) {
		console.log(err);
    })
})
