$(function(){
    var URL = window.base.g_restUrl;
    var bannerItem=[];
    layui.use(['layer','form','element','upload'],function(){
        var layer = layui.layer
            ,form = layui.form
            ,el = layui.element
            ,upload = layui.upload;

        //监听提交
        form.on('submit(formDemo)', function(data){
            var status = 0;
            if (data.field.switch=='on') {
                status = 1;
            }
            var item=[];
            for (var i = bannerItem.length - 1; i >= 0; i--) {
                var str = 'item_title'+bannerItem[i].img_id;
                console.log(str);
                var obj ={
                    title:data.field[''+str+''],
                    img_id:bannerItem[i].img_id,
                }
                item.push(obj);
            }
            var sdata = {
                title:data.field.title,
                item:item,
                status:status,
            }
            let params ={
                url:'banner/app/save',
                type:'post',
                data:sdata,
                tokenFlag:true,
                sCallback:function(res){
                    console.log(res);
                    // console.log(sdata);
                    $.messager.alert({
                        title:'提示',
                        msg:'添加成功！',
                    });
                    $('#banner-addOrEdit').dialog('close');
                    $('#banner').datagrid('reload');
                },
            }

            window.base.getData(params);


            return false;
        });



        // 多图上传
        upload.render({
            elem: '#imgUpload'
            ,url: URL + 'image/upload'
            ,field: 'image'
            ,multiple: true
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                // obj.preview(function(index, file, result){
                //   $('#imgPre').append('<div class="prebox"><img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">'
                //       +'  <input style="width:200px;" type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"></div>')
                // });
            }
            ,done: function(res){
                //上传完毕
                bannerItem.push(res);
                $('#imgPre').append(
                    '<div class="prebox"><img  src="'+ res.path +'" alt="'+ res.img_id +'" class="layui-upload-img">'
                    +'  <input style="width:200px" type="text"  name="item_title'+res.img_id+'" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"></div>')
                // console.log(bannerItem);
            }
        });
    });

    $('#banner').datagrid({
        url:URL+'banner/app/all',
        fit:true,
        toolbar:'#banner-tb',
        striped:true,
        fitColumns:true,
        singleSelect: true,
        iconCls: 'icon-edit',
        pageSize:20,
        rownumbers:true,
        pagination:true,
        sortName:'id',
        sortOrder:'desc',
        remoteSort:false,
        columns:[[
            {
                field:'id',
                title:'轮播图ID',
                width:30,

            },{
                field:'title',
                title:'轮播组标题',
                width:100,

            },{
                field:'item',
                title:'图片数',
                width:100,
                formatter:function(value){
                    let str = JSON.stringify(value);
                    // console.log(str);
                    var btn = value.length+"<a class='preview' onclick='preview("+str+")' href='javascript:;'></a>";
                    return btn;
                }


            },{
                field:'status',
                title:'状态',
                width:50,
                //显示对应状态
                formatter:function(value,row){
                    let str = '<input id="banner-sb'+row.id+'" style="width:50px;height:15px">';
                    return str;
                }
            }
        ]],
        onLoadSuccess:function(data){
            for (var i = data.rows.length - 1; i >= 0; i--) {
                var id = '#banner-sb'+data.rows[i].id;
                $(id).switchbutton({
                    checked: data.rows[i].status,
                    onChange: function(checked){
                        let str = this.id;
                        let s = str.substring(9);
                        // console.log(s);
                        var status;
                        if (checked) {
                            status = 1;
                        }else{
                            status = 0;
                        }

                        var params = {
                            url:'banner/app/status',
                            data:{
                                id:s,
                                status:status
                            },
                            tokenFlag:true,
                            type:'post',
                            sCallback:function(res){
                                $('#banner').datagrid('reload');
                                console.log(res);
                                $.messager.show({
                                    msg:'修改成功！',
                                    title: '操作',
                                    timeout:2000,
                                });
                            },
                        };
                        window.base.getData(params);
                    }
                })
            }
            $('.preview').linkbutton({text:'预览',plain:true,iconCls:'icon-search'});

        },
    });



    $('#banner-add').click(function(){
        $('#banner-addOrEdit').dialog({
            title:'添加轮播图',
            width:'70%',
            height:'80%',
            onClose:function(){
                $('#banner-addOrEdit').form('reset');
                $('.prebox').remove();
            },
        });

    })








    //编辑用户
    $('#banner-edit').click(function(){
        var row = $('#banner').datagrid('getSelected');
        if (!row) {
            $.messager.alert({
                title:'提示',
                showType:'fade',
                msg:'请选择要修改的数据！'
            });
            return false;
        } ;
        $('#banner-addOrEdit').dialog('close');
        $('#banner-addOrEdit').form('load',{
            id:row.id,
            title:row.title
        }).dialog({
            title:'编辑',
            width:'70%',
            height:'80%',
            closed: false
        })
    })

});


function preview(value){
    var data = [];
    for (var i = value.length - 1; i >= 0; i--) {
        let list ={
            src:value[i].img.img_url,
            alt:value[i].title
        };
        data.push(list);
    }
    var photos={
        data:data
    };
    // console.log(photos);
    layer.photos({
        photos: photos,
        anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
    });

}