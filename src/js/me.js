$(document).ready(function(){
        $(".upload").click(function(){
            $(".show ul li").show();
            $(".show hr").show();
            $("table").hide();
            $(".unfindimg").hide();
            $("#unfinddiscription").text("");
        });
    });
        $(document).ready(function(){
        $(".score").click(function(){
            $("table").show();
            $(".show ul li").hide();
            $(".unfindimg").hide();
            $("#unfinddiscription").text("");
            $("hr").hide();
        });
    });
         $(document).ready(function(){
        $(".img").click(function(){
            $(".show ul li").hide();
            $("table").hide();
            $(".unfindimg").show();
            $("#unfinddiscription").text("这里还没有相关内容哦~");
        });
    });