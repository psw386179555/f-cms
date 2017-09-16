$(function(){
    var URL = window.base.g_restUrl;

    $('#article').datagrid({
        url:URL+'article/app/all',
        fit:true,
        toolbar:'#article-tb',
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
                title:'编号ID',
                width:30,

            },{
                field:'title',
                title:'文章标题',
                width:100,

            },{
                field:'type',
                title:'类型',
                width:50,
                align:'center',
                formatter:function(value){
                    var data = ['资讯','案例','产品','通知'];
                    return data[value];
                }  ,
            },{
                field:'sum',
                title:'简要内容',
                width:100,
            },{
                field:'author',
                title:'作者',
                width:100,

            },{
                field:'create_time',
                title:'添加时间',
                width:100,
            },{
                field:'status',
                title:'状态',
                width:50,
                align:'center',
                //显示对应状态
                formatter:function(value,row){
                    var str = '<input id="article-sb'+row.id+'" style="width:50px;height:15px">';
                    return str;
                }
            }
        ]],
        onLoadSuccess:function(data){
            for (var i = data.rows.length - 1; i >= 0; i--) {
                var id = '#article-sb'+data.rows[i].id;
                $(id).switchbutton({
                    onText:'显示',
                    offText:'不显示',
                    checked: data.rows[i].status,
                    onChange: function(checked){
                        var str = this.id;
                        var s = str.substring(10);
                        console.log(s+','+checked);
                        var status;
                        if (checked) {
                            status = 1;
                        }else{
                            status = 0;
                        }

                        var params = {
                            url:'article/app/update',
                            data:{
                                id:s,
                                status:status,
                            },
                            tokenFlag:true,
                            type:'post',
                            sCallback:function(res){
                                $('#article').datagrid('reload');
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

        }

    });

    //显示对应状态


    //编辑用户
    $('#article-add').click(function(){

        layui.use(['layer','form','element','upload','layedit'],function(){
            var layer = layui.layer
                ,form = layui.form
                ,el = layui.element
                ,layedit = layui.layedit
                ,upload = layui.upload;

            layedit.set({
                uploadImage: {
                    url: URL+'image/layui'
                    ,type: 'post' //默认post
                }
            });

            var index = layedit.build('editor',{
                tool: [
                    'strong' //加粗
                    ,'italic' //斜体
                    ,'underline' //下划线
                    ,'del' //删除线
                    ,'|' //分割线
                    ,'left' //左对齐
                    ,'center' //居中对齐
                    ,'right' //右对齐
                    ,'face' //表情
                    ,'image' //插入图片
                ],
            });


            var img_id;
            // 单图上传
            upload.render({
                elem: '#photo-upload'
                ,url: URL + 'image/upload'
                ,field: 'image'
                ,multiple: false
                ,before: function(obj){

                }
                ,done: function(res){
                    //上传完毕
                    img_id = res.img_id;
                    $('#imgPre').html('<div class="prebox"><img width="100px"  src="'+ res.path +'" alt="'+ res.img_id +'" class="layui-upload-img">')
                    // console.log(bannerItem);
                }
            });

            //监听提交
            form.on('submit(formSubmit)', function(data){
                data.field['img_id'] = img_id;
                data.field['content'] = layedit.getContent(index);
                if (data.field['status'] == 'on'){
                    data.field['status'] = 1
                }else{
                    data.field['status'] = 0
                }
                delete data.field.file;
                delete data.field.image;

                console.log(data.field);
                layer.msg('提交了');
                let params = {
                    url:'article/app/update',
                    data:data.field,
                    tokenFlag:true,
                    type:'post',
                    sCallback:function(res){
                        console.log(res);
                        $('#article-addOrEdit').dialog('close').form('reset');
                        $('.prebox').remove();
                        $('#article').datagrid('reload');

                        $.messager.show({
                            msg:'添加成功！',
                            title: '操作',
                            timeout:2000,
                        });
                    },
                };
                window.base.getData(params);
                return false;
            })


        });
        $('#article-addOrEdit').dialog({
            title:'添加文章',
            width:'70%',
            height:'80%',
            onClose:function(){
                $('#article-addOrEdit').form('reset');
                $('.prebox').remove();
            },
        });
    });

    //搜索
    $('#article-searchbox').searchbox({
        prompt:'请输入文章名称',
        searcher:function(value,name){
            alert('暂时不支持')
        },
    });

    //分类加载
    $('#article-status').combobox({
        limitToList:true,
        onChange:function(newValue,oldValue){
            console.log(newValue);
            $('#article').datagrid('load',{
                status:newValue,
            });
        }

    })



});