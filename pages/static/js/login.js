$(function(){
    if(window.base.getLocalStorage('token')){
        window.location.href = './';
    }

    $("#login").dialog({
        title:'登录后台',
        width:400,      
        modal:true,
        closable:false,
        draggable:false,
        buttons:'#btn',
        iconCls:'icon-login'
    })

    //账号做验证

    $('#username').validatebox({
        required:true,
        missingMessage:'请输入管理员账户!'
    })

    $('#password').validatebox({
        required:true,
        validType:'length[9,9]',
        missingMessage:'请输入管理员密码!',
        invalidMessage:'请输入9位数密码！'
    })

    //
    if (!$('#username').validatebox('isValid')) {
            $('#username').focus();
        }else if (!$('#password').validatebox('isValid')) {
            $('#password').focus();
        }
    //登录按钮


    $('#btn a').click(function(){
        if (!$('#username').validatebox('isValid')) {
            $('#username').focus();
        }else if (!$('#password').validatebox('isValid')) {
            $('#password').focus();
        } else{
            var params={
                url:'token/app',
                type:'post',
                data:{ac:$('#username').val(),se:$('#password').val()},
                sCallback:function(res){
                if(res){
                    window.base.setLocalStorage('token',res.token);
                    window.location.href = './';
                    }
                },
                eCallback:function(e){
                if(e.status==401){
                    $.messager.alert({
                        title:'提示',
                        msg:'登录名或密码错误！',
                    });
                }
                }
             };
            window.base.getData(params);
        }
    })
})