$(function(){
    var URL = window.base.g_restUrl;
	$('#company').datagrid({
		url:URL+'company/app/all',		
		fit:true,
		toolbar:'#company-tb',
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
                		title:'编号ID',
                		width:30,
                		
                	},{
                        field:'name',
                        title:'公司名称',
                        width:100,
                                
                    },{
                        field:'service',
                        title:'主要业务',
                        width:100,                                
                    },{
                        field:'leader',
                        title:'负责人',
                        width:50,
                                
                    },{
                		field:'address',
                		title:'公司地址',
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
        $('#company-edit').click(function(){
                var row = $('#company').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择要修改的数据！',                                
                        });
                        return false;
                } ;
                $('#company-edit').form('load',{ 
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
                              var t = $('#company-edit').serialize();
                              console.log(t);
                              var params={
                                url:'company/app/update',
                                type:'post',
                                data:t,
                                sCallback:function(res){
                                        if (res) {
                                            $('#company-edit').dialog('close');
                                            $('#company').datagrid('reload');  
                                        }else{
                                            $.messager.alert({
                                                msg:'未知错误！',
                                            })    
                                        }
                                }
                              }
                              window.base.getData(params);
                        }
                        }],                        
                })
        })

        // 审核通过用户
        $('#company-check').click(function(){
                var row = $('#company').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择审核企业！',                                
                        });
                        return false;
                } ;                
                var params = {
                    url:'company/app/update',
                    type:'post',
                    data:{
                        id:row.id,
                        status:2,
                    },
                    tokenFlag:true,
                    sCallback:function(res){
                        if (res) {                                                   
                            $('#company').datagrid('reload');
                            $.messager.show({
                                msg:'公司编号ID为'+row.id+' 认证通过',
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
        $('#company-uncheck').click(function(){
                var row = $('#company').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择审核公司！',                                
                        });
                        return false;
                } ;                
                var params = {
                    url:'company/app/update',
                    type:'post',
                    data:{
                        id:row.id,
                        status:0,
                    },
                    tokenFlag:true,
                    sCallback:function(res){
                        if (res) {    
                            $.messager.show({
                                msg:'公司编号ID为'+row.id+' 认证不通过',
                                title: '认证操作',
                                timeout:2000,                               
                            });                    
                            $('#company').datagrid('reload');
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
         $('#company-searchbox').searchbox({
            prompt:'请输入公司名称',          
            searcher:function(value,name){ 
                    alert('暂时不支持') 
                },            
            });      
       
       //分类加载
       $('#company-status').combobox({
        limitToList:true,
        onChange:function(newValue,oldValue){
                $('#company').datagrid('load',{
                    status:newValue,                   
                });
            }

       })


	
})