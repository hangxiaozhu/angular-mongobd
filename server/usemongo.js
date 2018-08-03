var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/database",{useMongoClient:true});
var schemea = new mongoose.Schema({
    category:{type:Object,default:""},
    photo:{type:String,default:""},
    tradeName:{type:String,default:""},
    price:{type:Number,default:""},
    discounts:{type:Number,default:""}
},{collection:"products"});

var userInfo = new mongoose.Schema({
    username:{type:String,default:""},
    password:{type:String,default:""},
    shopCar:{type:Array,default:""},
    address:{type:Array,default:""},
    wallet:{type:String,default:""},
    collect:{type:Array,default:""},
    flag:{type:Boolean}
},{collection:"userInfo"});
var city = new mongoose.Schema({
    src:{type:String,default:""},
    type:{type:String,default:""},
    price:{type:String,default:""},
    photo:{type:String,default:""},
    description:{type:String,default:""},
    time:{type:String,default:""},
    phoneNum:{type:String,default:""},
    address:{type:String,default:""},
    Score:{type:Object,default:""},
    server:{type:Array,default:""}

},{collection:"city"});


var integral = new mongoose.Schema({
    src:{type:String,default:""},
    description:{type:String,default:""},
    jiFen:{type:String,default:""},
    price:{type:String,default:""},

},{collection:"integral"});


module.exports = {
    db:db,
    schemea:schemea,
    userInfo:userInfo,
    city:city,
    integral:integral,
    openDataBase:function (fn) {
        mongoose.connection.on("open",fn);
    }
};