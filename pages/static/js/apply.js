$(function(){
    var URL = window.base.g_restUrl;
	$('#apply').datagrid({
		url:URL+'apply/app/all?XDEBUG_SESSION_START=15346',		
		fit:true,
		toolbar:'#apply-tb',
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
        		title:'工单编号',
        		width:50,
        		
        	},{
                field:'leader',
                title:'负责人',
                width:100,
                        
            },{
                field:'type',
                title:'类型',
                width:50,
                align:'center',
                formatter:function(value){
                    var data=['成果转化','机械加工']
                    return data[value];
                }
            },{
                    field:'project_name',
                    title:'项目名称',
                    width:100,
                        
            },{
                field:'mobile',
                title:'联系方式',
                width:100,
                        
            },{
        		field:'money',
        		title:'预算',
        		width:100,
        	},{
                field:'material',
                title:'所需材质',
                width:100,
                        
            },{
    		  field:'create_time',
    		  title:'提交时间',
    		  width:100,
        	},{
              field:'send_time',
              title:'预计交货日期',
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
        $('#apply-edit').click(function(){
                var row = $('#apply').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择要修改的数据！',                                
                        });
                        return false;
                } ;
                $('#apply-edit').form('load',{ 
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
                              var t = $('#apply-edit').serialize();
                              console.log(t);
                              var params={
                                url:'apply/app/update',
                                type:'post',
                                data:t,
                                sCallback:function(res){
                                        if (res) {
                                            $('#apply-edit').dialog('close');
                                            $('#apply').datagrid('reload');  
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
        $('#apply-check').click(function(){
                var row = $('#apply').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择审核用户！',                                
                        });
                        return false;
                } ;                
                var params = {
                    url:'apply/app/update',
                    type:'post',
                    data:{
                        id:row.id,
                        status:2,
                    },
                    tokenFlag:true,
                    sCallback:function(res){
                        if (res) {                                                   
                            $('#apply').datagrid('reload');
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
        $('#apply-uncheck').click(function(){
                var row = $('#apply').datagrid('getSelected');
                if (!row) {
                        $.messager.alert({                               
                                title:'提示',
                                showType:'fade',
                                msg:'请选择审核用户！',                                
                        });
                        return false;
                } ;                
                var params = {
                    url:'apply/app/update',
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
                            $('#apply').datagrid('reload');
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
         $('#apply-searchbox').searchbox({
            prompt:'请输入真实姓名',          
            searcher:function(value,name){ 
                    alert('暂时不支持') 
                },            
            });      
       
       //分类加载
       $('#apply-status').combobox({
        limitToList:true,
        onChange:function(newValue,oldValue){
                $('#apply').datagrid('load',{
                    status:newValue,                   
                });
            }

       })


	
})