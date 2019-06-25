
var baseurl = "http://10.129.235.8"



function test(){ 
    var name = $("#name").val();//文件名称
    var category = $("#category").val();//文件的一级分类
    var category2 = parseInt($("#two").val())+1;
    var file = $("#file").val();//文件
    var description = $("#description").val();//文件描述
    var cost = $("#cost").val();
    var formData = new FormData();

    formData.append("file",$("#file")[0].files[0]);
   
    allname = file.split("\\").pop();
    //获取文件名
    //fileName = fileName.substring(0, fileName.lastIndexOf("."));
    //获取文件的扩展名
    type = file.substr(file.indexOf("."));
    token = Cookies.get('TokenKey')||'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTMyNjIyOTA1NjI1MTUzNTM2Iiwic3ViIjoicm9vdCIsImlhdCI6MTU2MTIxMTI1MiwiZXhwIjoxNTYxMjE0ODUzLCJyb2xlIjoiYWRtaW4ifQ.6XexZghYywmiLltQQJVH9xf1U4ShC9AWltX6I1ojfXA'
    var i=0;
    var values='';
    var checked = $("input:checked");//获取所有被选中的标签元素

    if(file == ""){
        alert("请上传文件！");
        return false;
    }
    if(name ==""){
        alert("请输入文件名！");
        return false;
    }

    if(category== "0"){
        alert("请选择一级分类") ;
        return  false;
    }
    if(isNaN(category2)){
        alert("请选择二级分类") ;
        return  false;
    }

    for(i=0;i<checked.length;i++)
        { //将所有被选中的标签元素的值保存成一个字符串，以逗号隔开
            if(i<checked.length-1){
            values+=checked[i].value+',';}
            else{
                values+=checked[i].value;}
        }
    if(values==""){
        alert("请选择标签");
        return false;
    }
    if(cost== ""||cost > 10){
        alert("输入积分不正确！");
        return false;
    }
    if(description==""){
        alert("请输入文件描述！");
        return false;
    }        
    if(!$("#cb_agree").is(':checked')){
        alert("请同意资网共享规则！");
        return  false;
    }
   
   
    $.ajax({
        type: "post",
        url: baseurl+`:9002/upload/filemsg/${token}` ,
        data:{"name":allname,"category":category,"description":description,"type":type,"cost":cost,"title":name ,"tags":values,"category2":category2},
        success: function (msg) {
            $.ajax({
                type: "post",
                url: baseurl+":9002/upload/upload" ,
                data:formData,
                contentType: false,
                processData: false,
                success: function (msg) {
                    if(msg){
                         alert("上传成功！");
                         window.location.href = "index.html";
                    }else{
        
                    }
        
                }
            });
        }

    });
    return true;
}

