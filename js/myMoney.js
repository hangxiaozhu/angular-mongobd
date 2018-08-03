app.controller("myMonerCtrl",function(){
	$(".money-type>a").click(function(){
        money = $(this).find("span").text();
		$(this).attr("class","type-click");
		$(this).siblings().attr("class","type-wei");
	})
    $("#recharge").click(function () {
    	console.log(money)
        $.ajax("http://10.90.93.228:5202/recharge",{
            dataType:"jsonp",
            type:"get",
            data:{
                username:localStorage.username,
                wallet:money
            },
            success:function(data){
                console.log(data);
                if (data.info) {
                    alert("充值成功");

                }else{
                    alert("充值失败");
                }
            }
        })
    })
})
