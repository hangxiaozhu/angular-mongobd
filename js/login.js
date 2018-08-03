app.controller("loginCtrl",function ($scope,$http,$rootScope,$location,$timeout) {

    $(".login-log .login-top>a").click(function(){
        $(".login-log").hide();
        $(".iphone").show();
    });
    $(".iphone .iphone-top>a").click(function(){
        $(".iphone").hide();
        $(".login-log").show();
    });
    $(".login-bottom .login-btn2").click(function(){
        $(".iphone").hide();
        $(".login-log").hide();
        $(".register").show();
        $(".index-title>span").text("会员注册");
    });
    $(".iphone-bottom .login-btn2").click(function(){
        $(".iphone").hide();
        $(".login-log").hide();
        $(".register").show();
    });
    $(".register .login-btn2").click(function(){
        $(".iphone").hide();
        $(".register").hide();
        $(".login-log").show();
        $(".index-title>span").text("会员登录");
    });

    $(".forget-ps").click(function(){
        $(".iphone").hide();
        $(".login-log").hide();
        $(".register").hide();
        $(".forget").show();
    })

    //注册
    $(".register-bottom .login-btn1").click(function(){
    		var username = $("#iphone").val();
    		var pw = $("#password").val();
    		var re = /1(31|32|34|35|36|37|38|39|50|57|58|86|87|88)[0-9]{8}/g;
    		var rw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/g;
    		var bingo = re.test(username);
    		var bingos = rw.test(pw);

            var check = $("#index-agree").prop("checked");
            var yan = $("#login-yan").val();
            var iphone = $("#login-iyan").val();
            console.log(bingo, bingos, check, yan, iphone);
            if (bingo==true && bingos==true && check==true && yan!="" && iphone!="") {
                    $.ajax("mongodb://127.0.0.1:27017/register",{
                        dataType:"jsonp",
                        type:"get",
                        data:{
                            username:username,
                            passwords:pw
                        },
                        success:function(data){
                            console.log(data);
                            if (data.info) {
                                alert("注册成功");
                                $(".register").hide();
                                $(".login-log").show();
                            }else{
                                alert("注册失败");

                            }
                        }

                    });

    		}else{
    			alert("请完善您的个人信息");
    		}
    		
    })
    //验证码
    var verifyCode = new GVerify("v_container");
    //账号登录
    $(".user-btn1").click(function(){

        //验证码
        var res = verifyCode.validate(document.getElementById("verifyCode").value);
        if(res){
            $.ajax("mongodb://127.0.0.1:27017/login",{
                dataType:"jsonp",
                type:"get",
                data:{
                    username:$("#username").val(),
                    password:$("#psd").val()
                },
                async:false,
                success:function(data){
                    console.log(data);
                    if (data.info) {
                        // alert("登录成功");
                        localStorage.isLogin = true;
                        $rootScope.login = true;
                        localStorage.username = $("#username").val();
                        $(".index-on").show();
                        $(".index-nav").show();
                        $(".index-title").hide();
                        $timeout(function(){
                            location.reload();
                            $location.path("/home");
                        },1)

                    }else{
                        alert("登录失败");
                    }
                }
            })
        }else{
            alert("验证码错误");
        }
    })
    //手机验证码登录
    $(".phone-btn1").click(function () {
        $.ajax("mongodb://127.0.0.1:27017/iphoneL",{
            dataType:"jsonp",
            type:"get",
            data:{
                username:$("#iphone1").val()
            },
            success:function(data){
                console.log(data);
                if (data.info) {
                    // alert("登录成功");
                    $(".index-on").show();
                    $(".index-nav").show();
                    $(".index-title").hide();
                    localStorage.isLogin = true;
                    $rootScope.login = true;
                    localStorage.username = $("#iphone1").val();
                    $location.path("/home");
                }else{
                    alert("登录失败");
                }
            }
        })
    })

    //修改密码
    $(".forger-bottom input").click(function () {
        username = $("#changeUser").val();
        verify = $("#verify").val();
        password1 = $("#changePsd1").val();
        password2 = $("#changePsd2").val();
        phoneVerify = $("#phoneVerify").val();
        if (username!=""&&verify!=""&&password1!=""&&password2!=""&&phoneVerify!=""){

            if (password1 == password2){
                $.ajax("mongodb://127.0.0.1:27017/changePsd",{
                    dataType:"jsonp",
                    type:"get",
                    data:{
                        username:username,
                        password:password1
                    },
                    success:function(data){
                        console.log(data);
                        if (data.info) {
                            alert("用户名不存在");

                        }else{
                            alert("修改成功");
                            $(".register").hide();
                            $(".iphone").hide();
                            $(".forget").hide();
                            $(".login-log").show();

                        }
                    }
                })
            }else{
                alert("两次密码保持一致");
            }

        }else{
            alert("请完善所有信息");
        }
    })
});