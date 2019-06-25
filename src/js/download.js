const id = location.search.substr(1).split('=')[1]
console.log(id)
var baseurl = "http://10.129.235.8"

window.onload=function(){
    
    $.ajax({
        url : baseurl+`:9003/comment/find/${id}`,//后台请求的数据
        dataType : "json",//数据格式 
        type : "get",//请求方式
        async : false,//是否异步请求
        success : function(data) {   //如果请求成功，返回数据。
        var html = "";
        for(var i=0;i<data.length;i++){    //遍历data数组
          var ls = data[i];     
          html +="<div-1>匿名："+ls.comment+"</div-1>&nbsp;&nbsp;("+ls.time+") &nbsp;<br>-----------------------------------------------------------------------------------------------<br>"
          }
           $("#test1").html(html); //在html页面id=test的标签里显示html内容
         },
      })

      $.ajax({
        url : baseurl+`:9002/down/description/${id}`,//后台请求的数据
        type : "get",//请求方式
        async : true,//是否异步请求
        success : function(data) {   //如果请求成功，返回数据。
        var html = "";
          html +="<div>描述："+data+"</div> "
           $("#description").html(html); //在html页面id=test的标签里显示html内容
         }
      })
           
}

function downfile1(){

    alert("您还不是网站的vip，请先注册vip或选择积分下载。")
}
function downfile2(){
    token = Cookies.get('TokenKey')||'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTMyNjIyOTA1NjI1MTUzNTM2Iiwic3ViIjoicm9vdCIsImlhdCI6MTU2MTIxMTI1MiwiZXhwIjoxNTYxMjE0ODUzLCJyb2xlIjoiYWRtaW4ifQ.6XexZghYywmiLltQQJVH9xf1U4ShC9AWltX6I1ojfXA'
    var path   =   prompt("Please Input Path","D:\\Android\\123"); 
    alert(path)
    if(path == ""){
        alert("下载路径为空！");
        return false;
    }
    $.ajax({
        type: "post",
        url: baseurl+":9002/down/file" ,
        data:{path,id},
        success: function (msg) {
            if(msg){
                 alert("下载成功！您可以参与评论了。");
                $.ajax({
                    type:"get",
                    url: baseurl+`:9002/down/file/downloads/${id}` ,
                     data:{id},
                     success:function(msg){
                        $.ajax({
                            type:"post",
                            url:baseurl+`:9002/down/file/download/${id}/${token}`,
                            data:{id,token}
                        })
                     }
                })
               
                //  window.location.href = `download.html?id =${id}`;
            }
        }
    })
}
function check(){
            //判断是否为空
            if ($("#txtName").val() == "") {
                alert("评论不能为空！");
                return true;
            }
            var content = $("#txtName").val();
            $.ajax({
                type: "post",
                contentType:'application/json',
                url: baseurl+`:9003/comment/save/${id}` ,
                data:JSON.stringify({content}),
                success: function (msg) {
                    if(msg){
                         alert("评论成功");
                         window.location.href = `download.html?id =${id}`;
                    }
                }
            })
}

