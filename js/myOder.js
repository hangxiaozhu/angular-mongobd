app.controller("myOderCtrl",function(){
$(".order-nav>a").click(function(){
	
	$(this).attr("class","order-navc");
	$(this).siblings().attr("class","order-navw");
});
});