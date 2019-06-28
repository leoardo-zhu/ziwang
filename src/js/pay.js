const baseUrl='http://10.129.235.6:9005';
function pay(){
    var incometel=$("input[name='incometel']").val().trim();
    var integral=$("input[name='integral']").val().trim();
    if(incometel==""){
        alert("请填写被支付方电话号码！");
    }else if(integral==""){
        alert("请填写支付积分量！");
    }else{
        $.ajax({
            type:'get',
            url:baseUrl+'/me/payIntegral',
            dataType:'json',
            data:$('#form').serialize(),

            success:function (data) {
                console.log(data.flag);
                if(data.flag){
                    alert("积分交易完成！");
                }else{
                    alert(data.message);
                }
            },

            error:function () {
            }
        });
    }
}