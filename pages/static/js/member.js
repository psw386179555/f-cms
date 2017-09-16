$(function(){
    var URL = window.base.g_restUrl;
	$('#member').datagrid({
		url:URL+'member/app/all',		
		fit:true,
		toolbar:'#member-tb',
        striped:true,
		fitColumns:true,
                singleSelect: true,
                iconCls: 'icon-edit',
                pageSize:20,
                rownumbers:true,
                pagination:true,              
                columns:[[
                	{
                		field:'id',
                		title:'用户ID',
                		width:30,
                		
                	},{
                        field:'username',
                        title:'用户昵称',
                        width:100,
                                
                    },{
                        field:'headimg',
                        title:'头像',
                        width:50,
                        align:'center',
                        formatter:function(value){

                            return '<img width="50px" src="'+value+'" />';


                        }
                    },{
                            field:'name',
                            title:'真实姓名',
                            width:100,
                                
                    },{
                        field:'beco',
                        title:'所属单位',
                        width:100,
                                
                    },{
                		field:'duty',
                		title:'职位',
                		width:100,
                	},{
                        field:'phone',
                        title:'联系方式',
                        width:100,
                                
                    },{
            		  field:'create_time',
            		  title:'注册时间',
            		  width:100,
                	},{
                     field:'status',
                     title:'状态',
                     width:100,
                     //显示对应状态
                     formatter:function(value){
                        var data = new Array('认证不通过','待审核','认证通过');
                        return data[value];
                    }
                    }
                ]],
        })



        //显示对应状态

   
        //编辑用户
        $('#member-edit').click(function(){
                var row = $('#member').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择要修改的数据！',                                
                        });
                        return false;
                } ;
                $('#member-edit').form('load',{ 
                        id:row.id,
                        name:row.name,
                        beco:row.beco,
                        duty:row.duty,
                        phone:row.phone,
                }).dialog({                                    
                        title:'编辑',             
                        buttons:[{
                        text:'提交',
                        iconCls:'icon-edit',
                        handler:function(){
                              var t = $('#member-edit').serialize();
                              console.log(t);
                              let params={
                                url:'member/app/update',
                                type:'post',
                                data:t,
                                tokenFlag:true,
                                sCallback:function(res){
                                        if (res) {
                                            $('#member-edit').dialog('close');
                                            $('#member').datagrid('reload');  
                                        }else{
                                            $.messager.alert({
                                                msg:'未知错误！',
                                            })    
                                        }
                                }
                              };
                              window.base.getData(params);
                        }
                        }],                        
                })
        })

        // 审核通过用户
        $('#member-check').click(function(){
                var row = $('#member').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择审核用户！',                                
                        });
                        return false;
                } ;                
                var params = {
                    url:'member/app/update',
                    type:'post',
                    tokenFlag:true,
                    data:{
                        id:row.id,
                        status:2,
                    },
                    sCallback:function(res){
                        if (res) {                                                   
                            $('#member').datagrid('reload');
                            $.messager.show({
                                msg:'用户ID为'+row.id+' 认证通过',
                                title: '认证操作',
                                timeout:2000,                               
                            });  

                        }else{
                            $.messager.alert({
                                msg:'未知错误！',
                            })    
                        }
                }
            }
            window.base.getData(params);
        })
         // 审核不通过用户
        $('#member-uncheck').click(function(){
                var row = $('#member').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择审核用户！',                                
                        });
                        return false;
                } ;                
                var params = {
                    url:'member/app/update',
                    type:'post',
                    data:{
                        id:row.id,
                        status:0,
                    },
                    tokenFlag:true,
                    sCallback:function(res){
                        if (res) {    
                            $.messager.show({
                                msg:'用户ID为'+row.id+' 认证不通过',
                                title: '认证操作',
                                timeout:2000,                               
                            });                    
                            $('#member').datagrid('reload');
                        }else{
                            $.messager.alert({
                                msg:'未知错误！',
                            })    
                        }
                }
            }
            window.base.getData(params);
        })

        //搜索       
         $('#member-searchbox').searchbox({
            prompt:'请输入真实姓名',          
            searcher:function(value,name){ 
                    alert('暂时不支持') 
                },            
            });      
       
       //分类加载
       $('#member-status').combobox({
        limitToList:true,
        onChange:function(newValue,oldValue){
                $('#member').datagrid('load',{
                    status:newValue,                   
                });
            }

       })


	
})