$(function(){

    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
	 // 数据
        var treeData=[{
            text:"智慧工厂",
            children:[{
                text:"用户管理",
                state : "closed",
                children:[{
                    text:"用户信息",                  
                    attributes:{
                        href:'member.html'
                    }                  
                }]
            },{
                text:"企业管理",
                state : "closed",
                children:[{
                    text:"入驻企业信息",                  
                    attributes:{
                        href:"company.html"
                    }                  
                }]
            },{
                text:"轮播图管理",
                state : "closed",
                children:[{
                    text:"轮播图",                  
                    attributes:{
                        href:"banner.html"
                    }                  
                }]
            },{
                text:"文章通知管理",
                state : "closed",
                children:[{
                    text:"文章通知列表",                  
                    attributes:{
                        href:"article.html"
                    }                  
                }]
            },{
                text:"申请管理",
                state : "closed",
                children:[{
                    text:"申请工单列表",                  
                    attributes:{
                        href:"apply.html"
                    }                  
                }]
            },{
                text:"反馈管理",
                state : "closed",
                children:[{
                    text:"反馈列表",                  
                    attributes:{
                        href:"back.html"
                    }                  
                }]
            }
            ]
        }];
        
        // 实例化树菜单
        $("#tree").tree({
            data:treeData,
            lines:true,
            onClick:function(node){
                if(node.attributes){
                    openTab(node.text,node.attributes.href);
                }
            }
        });
        
        // 新增Tab
        function openTab(text,href){
            if($("#tabs").tabs('exists',text)){
                $("#tabs").tabs('select',text);
            }else{
              $("#tabs").tabs('add',{
                    title:text,
                    closable:true,
                    href:href
                });               
            }
        }


            /*退出*/
        $(document).on('click','#login-out',function(){
            window.base.deleteLocalStorage('token');
            window.location.href = 'login.html';
        });
})