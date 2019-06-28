const baseUrl='http://10.129.235.6:9005';
var detaildata;
var workid;
//页面加载，兼职和文章推送，从数据库将数据查出来
$(document).ready(
    $.ajax({
        type:'get',
        url:baseUrl+'/me/getTask',
        dataType:'json',
        data:{
        },
//左侧兼职部分，规定向页面展示7个
        success:function (data) {
            data = data.data;
            detaildata=data;
            console.log(data);


            if(data.tasks.length<=7){
                $(function(){
                    var arr = data.tasks;
                    $.each(arr,function(index,value){
                        $('#task'+(index+1)).html(value.workclass+":  "+value.discription);
                        $('#task'+(index+1)).attr("title","点击查看详情");
                    });
                });
            }else{
                var arr = data.tasks.slice(0,7);
                $(function(){
                   $.each(arr,function(index,value){
                    $('#task'+(index+1)).html(value.workclass+":  "+value.discription);
                    $('#task'+(index+1)).attr("title","点击查看详情");
                });
               });
            }

        },
        error:function () {
        }
    }))
//右侧文章推送，如果过长，将文章折叠
$.ajax({
    type:'get',
    url:baseUrl+'/me/getTrend',
    dataType:'json',
    data:{
    },

    success:function (data) {
        data = data.data;
        var arr=new Array("0","1","2","3");
        var str='';
        var bigarr=new Array();
        $.each(data.schoolTrends,function(j,n){
            $.each(arr,function(i,m){
               if(data.schoolTrends[j].trendtype==arr[i]){
                str=data.schoolTrends[j].content;
                
                if(str.length>250){
                    $('#content'+i).append("<span class=\'more"+j+"\'><br>"+str.substr(0,250)+"<a class=\'morecon"+j+"\'>    >>展开</a>"+"<br><br><hr align='right' width='200px'/></span>"); 
                    bigarr[j]=str;
                    $(".more"+j).css("background-color","white");
                    $(".morecon"+j).css("background-color","white");
                    $(".morecon"+j).css("cursor","pointer");
                } else{
                   $('#content'+i).append("<br>"+str+"<br><br><hr align='right' width='100px'/>"); 
               }
           }

       });
        });
        $.each(data.schoolTrends,function(j,n){
            $(".morecon"+j).click(function(){
                $(".more"+j).html("<br>"+bigarr[j]+"<br><br><hr align='right' width='300px'/>"); 
            });
        });
    },

    error:function () {
    }
});
//展示兼职的详细内容
function present(i){
    workid=i;
    var detail=detaildata.tasks[i];
    if (detail==null) {

    }else{
        $(".content").show();
        $("#discription").html("任务描述:"+detail.discription);
        // $("#qq").html("联系qq:   "+detail.qq+" 电话:   "+detail.tel=='');
        $("#qq").html("联系qq:   "+detail.qq+" 电话:   "+detail.tel);
        console.log(detail.qq+" "+detail.tel==''?"":detail.tel);
        $("#integral").html(detail.integral==''?"任务积分:"+0:"任务积分:"+detail.integral);
        $("#deadline").html(detail.deadline==''?"截止时间:未指定":"截止时间:"+detail.deadline.replace("T"," "));
    }  
}
//关闭兼职的详细内容
function closeme(){
    $(".content").hide();
}
//展示所有兼职
function moreJob(){
    location.href="moreJob.html";
}
//申请兼职首先向兼职表中插入兼职申请信息，然后改任务状态码为已有人申请的标识“1”
function applyTask(){
   $(".content").hide();
   
   var detail=detaildata.tasks[workid];
   // console.log(detail);
   // console.log(detail.id);
   var taskid=detail.id;
   $.ajax({
    type:'get',
    url:baseUrl+'/me/applyTask',
    dataType:'json',
    data:{
        'taskid':taskid
    },

    success:function (data) {
    },

    error:function () {
    }

});
   alert("恭喜您获得该任务，请尽快与任务发布人取得联系！");
}

$(document).ready(
    function(){
        let token = '';
        token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTMyNjIyOTA1NjI1MTUzNTM2Iiwic3ViIjoicm9vdCIsImlhdCI6MTU2MTM2NTYzMCwiZXhwIjoxNTYxMzY5MjMyLCJyb2xlIjoidXNlciJ9.AvFHjZwvkh83ASp_qlwF4Y09_VkCL0alQk-vfId0ib4'
$.ajax({
    type:'get',
    url:baseUrl+'/me/getMePersonalInfo/'+token,
    dataType:'json',
    data:{
    },
    success:function (data) {
        data = data.data;
        console.log(data);
        $(".loginin").html(data.user);

    },
    error:function () {
    }
});
});
