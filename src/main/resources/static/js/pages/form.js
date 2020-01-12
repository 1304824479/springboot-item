var iroadForm={
    formElementInitValue:function () {
        iroadForm.selectInitValue();
        iroadForm.inputInitValue();
        iroadForm.textareaInitValue();
        iroadForm.radioInitValue();
        iroadForm.checkboxInitValue();
    },
    inputInitValue:function () {
        $("input[type='text'][data-value]").each(function () {
             var value=$(this).attr("data-value");
             $(this).val(value);
        });
    },
    selectInitValue:function () {
        $("select[data-init-url]").each(function(){
            var obj=this;
            $(this).selectInit(function () {
                var value=$(obj).attr("data-value");
                if(value&&value!=""){
                    var arr=value.split(",");
                    var length=arr.length;
                    var firstValue=arr[0];
                    $(obj).val(firstValue);
                    if(length>1){
                        arr.remove(0);
                        $(obj).loadSelectInitValue(firstValue,arr)
                    }
                }
            });
        });


    },
    textareaInitValue:function () {
        $("textarea[data-value]").each(function () {
            var value=$(this).attr("data-value");
            $(this).val(value);
        });
    },
    radioInitValue:function () {
        $("input[type='radio'][data-value]").each(function () {
             var value=$(this).attr("data-value");
             var realValue=$(this).val();
             if(realValue==value){
                 $(this).attr("checked","checked");
             }
        });
    },
    checkboxInitValue:function () {
        $("input[type='checkbox'][data-value]").each(function () {
            var value=$(this).attr("data-value");
            var realValue=$(this).val();
            var arr=value.split(",");
            var flag=false;
            for(var i=0;i<arr.length;i++){
                if(realValue==arr[i]){
                    flag=true;
                }
            }
            if(flag){
                $(this).attr("checked","checked");
            }
        });
    }
};

