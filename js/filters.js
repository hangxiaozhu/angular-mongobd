app.filter("unique",function () {
    return function (data, n1) {
        // 如果date是数组才继续进行过滤,否则不过滤直接返回空数组
        if (angular.isArray(data)){
            var categoryArr = [];
            for (var i = 0; i < data.length; i++){
                if (data[i].category.category1 == n1) {
                    categoryArr.push(data[i]);
                }
            }
            return categoryArr;
        }else{
            return [];
        }
    }
});