const baseUrl = 'http://10.129.235.6:9005';
var flag = 0;
//展示”我的“页面的用户信息
$(document).ready(
    function () {
        const token = Cookies.get('TokenKey') || ''
        $.ajax({
            type: 'get',
            url: baseUrl + '/me/getMePersonalInfo/' + token,
            dataType: 'json',
            data: {
            },
            success: function (data) {
                data = data.data;
                $('#user').html(data.user);
                $('#integral').html(data.integral);
                $('#rank').html(data.rank);
                $('#uploads').html(data.uploads);
                $('#dowmloads').html(data.downloads);
                $('#album').html(data.album);
                $("#user").click(function () {
                    $('#user')
                        .bind('click', function () {
                            $(this).attr('contenteditable', 'true').trigger('focus');
                        })
                        .bind('blur', function () {
                            $(this).removeAttr('contenteditable');
                            // $(this).css("color","red");
                            saveChange($(this)); // 更新数据库
                        })

                });

            },

            error: function () {
            }
        })
    }
);



function saveChange(jqObj) {
    var $obj = jqObj || $(),
        personname = $.trim($obj.text()),
        url = baseUrl + '/me/changeNickname'; //这是发送ajax请求的url
    if (personname != '') {
        $.ajax(url, {
            dataType: 'json',
            data: {
                'personname': personname
            },
            success: function () {
                alert("更名成功！");
            },
            error: function () { },
            complete: function () { }
        });
    }
    else {
        alert("昵称不能为空哦");
        $obj.text('编辑小主昵称');
    }
}

function showIntegralDetails() {

    $.ajax({
        type: 'get',
        url: baseUrl + '/me/findIntegralDetails',
        dataType: 'json',
        data: {

        },

        success: function (data) {
            data = data.data.integraldetail;
            if (flag == 0) {
                $.each(data, function (index, value) {
                    $('.showScore table').append('<tr><td>' + data[index].operateintegral + '</td>'
                        + '<td>' + data[index].time + '</td>' + '</tr>');
                });
                console.log(data);
            }

            flag = 1;
        },
        error: function () {

        }

    })
}
