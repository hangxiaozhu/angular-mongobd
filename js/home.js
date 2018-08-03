
app.controller("homeCtrl",function ($scope,$http) {
    new Swiper(".swiper-container", {
        autoplay: 4000,
        loop: true,
        direction: "horizontal",
        pagination: ".swiper-pagination",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        effect: "slide",
        paginationType: 'bullets',
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        onSlideChangeStart: function(swiper) {}
    });
    function getRTime(){
    	// var EndTime= new Date(datetime); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
	  var timedate="202236";
	  var type=1;
	  if(timedate=='0'){
		  return false;
	  }
	  if(type==2){
		  $('#time').html("距离结束 ");
	  }else{
		  $('#time').html("距离开始 ");
	  }
	    var EndTime =new Date("2018/11/10 00:00:00");
	    var NowTime = new Date();
	    var t =EndTime.getTime() - NowTime.getTime();
	    var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
		if(t>0){
			$('.star .day').html(d + "天");
			if(h<10){
				$('.star .hour').html('0'+h);
			}else{
				$('.star .hour').html(h);
			}
			if(m<10){
				$('.star .minutes').html('0'+m);
			}else{
				$('.star .minutes').html(m);
			}
			if(s<10){
				$('.star .second').html('0'+s);
			}else{
				$('.star .second').html(s);
			}
			
		}else{
	        window.location.reload();
		}
	}
	setInterval(getRTime,1000);


    $http.jsonp("http://10.90.93.228:5202/home?callback=JSON_CALLBACK").success(function (data) {
        $scope.category0=[];
        for (var i = 0; i < $scope.category.length;i++){

            if ($scope.category0.indexOf($scope.category[i].category1)==-1){
                $scope.category0.push($scope.category[i].category1);
            }
        }
        // console.log($scope.category0);
        $scope.Product=[];

        for (var i = 0; i < data.length; i++){
            $scope.Product.push(data[i]);
        }
        // console.log($scope.Product);
    }).error(function (err) {
        console.log(err);
    })
});