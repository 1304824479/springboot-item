$(function(){
    mainTree.initDivBindClick();
   // mainTree.initLiBindClick();
});

var mainTree={
    initDivBindClick:function(){
        $(".main-tree").find("div").click(function(){
            $(".main-tree").find("div").removeClass();
            $(this).addClass("selected");
            var length=$(this).next().length;
            if(length>0){
                if($(this).next().css("display") == 'none'){
                    $(this).next().show();
                }else{
                    $(this).next().hide();
                }
            }
        });
    }
}

