
Array.prototype.remove=function(dx){
    if(isNaN(dx)||dx>this.length){return false;}
    //var arr=new Array();
    for(var i=0,n=0;i<this.length;i++){
        if(i!=dx){
            this[n++]=this[i];
            // arr.push(this[i]);
        }
    }
    //alert("arr---="+arr);
    this.length-=1;
};

Array.prototype.isContain=function(value){
    if(isNaN(value)){return false;}
    var flag=false;
    for(var i=0;i<this.length;i++){
        if(this[i]==value){
            flag=true;
        }
    }
    return flag;
};
var verific={

    /**
     * 验证是否合法
     * @param reg
     * @param str
     * @returns {boolean}
     */
    isLegal:function (reg,str) {
        if(reg.text(str)){
            return true;
        }else{
            return false;
        }
    },

    /**
     * 验证是否为数字
     * @param str
     * @returns {boolean}
     */
    isDigit:function (str) {
        var reg=/^[0-9]*$/;
        if(reg.test(str)){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 验证是否为空
     * @param str
     * @returns {boolean}
     */
    isEmpty:function (str) {
        if($.trim(str)==""){
            return true;
        }else {
            return false;
        }
    }


};
(function($){
    $.extend($.fn, {
        selectInit:function(callback){
            var url=$(this).attr("data-init-url");
            if(url){
                var obj=this;
                var defaultOption=$("<option value=''>请选择</option>");
                defaultOption.appendTo(obj);
                $.post(url,function (data) {
                    if(data.length>0){
                        $.each(data,function (i,role) {
                            var key=role.key;
                            var value=role.value;
                            var option=$("<option value='"+key+"'>"+value+"</option>");
                            option.appendTo(obj);
                        });
                        var changeurl=$(obj).attr("data-url");
                        if(changeurl){
                            $(obj).selectOnChange();
                        }
                        if($.isFunction(callback)){
                            callback(obj);
                        }
                    }
                })
            }
        },
        selectOnChange:function () {
            var url=$(this).attr("data-url");
            if(url){
                var obj=this;
                var beforename=(obj).attr("name");
                $(obj).change(function(){
                    var key=this.value;
                    if(key!="") {
                        $(this).loadSelect(url,key);
                    }else{
                        $(obj).nextAll("select[name^='"+beforename+"']").remove();
                    }
                });
            }
        },
        loadSelect:function (url,vkey,callback) {
            var obj=this;
            var beforename=(obj).attr("name");
            var name=beforename+"1";
            var className=$(obj).attr("class");
            $.post(url,{
                key:vkey
            },function (data) {
                $(obj).nextAll("select[name^='"+beforename+"']").remove();
                 if(data.length>0){
                     var select=$("<select name='"+name+"' data-url='"+url+"'></select>");
                     if(className){
                         select=$("<select name='"+name+"' class='"+className+"' data-url='"+url+"'></select>");
                     }
                     var defaultOption=$("<option value=''>请选择</option>");
                     defaultOption.appendTo(select);
                     $.each(data,function (i,role) {
                         var key=role.key;
                         var value=role.value;
                         var option=$("<option value='"+key+"'>"+value+"</option>");
                         option.appendTo(select);
                     });
                     select.insertAfter(obj).selectOnChange();
                     if(callback&&$.isFunction(callback)){

                         callback(select);
                     }
                 }
            })
        },
        loadSelectInitValue:function (value,arrSonValue) {
            //alert(arrSonValue);
            var sonValue=arrSonValue[0];
            var url=$(this).attr("data-url");
            this.loadSelect(url,value,function(obj){
                $(obj).val(sonValue);
                if(arrSonValue.length>1){
                    arrSonValue.remove(0);
                    obj.loadSelectInitValue(sonValue,arrSonValue);
                }
            });
        }

    });
})(jQuery);



var pc={
    message:{
        success:"success", // 成功
        error:"error",      //失败
        operate_error:400    //用户操作失败
    },
    post:function(url,param1,param2){
        var paramsLength=arguments.length ;
        var params=null; //请求参数
        var callback=null; //回调函数
        if(paramsLength==3){
            params=param1;
            callback=param2;
        }
        if(paramsLength==2){
            params={};
            callback=param1;
        }
        if(url!=null&&params!=null&&callback!=null){
            $.post(url,params,function(data){
                if((typeof callback)== 'function'){
                    if(data.key==iroad.message.success){
                        callback(data);
                    }else{
                        var info=data.info;
                        var code=data.code;
                        if(code==iroad.message.operate_error){
                            $.ligerDialog.warn(info);
                        }else{
                            $.ligerDialog.error(info);
                        }
                    }
                }
            });
        }
    },
    callback:function(type,info){  //表单提交回调函数
        if(type==1){  //1 代表成功，则跳转URL
            window.location.href=info;
        }
        if(type==2){ //2 代码失败，则打印提示信息
            //$.ligerDialog.warn(info);
            var dialogBtn = [
                {
                    text: '确定',
                    onclick: function (dialog,settings) {
                        $("input[type='submit']").removeClass("disabled")
                    }
                }
            ];
            var type="warn"; //alert   success  warn  info  error  question
            var content=info;
            $.ligerDialog.openCDialog(type,content);
        }
    }
};

var pcPage={
    refresh:function () {
        var isRefresh=window.localStorage.getItem("isRefresh");
        if(isRefresh==1){
            window.localStorage.removeItem("isRefresh");
            window.location.reload();
        }
    },
    goback:function () {
        window.localStorage.setItem("isRefresh",1);
        window.history.go(-1);
    }
};

