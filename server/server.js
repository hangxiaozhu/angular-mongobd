
var express = require("express");
var mongoo = require("./usemongo");
var app = new express();
mongoo.openDataBase(function () {
    console.log("数据库连接成功");
    var model = mongoo.db.model("products",mongoo.schemea);
    var userInfo = mongoo.db.model("userInfo",mongoo.userInfo);
    var city = mongoo.db.model("city",mongoo.city);
    var integral = mongoo.db.model("integral",mongoo.integral);
     //
     //integral.create({
     //    src:"../img/积分商城/1498530708179.jpg",
     //    description:"优质核桃夹子",
     //    jiFen:"1",
     //    price:"20",
     //},function (error,result) {
     //    console.log(error,result);
     //});
     //integral.create({
     //    src:"../img/积分商城/1502680431300.jpg",
     //    description:"沙湖辣子酱",
     //    jiFen:"1",
     //    price:"1",
     //},function (error,result) {
     //    console.log(error,result);
     //});
     //integral.create({
     //    src:"../img/积分商城/1503740016042.png",
     //    description:"心相印手帕纸",
     //    jiFen:"100",
     //    price:"0",
     //},function (error,result) {
     //    console.log(error,result);
     //});
     //integral.create({
     //    src:"../img/积分商城/1503740381461.jpg",
     //    description:"M豆",
     //    jiFen:"100",
     //    price:"10",
     //},function (error,result) {
     //    console.log(error,result);
     //});
     //
     //
     //userInfo.create({
     //    username:"123",
     //    password:"1",
     //    shopCar:[],
     //    address:[],
     //    wallet:"100"
     //},function (error,result) {
     //    console.log(error,result);
     //});
//积分商城
    app.get("/integralStore",function (req,res) {
        integral.find({},function (error,result) {
            res.jsonp(result);
        });
    });
    //下拉分类列表
    app.get("/index",function (req,res) {
        model.find({},function (error,result) {
            res.jsonp(result);
        });
    });
    //首页展示商品
    app.get("/home",function (req,res) {
        model.find({},function (error,result) {
            res.jsonp(result);
        });
    });
    //全部商品
    app.get("/sort",function (req,res) {
        model.find({},function (error,result) {
            res.jsonp(result);
        });
    });
    //同城
    app.get("/city",function (req,res) {
        city.find({},function (error,result) {
            res.jsonp(result);
        });
    });
    app.get("/cityServer",function (req,res) {
        var des=req.query.des;
        city.find({description:des},function (error,result) {
            res.jsonp(result);
        });
    });
    //注册
    app.get("/register",function (req,res) {
        name = req.query.username;
        psd = req.query.passwords;

        userInfo.find({username:name},function (error,result) {
            var info = true;
            if(result[0]==undefined) {
                info = true;
                userInfo.create({
                    username:name,
                    password:psd,
                    shopCar:[],
                    address:[],
                    wallet:"0",
                    collect:[]
                },function (error,result) {
                    console.log(error,result);
                });
            } else {
                info = false;
            }

            res.jsonp({
                info:info,
            });
        })
    })
    //登录
    app.get("/login",function (req,res) {
        name = req.query.username;
        psd = req.query.password;
        userInfo.find({username:name},function (error,result) {
            var info = true;
            if (result[0]==undefined){
                info = false;
            } else {
                if(name == result[0].username && psd == result[0].password) {
                    info = true;
                } else {
                    info = false;
                }
            }

        res.jsonp({
            info:info
        });
    })
    })
    //手机验证码登录
    app.get("/iphoneL",function (req,res) {
        name = req.query.username;
        userInfo.find({username:name},function (error,result) {
            var info = true;
            if (result[0]==undefined){
                info = false;
            } else {
                if(name == result[0].username) {
                    info = true;
                } else {
                    info = false;
                }
            }
            res.jsonp({
                info:info
            });
        })
    })
    //修改密码
    app.get("/changePsd",function (req,res) {
        name = req.query.username;
        psd = req.query.password;

        userInfo.update({username:name},{$set:{password:psd}},function (error,result) {
            console.log(error,result);
            var info = true;
            if(result.n==0) {
                info = false;
            } else {
                info = true;
            }
            res.jsonp({
                info:info,
            });
        })
    })

    //充值钱包
    app.get("/recharge",function (req,res) {
        name = req.query.username;
        wallet = req.query.wallet;

        userInfo.update({username:name},{$set:{wallet:wallet}},function (error,result) {
            console.log(error,result);
            var info = true;
            if(result.n==0) {
                info = false;
            } else {
                info = true;
            }
            res.jsonp({
                info:info,
            });
        })
    })

    //收货地址
    app.get("/address",function (req,res) {
        var obj={
            name:req.query.name,
            sheng:req.query.sheng,
            city:req.query.city,
            county:req.query.county,
            detailed:req.query.detailed,
            liphone:req.query.liphone,
            giphone:req.query.giphone
        };
        var arr=[];
        userInfo.find({username:req.query.username},function (error,result) {
            arr=result[0].address;
            arr.push(obj);
            userInfo.update({username:req.query.username},{$set:{address:arr}},{multi:true},function (error,result) {
                if (!error){
                    res.jsonp("true");
                }else{
                    res.jsonp("false");
                }
            });
        });
    });
    //展示地址
    app.get("/show-address",function (req,res) {
        userInfo.find({username:req.query.username},function (error,result) {
            res.jsonp(result);
        });
    });
    //删除地址
    app.get("/deleteAddress",function (req,res) {
        // console.log(req.query.username);
        var username = req.query.username;
        var index = req.query.index;
        var arr=[];
        userInfo.find({username:username},function (error,result) {
            arr=result[0].address;
            arr.splice(index,1);
            // console.log(arr);
            userInfo.update({username:req.query.username},{$set:{address:arr}},{multi:true},function (error,result) {
                if (!error){
                    res.jsonp("true");
                }else{
                    res.jsonp("false");
                }
            });
        });
    })

    //修改地址
    app.get("/changeAddress",function (req,res) {
        var obj={
            name:req.query.name,
            sheng:req.query.sheng,
            city:req.query.city,
            county:req.query.county,
            detailed:req.query.detailed,
            liphone:req.query.liphone,
            giphone:req.query.giphone
        };
        var username=req.query.username;
        var index=req.query.index;
        var arr=[];
        userInfo.find({username:req.query.username},function (error,result) {
            arr=result[0].address;
            arr[index]=obj;
            // arr.push(obj);
            userInfo.update({username:req.query.username},{$set:{address:arr}},{multi:true},function (error,result) {
                if (!error){
                    res.jsonp("true");
                }else{
                    res.jsonp("false");
                }
            });
        });
    });
    //个人信息
    app.get("/myAcc",function (req,res) {
        userInfo.find({username:req.query.username},{},function (error,result) {
            res.jsonp(result);
        });
    })



    //个人信息
    app.get("/myAcc",function (req,res) {
        userInfo.find({username:req.query.username},{},function (error,result) {
            res.jsonp(result);
        });
    })

    //加入购物车
    app.get("/addShopCar",function (req,res) {
        var username = req.query.username;
        var product = {
            tradeName:req.query.tradeName,
            price:req.query.price,
            imgSrc:req.query.imgSrc
        }
        var arr=[];
        userInfo.find({username:username},function (error,result) {
            arr=result[0].shopCar;
            arr.push(product);
            userInfo.update({username:username},{$set:{shopCar:arr}},function (error,result) {
                var info = true;
                if(result.n==0) {
                    info = false;
                } else {
                    info = true;
                }
                res.jsonp({
                    info:info,
                });
            })
        });

    })

    //购物车展示商品
    app.get("/shopCar",function (req,res) {
        var username = req.query.username;
        userInfo.find({username:username},{shopCar:1},function (error,result) {
            res.jsonp(result);
        });
    })
    //删除购物车的商品
    app.get("/deleteShopCar",function (req,res) {
        // console.log(req.query.username,req.query.tradeName);
        var username = req.query.username;
        var tradeName = req.query.tradeName;
        var arr=[];
        userInfo.find({username:username},{shopCar:1},function (error,result) {

            for (var i = 0; i < result.length; i++){
                // console.log(result[i]);
                for (var j = 0; j < result[i].shopCar.length; j++) {
                    // console.log(result[i].shopCar[j].tradeName);
                    if (tradeName == result[i].shopCar[j].tradeName){
                        // console.log(result[i].shopCar[j]);
                        result[i].shopCar.remove(result[i].shopCar[j]);
                        // console.log(result[i].shopCar);
                        arr.push(result[i].shopCar);
                        userInfo.update({username:username},{$set:{shopCar:arr[0]}},function (error,result) {
                            var info = true;
                            if(result.n==0) {
                                info = false;
                            } else {
                                info = true;
                            }
                            res.jsonp({
                                info:info,
                            });
                        })
                    }
                }
            }

        });
    })
    //是否已收藏
    app.get("/getinfo",function (req,res) {

        var username=req.query.username;
        var name = req.query.name;

        userInfo.find({username:username},function (error,result) {
            // res.jsonp(result[0].collect);
            var shop = result[0].collect;
            for(var i=0;i<result[0].collect.length;i++){
                // console.log(result[0].collect[i].tradeName);
                if(result[0].collect[i].tradeName==name){
                    console.log(true);
                   return res.jsonp(true);

                }

            }
            return res.jsonp(false);


        })

    });
    //商品收藏
    app.get("/myCollect",function (req,res) {
        var username = req.query.username;
        var obj={
            tradeName:req.query.tradeName,
            imgSrc:req.query.imgSrc,
            price:req.query.price,
            discounts:req.query.discounts
        };
        console.log(obj);
        var arr=[];
        userInfo.find({username:username},function (error,result) {
            arr=result[0].collect;
            arr.push(obj);
            userInfo.update({username:username},{$set:{collect:arr}},{multi:true},function (error,result) {
              if(!error){
                  res.jsonp(true);
              }else{
                  res.jsonp(false);
              }
            });
        });
    });
    //取消收藏
    app.get("/removeCollect",function (req,res) {
        // console.log(req.query.username);
        var username = req.query.username;
        var tradeName = req.query.tradeName;
        var arr=[];
        userInfo.find({username:username},function (error,result) {
           arr=result[0].collect;
           for (var i=0;i<arr.length;i++){
               console.log(tradeName);
               console.log(arr[i].tradeName);
               if(tradeName==arr[i].tradeName){

                   arr.splice(i,1);
                   // console.log(arr);
               }
           }

            userInfo.update({username:username},{$set:{collect:arr}},{multi:true},function (error,result) {
                // console.log(333);
                // console.log(arr);
                if(!error){
                    res.jsonp(true);
                }else{
                    res.jsonp(false);
                }
            })






        });

    })
    //展示收藏
    app.get("/aginCollect",function (req,res) {
        var username = req.query.username;
        var arr = [];
        userInfo.find({username:username},function (error,result) {
            arr=result[0].collect;
            console.log(arr);
            res.jsonp(arr);
        });
    });
    //取消收藏
    app.get("/cancelCollect",function (req,res) {
        var username = req.query.username;
        var tradeName = req.query.tradeName;
        var arr=[];
        userInfo.find({username:username},function (error,result) {
            arr=result[0].collect;
            for (var i=0;i<arr.length;i++){
                if(tradeName==arr[i].tradeName){

                    arr.splice(i,1);
                    // console.log(arr);
                }
            }

            userInfo.update({username:username},{$set:{collect:arr}},{multi:true},function (error,result) {
                // console.log(333);
                // console.log(arr);
                if(!error){
                    res.jsonp(true);
                }else{
                    res.jsonp(false);
                }
            })






        });

    })


});
app.listen(27017);


