
app.controller("integralStoreCtrl",function ($scope,$http) {
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
    $http.jsonp("http://127.0.0.1:5202/integralStore?callback=JSON_CALLBACK").success(function (data) {
         $scope.data=data;

    });
});
