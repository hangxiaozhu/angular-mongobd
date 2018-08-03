app.controller("contentpayCtrl",function ($scope) {
$('.pay-list input').click(function () {
    var data = {

        type : $(this).val(),
    };
    if($(this).val() == 'alipay'){
        $('.pay-weixin').css('display','none');
        $('.pay-zhifubao').css('display','block');
        $('.online').css('display','none');
        $('.balance').css('display','none');

    }else if($(this).val() == 'weixin'){



        $('.pay-zhifubao').css('display','none');
        $('.pay-weixin').css('display','block');
        $('.online').css('display','none');
        $('.balance').css('display','none');
    }

    else if($(this).val() == 'online'){
        $('.pay-zhifubao').css('display','none');
        $('.pay-weixin').css('display','none');
        $('.online').css('display','block');
        $('.balance').css('display','none');
    }else if($(this).val() == 'balance'){
        $('.pay-weixin').css('display','none');
        $('.pay-zhifubao').css('display','none');
        $('.online').css('display','none');
        $('.balance').css('display','block');
    }
});

$('.pay-fangshi-list .but-a').click(function () {
    var snid=$('.snid').val();
    var type=$(this).attr('type');
    $('.popup-bg').css('display','block');
    $('.popup-block').css('display','block');

});
});