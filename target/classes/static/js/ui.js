(function($){
    $.extend($.fn, {
        /**
         * 打开弹框
         * 作者：姚明
         * 时间：2017-11-09
         * @param dialogCfn
         * url : "",  弹框内容url地址（必填项）
         * title : "默认标题", 弹框标题（可选）
         * titleClass:"标题的class类"（可选）
         * width : 600,  弹框宽度（可选，默认600px） 大于1则为像素宽度，小于等于1则为百分比宽度
         * height : 600,  弹框内容高度（可选，默认根据内容自适应）
         * top : 100, 弹框距离浏览器顶部高度 (可选，默认100px)
         * buttons : dialogBtn, 弹框按钮 （可选）
         * settings : {       弹框自定义参数 （可选）
         *   method : "add",
         *   id:"123456"
         * }
         */
        openMDialog:function(dialogCfn){
            if(!dialogCfn || !dialogCfn.url || dialogCfn.url==""){
                return ;
            }
            var mask = $("<div class='dialog-bg'/>");  // 遮罩层
            var dialog=$("<div class='dialog'/>");  //弹框
            var dialogTitle=$("<div class='dialogTitle' />"); //弹框标题
            var dialogContent=$("<div class='dialogContent' />"); //弹框内容
            var dialogBtn=$("<div class='dialogBtn'/>"); //弹框按钮
            var closeBtn=$("<i class='iconfont icon-close btn-sm'></i>");
            if(dialogCfn.titleClass){
                dialogTitle.addClass(dialogCfn.titleClass);
            }
           // dialogTitle.scss("background-color","#fff");

            dialog.append(dialogTitle);
            dialog.append(dialogContent);
            dialog.append(dialogBtn);

            mask.append(dialog).appendTo("body");
            dialog.drag(dialogTitle);//添加拖拽功能
            //绑定close事件
            closeBtn.click(function(){
                mask.remove();
            });

            //设置弹框宽度
            var width=dialogCfn.width;
            if(width){
                if(width>1){
                    var pageWidth=$(window).width();
                    if(width>(pageWidth-200)){
                        width=pageWidth-200;
                    }
                    dialog.css({
                        "width":width,
                        "margin-left":(width/2)*(-1)
                    });
                }else if(width<=1){
                    width=width*100;
                    var left=width/2*(-1);
                    dialog.css({
                        "width":width+"%",
                        "margin-left":(width/2)*(-1)+"%"
                    });
                }
            }
            //设置弹框内容高度
            var height=dialogCfn.height;
            if(height){
                var pageHeight=$(window).outerHeight()-60;
                if(height>1){
                    if(height+55>=pageHeight){
                        height=pageHeight-55;
                    }
                    dialogContent.css({
                        "height":height-25
                    });
                    dialog.css({
                        "margin-top":((height+55)/2+15)*(-1)
                    });
                }else{
                    var dialogHeigth=pageHeight*height;
                    dialogContent.css({
                        "height":dialogHeigth-80
                    });
                    dialog.css({
                        "margin-top":((dialogHeigth)/2+15)*(-1)
                    });
                }
            }else{
                dialog.hide();
            }



            //设置弹框标题
            var title=dialogCfn.title;
            if(!title){
                title="默认标题";
            }
            dialogTitle.html(title).append(closeBtn);

            //用户自定义参数
            var settings=dialogCfn.settings;
            if(!settings){
                settings=null;
            }

            //设置弹框按钮
            var buttons=dialogCfn.buttons;
            if(!buttons){
                buttons= [
                    {
                        text: '确定',
                        onclick: function (dialog,settings) {
                            mask.remove();
                        }
                    },
                    {
                        text: '取消',
                        onclick: function (dialog,settings) {
                            mask.remove();
                        }
                    }
                ];
            }
            $.each(buttons,function (i,obj) {
                  var btn=$("<a class='btn' />");
                  if(i>0){
                      btn=$("<a class='btn ml-lg' />");
                  }
                  if(obj.class){
                      btn.addClass(obj.class);
                  }
                  btn.text(obj.text).appendTo(dialogBtn);
                  btn.click(function(){
                      var isRemove=true;
                      if($.isFunction(obj.onclick)){
                          isRemove=obj.onclick(dialog,settings);
                          if(isRemove==undefined){
                              isRemove=true;
                          }
                      }
                      if(isRemove){
                          mask.remove();
                      }
                  });
            });
            var url=dialogCfn.url;
            $.get(url,function(data){
                dialogContent.html(data);
                if(!height){
                     window.setTimeout(function () {
                         dialog.show();
                         var pageHeight=$(window).outerHeight()-60;
                         var dialogHeight=dialog.outerHeight();
                         //console.log("pageHeight="+pageHeight+",dialogHeight="+dialogHeight);
                         if(dialogHeight<=pageHeight){
                             dialog.css({
                                 "margin-top":((dialogHeight)/2)*(-1)
                             });
                         }else{
                             dialogContent.css({
                                 "height":pageHeight-80
                             });
                             dialog.css({
                                 "margin-top":((pageHeight)/2+15)*(-1)
                             });
                         }
                     },30);
                    // alert(dialogHeight+","+pageHeight);
                }
            });
        }
    });

    $.ligerDialog={
        width:300,
        _getDialogCfg:function(type,content,buttons,settings){
            var dialogCfn={
                type:type,
                title:"提示",
                content:content,
                width:this.width
            }
            if(buttons){
                dialogCfn.buttons=buttons;
            }
            if(settings){
                dialogCfn.settings=settings;
            }
            return dialogCfn;
        },
        _getClassName:function(type){
            var className="";
            if(type=="alert"){
                className="icon-dialog-alert";
            }
            if(type=="success"){
                className="icon-dialog-success";
            }
            if(type=="warn"){
                className="icon-dialog-warn";
            }
            if(type=="info"){
                className="icon-dialog-info";
            }
            if(type=="error"){
                className="icon-dialog-error";
            }
            if(type=="question"){
                className="icon-dialog-question";
            }
            return className;
        },
        /**
         * 生成弹框
         * 作者：姚明
         * 时间：2017-11-17
         * @param dialogCfn
         * type  : "alert" ,提示框类型(必填)  可取值为：alert,success,warn,info,error,question
         * title : "默认标题", 弹框标题（可选）
         * titleClass:"标题的class类"（可选）
         * content : "提示内容",提示内容（可选）
         * width : 300,  弹框宽度（可选，默认300px）
         * height : auto,  弹框内容高度（可选，默认根据内容自适应）
         * buttons : dialogBtn, 弹框按钮 （可选）
         * settings : {       弹框自定义参数 （可选）
         *   method : "add",
         *   id:"123456"
         * }
         */
        _getDialog:function(dialogCfn){
            if(!dialogCfn){
                return ;
            }
            var mask = $("<div class='dialog-bg'/>");  // 遮罩层
            var dialog=$("<div class='dialog'/>");  //弹框
            var dialogTitle=$("<div class='ligerDialogTitle iconfont' />"); //弹框标题
            var dialogContent=$("<div class='ligerDialogContent' />"); //弹框内容
            var dialogBtn=$("<div class='ligerDialogBtn'/>"); //弹框按钮
            var closeBtn=$("<i class='iconfont icon-close'></i>");

            if(dialogCfn.titleClass){
                dialogTitle.addClass(dialogCfn.titleClass);
            }
            var title=dialogCfn.title;
            if(!title){
                title="提示";
            }
            var content=dialogCfn.content;
            if(!content){
                content="";
            }
            var type=dialogCfn.type;

            var className=this._getClassName(type);
            dialogTitle.addClass(className).html(" "+title).append(closeBtn);
            dialogContent.html(content);
            dialog.append(dialogTitle);
            dialog.append(dialogContent);
            dialog.append(dialogBtn);
            mask.append(dialog);

            //绑定close事件
            closeBtn.click(function(){
                mask.remove();
            });



            //设置弹框宽度
            var width=dialogCfn.width;
            if(!width){width=300;}
            if(width>1){
                var pageWidth=$(window).width();
                if(width>(pageWidth-200)){
                    width=pageWidth-200;
                }
                dialog.css({
                    "width":width,
                    "margin-left":(width/2)*(-1)
                });
            }else if(width<=1){
                width=width*100;
                var left=width/2*(-1);
                dialog.css({
                    "width":width+"%",
                    "margin-left":(width/2)*(-1)+"%"
                });
            }
            //设置弹框内容高度
            var height=dialogCfn.height;
            if(height){
                var pageHeight=$(window).outerHeight()-60;
                if(height>1){
                    if(height+55>=pageHeight){
                        height=pageHeight-55;
                    }
                    dialogContent.css({
                        "height":height-25
                    });
                    dialog.css({
                        "margin-top":((height+55)/2+15)*(-1)
                    });
                }else{
                    var dialogHeigth=pageHeight*height;
                    dialogContent.css({
                        "height":dialogHeigth-80
                    });
                    dialog.css({
                        "margin-top":((dialogHeigth)/2+15)*(-1)
                    });
                }
            }else{
                dialog.hide();
            }

            //设置弹框距离顶部的距离
            /*
            var top=dialogCfn.top;
            if(top){
                dialog.scss({
                    "top":top
                });
            }
             */
            //用户自定义参数
            var settings=dialogCfn.settings;
            if(!settings){
                settings=null;
            }

            //设置弹框按钮
            var buttons=dialogCfn.buttons;
            if(!buttons){
                buttons= [
                    {
                        text: '确定',
                        onclick: function (dialog,settings) {
                            mask.remove();
                        }
                    }
                ];
            }
            $.each(buttons,function (i,obj) {
                var btn=$("<a class='btn btn-small ' />");
                if(i>0){
                    btn=$("<a class='btn btn-small ml ' />");
                }
                if(obj.class){
                    btn.addClass(obj.class);
                }
                btn.text(obj.text).appendTo(dialogBtn);
                btn.click(function(){
                    var isRemove=true;
                    if($.isFunction(obj.onclick)){
                        isRemove=obj.onclick(dialog,settings);
                        if(isRemove==undefined){
                            isRemove=true;
                        }
                    }
                    if(isRemove){
                        mask.remove();
                    }
                });
            });

            if(!height){
                window.setTimeout(function(){
                    dialog.show();
                    var pageHeight=$(window).outerHeight()-60;
                    var dialogHeight=dialog.outerHeight();
                  //  alert(dialogHeight);
                    if(dialogHeight<=pageHeight){
                        dialog.css({
                            "margin-top":((dialogHeight)/2)*(-1)
                        });
                    }else{
                        dialogContent.css({
                            "height":pageHeight-80
                        });
                        dialog.css({
                            "margin-top":((pageHeight)/2+15)*(-1)
                        });
                    }
                },1)

            }

            return mask;
        },
        /**
         * 打开提示对话框
         * @param dialogCfn
         */
        openTDialog:function(dialogCfn){
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        /**
         * 打开通用的提示对话框
         * @param type
         * @param content
         */
        openCDialog:function(type,content,buttons,settings){
            var dialogCfn=this._getDialogCfg(type,content,buttons,settings);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        alert:function(content){
            var type="alert";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        success:function(content,buttons){
            var type="success";
            var dialogCfn=this._getDialogCfg(type,content,buttons);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        warn:function(content){
            var type="warn";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        info:function(content){
            var type="info";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        error:function(content){
            var type="error";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        question:function(content,buttons,settings){
            var type="question";
            var dialogCfn=this._getDialogCfg(type,content,buttons,settings);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        }

    };

})(jQuery);
(function($){
    $.extend($.fn, {
          drag:function(slider){
              var left, top, $this;
              var obj=this;
              $(slider).css({"cursor":"move"}).on("mousedown",function (e) {
                    left = e.clientX, top = e.clientY, $this = $(this);
                    console.log("left="+left+",top="+top);
                      slider.setCapture ? (   //当前元素捕获鼠标的所有事件
                          slider.setCapture(),
                              slider.onmousemove = function(ev) {
                                  mouseMove(ev || event);
                              },
                              slider.onmouseup = mouseUp
                      ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
              });

              /*
              $(document).delegate(slider, 'mousedown', function(e) {
                  left = e.clientX, top = e.clientY, $this = $(this);
                 // console.log("left="+left+",top="+top);
                  slider.setCapture ? (   //当前元素捕获鼠标的所有事件
                      slider.setCapture(),
                          slider.onmousemove = function(ev) {
                              mouseMove(ev || event);
                          },
                          slider.onmouseup = mouseUp
                  ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
              });
              */

              //获得鼠标指针在页面中的位置
              function mouseMove(e) {
                  var target = obj;
                  var l = Math.max((e.clientX - left + Number(target.css('margin-left').replace(/px$/, '')) || 0), -target.position().left);
                  var t = Math.max((e.clientY - top + Number(target.css('margin-top').replace(/px$/, '')) || 0), -target.position().top);
                  l = Math.min(l, $(window).width() - target.width() - target.position().left);
                  t = Math.min(t, $(window).height() - target.height() - target.position().top);
                  left = e.clientX;
                  top = e.clientY;
                  target.css({
                      'margin-left': l,
                      'margin-top': t
                  });
              }

              //当鼠标松开时
              function mouseUp(e) {
                 // var el = $this.scss('cursor', 'default').get(0);
                  /*
                  var el = $this.get(0);
                  el.releaseCapture ?
                      (
                          el.releaseCapture(),
                              el.onmousemove = el.onmouseup = null
                      ) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
                  */
                  $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
              }
          }
    });

})(jQuery);
var calendar={
    init:function (cfg) {
        var skin=0;
        if(cfg&&cfg.skin){
            skin=cfg.skin;
            if(skin==9){
                skin="#4d7efa";
            }
        }
        $("input[class*='iroad-time']").each(function(){
            $(this).ECalendar({
                type:"time",   //模式，time: 带时间选择; date: 不带时间选择;
                stamp : false,   //是否转成时间戳，默认true;
                offset:[0,2],   //弹框手动偏移量;
                format:"yyyy-mm-dd hh:ii",   //时间格式 默认 yyyy-mm-dd hh:ii;
                skin:skin,   //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
                step:1,   //选择时间分钟的精确度;
                callback:function(v,e){} //回调函数
            });
        });

        $("input[class*='iroad-date']").each(function(){
            $(this).ECalendar({
                type:"date",   //模式，time: 带时间选择; date: 不带时间选择;
                stamp : false,   //是否转成时间戳，默认true;
                offset:[0,2],   //弹框手动偏移量;
                // format:"yyyy-mm-dd hh:ii",   //时间格式 默认 yyyy-mm-dd hh:ii;
                skin:skin,   //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
                step:1,   //选择时间分钟的精确度;
                callback:function(v,e){} //回调函数
            });
        });
    }
};


$.fn.ECalendar = function(config){
    var con = {
        offset : [0,0],
        type : 1,
        skin : false,
        stamp : true,
        step : 10
    };
    config = $.extend(con,config);
    var _this = $(this), //表单
        ECalendar, //主面板
        day, //日期列表
        imonth,//当前月份
        iday,//当前日期
        iyear,//当前年份
        ilast,//日期差
        itimebox,//当前时间
        select, //快速选择
        getFullYear, //选择的年份
        getMonth, //选择的月份
        getDate, //选择的日期
        weekday,//选择的星期
        getHour,//选择的小时
        getMinutes,//选择的分钟
        oper, //上下月选择
        currenttime,
        x,y,mx,my,
        timestep = config.step, // 拖动时间的步长
        drag,
        input, //存储时间的隐藏表单
        dragnum,
        isinit = false, //是否初始化
        pointer, //时间指针
        callback,
        formatTime = config.format ? config.format : "yyyy-mm-dd hh:ii",
        formatDate = config.format ? config.format : "yyyy-mm-dd",
        tmp = ['#2f4d71','#1bbc9b','#297fb8','#985aa6','#e67f22','#2d3e50','#27ae61','#7e8c8d'];
    config.type = config.type == "time" ? 0 : 1;
    callback = config.callback;
    //判断客户端
    if(!IsPC())
    {
        if(config.type == 0)
        {
            _this.attr("type","datetime-local");
        }
        else
        {
            _this.attr("type","date");
        }
        if(callback)
        {
            _this.change(function(){
                callback(_this.val(),ECalendar);
            })
        }
        return false;
    }

    config.format = config.type == 0 ? formatTime : formatDate;
    if(config.skin === false)  config.skin = Math.floor(Math.random()*tmp.length)
    config.skin = tmp[config.skin] ? tmp[config.skin] : config.skin;



    init();
    _this.click(function(event){
        var itime = _this.attr("data-ec") ? _this.attr("data-ec") : _this.val();
        var date = itime ? new Date(itime.replace(/-/g, "/")) : new Date();
        if(date == 'Invalid Date') date = new Date();
        setData(date);

        //判断元素相对可视窗口的位置
        var top = _this.offset().top - $(document).scrollTop();
        var height = $(window).height();
        var offset = _this.offset();
        var post = _this.position();
        if(height/2 < top)
        {
            ECalendar.css({
                "left":post.left + config.offset[0],
                "top":post.top  - config.offset[1] - ECalendar.height() - 1,
            });
        }else
        {
            ECalendar.css({
                "left":post.left + config.offset[0],
                "top":post.top + _this.outerHeight() + config.offset[1],
            });
        }
        _this.parent(".calendarWarp").css("zIndex",+10)
        ECalendar.show();
    });

    //点击外面关闭
    ECalendar.mousedown(function(event){event.stopPropagation()});
    $(document).mousedown(function(){
        if(ECalendar.is(":visible"))
        {
            ECalendar.hide(0,function(){
                if(callback) callback(input.val(),ECalendar);
            })
                .parent(".calendarWarp")
                .css("zIndex",1);
        }
    });

    _this.on("change",function(){
        var date = _this.val() ? new Date(_this.val().replace(/-/g, "/")) : null;
        if(date == null || date == 'Invalid Date')
        {
            input.val("");
            _this.val("");
        }else
        {
            setData(date);
        }

    });

    //快速选择日期
    ilast.click(function(){
        if(select.height() > 0)
            select.animate({"height":0},200);
        else
            select.animate({"height":20},200);
    });
    select.children("li").click(function(){
        var date = new Date();
        var li = $(this);
        var index = li.index();
        if(index === 0) setData(date);
        if(index === 1) setData(new Date(date.getFullYear(),date.getMonth(),date.getDate() + 7,date.getHours(),date.getMinutes()));
        if(index === 2) setData(new Date(date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes()));
        if(index === 3) setData(new Date(date.getFullYear(),date.getMonth()+3,date.getDate(),date.getHours(),date.getMinutes()));
        if(index === 4) setData(new Date(date.getFullYear()+1,date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()));
        select.animate({"height":0},200);
        if(callback) callback(input.val(),ECalendar);
    });

    //选择日期
    day.on("mousedown","li",function(e){
        var li = $(this);
        if(li.hasClass("prve")) getMonth -= 1;
        if(li.hasClass("next")) getMonth += 1;
        getDate = li.text();
        li.siblings('li.activ').removeClass('activ').removeAttr('style');
        drag = $(this);
        if(config.type == 0)
        {
            li.addClass('activ').css({"overflow":"visible","background":config.skin}).append('<div class="at12"><div class="pointer"></div></div>');
            pointer = li.find(".pointer");
            x = e.pageX;
            y = e.pageY;
            dragnum = parseInt($(this).text());
            $("body").addClass("ECalendarNoneSelect");
            _this.attr("readonly","readonly");
            drag.attr("data-settime",(getHour < 10 ? "0" + getHour : getHour) + ":" + (getMinutes < 10 ? "0" + getMinutes : getMinutes));
            //根据时间计算角度
            var a = getHour * 30;
            var a = a + (getMinutes / 2);
            pointer.css({"transform":"rotate("+(a-90)+"deg)"});
        }

        setData(new Date(getFullYear,getMonth - 1,getDate,getHour,getMinutes));
    });

    //上下月选择
    oper.click(function(){
        var li = $(this);
        if(li.index() == 0) getMonth -= 2;
        setData(new Date(getFullYear,getMonth,getDate,getHour,getMinutes));
        if(callback) callback(input.val(),ECalendar);
    });

    $(imonth).mousedown(function(e){
        x = e.pageX;
        y = e.pageY;
        drag = $(this);

        dragnum = parseInt(drag.children('span').text());
        var prehtml = '<i class="r3" data="'+(dragnum - 3)+'">'+(dragnum - 3)+'</i>' + '<i class="r2" data="'+(dragnum - 2)+'">'+(dragnum - 2)+'</i>' + '<i class="r1" data="'+(dragnum - 1)+'">'+(dragnum - 1)+'</i>';
        var apphtml = '<i class="a1" data="'+(dragnum + 1)+'">'+(dragnum + 1)+'</i>' + '<i class="a2" data="'+(dragnum + 2)+'">'+(dragnum + 2)+'</i>' + '<i class="a3" data="'+(dragnum + 3)+'">'+(dragnum + 3)+'</i>';
        drag.prepend(prehtml);
        drag.append(apphtml)
        drag.children('i').each(function(){
            var temp = parseInt($(this).attr("data"));
            if(temp > 12) $(this).text(12).hide();
            if(temp < 1) $(this).text(1).hide();
        })
        currenttime.animate({opacity:.1}, 600);
        $("body").addClass("ECalendarNoneSelect");
        _this.attr("readonly","readonly");
    });
    //选择年
    $(iyear).mousedown(function(e){
        x = e.pageX;
        y = e.pageY;
        drag = $(this);
        dragnum = parseInt(drag.children('span').text());
        var prehtml = '<i class="r3" data="'+(dragnum - 3)+'">'+(dragnum - 3)+'</i>' + '<i class="r2" data="'+(dragnum - 2)+'">'+(dragnum - 2)+'</i>' + '<i class="r1" data="'+(dragnum - 1)+'">'+(dragnum - 1)+'</i>';
        var apphtml = '<i class="a1" data="'+(dragnum + 1)+'">'+(dragnum + 1)+'</i>' + '<i class="a2" data="'+(dragnum + 2)+'">'+(dragnum + 2)+'</i>' + '<i class="a3" data="'+(dragnum + 3)+'">'+(dragnum + 3)+'</i>';
        drag.prepend(prehtml);
        drag.append(apphtml)
        currenttime.animate({opacity:.1}, 600);
        $("body").addClass("ECalendarNoneSelect");
        _this.attr("readonly","readonly");
    });

    $(document).mousemove(function(e){
        if(drag)
        {
            my = parseInt((e.pageY - y) / 10);
            mx = parseInt((e.pageX - x) / 10);
            if(drag[0].tagName == "LI")
            {
                if(Math.abs(my) > 1 || Math.abs(mx) > 1) //防误触
                {
                    //根据坐标计算方位角
                    var ay = (e.pageX - x);
                    var ax = (y - e.pageY);
                    var s = 90 / Math.atan(1/0);
                    var a = Math.atan(ay/ax) * s;

                    if(ax < 0 && ay > 0) a = 180 + a; //第二象限
                    if(ax < 0 && ay <= 0) a = 180 + a; //第三象限
                    if(ax >= 0 && ay < 0) a = 360 + a; //第四象限

                    //根据角度算时间
                    var atime = a / 30;
                    var ahours = parseInt(atime);
                    var amin = parseInt(((atime - ahours) * 60) / timestep) * timestep ;

                    //24小时
                    if(Math.abs(my) > 5 || Math.abs(mx) > 5)
                    {
                        drag.children('div').attr("class","at24")
                        ahours += 12;
                    }else {
                        drag.children('div').attr("class","at12")
                    }

                    getHour = ahours;
                    getMinutes = amin;
                    drag.attr("data-settime",(ahours < 10 ? "0" + ahours : ahours) + ":" + (amin < 10 ? "0" + amin : amin));
                    itimebox.text((ahours < 10 ? "0" + ahours : ahours) + ":" + (amin < 10 ? "0" + amin : amin));
                    pointer.css({"transform":"rotate("+(a-90)+"deg)"});
                }

            }else
            {
                var offsetTemp = my;
                var m = dragnum + offsetTemp;
                if(drag.hasClass("imonth") && m >= 1 && m <= 12)  {
                    drag.children('i').each(function(){
                        var temp = parseInt($(this).attr("data")) + offsetTemp;
                        if(temp > 12 || temp < 1)
                            $(this).hide();
                        else
                            $(this).text(temp).show();
                    })
                    if(m == 12){
                        drag.children('span').nextAll().hide();
                    }else if(m == 1){
                        drag.children('span').prevAll().hide();
                    }
                    drag.children('span').text(m);
                }
                if(drag.hasClass("iyear"))
                {
                    drag.children('i').each(function(){
                        var temp = parseInt($(this).attr("data")) + offsetTemp;
                        $(this).text(temp).show();
                    })
                    drag.children('span').text(m);
                }

            }
        }

    })
    $(document).mouseup(function(){
        if(drag)
        {

            if(drag[0].tagName == "LI")
            {
                var m = drag.text();
                setData(new Date(getFullYear,getMonth - 1,getDate,getHour,getMinutes));
                drag.removeAttr("data-settime").css({"overflow":"hidden"}).children("div").remove();
                ECalendar.hide(0,function(){
                    if(callback) callback(input.val(),ECalendar);
                })
                    .parent(".calendarWarp")
                    .css("zIndex",1);
            }else
            {
                drag.children('i').remove();
                var m = drag.text();
                if(drag.hasClass("imonth")) setData(new Date(getFullYear,m - 1,getDate,getHour,getMinutes));
                if(drag.hasClass("iyear"))
                {
                    setData(new Date(m,getMonth - 1,getDate,getHour,getMinutes));
                }

                currenttime.animate({opacity:1}, 600);
                if(callback) callback(input.val(),ECalendar);
            }
            drag = false;
            $("body").removeClass("ECalendarNoneSelect");
            _this.removeAttr("readonly");
        }
    })
    //初始化
    function init()
    {
        isinit = true;
        var html = '<div class="ECalendarBox ECalendarNoneSelect" style="display:none"><input type="hidden"/><div class="head"><div class="currentdate"><h2><span class="iyear"><span class="activ"></span></span>/<span class="imonth"><span class="activ"></span></span></h2><ul class="oper"><li>&lt;</li><li>&gt;</li></ul></div><div class="currenttime"><span class="ilasttext"></span><span class="itime itimebox"></span></div><ul class="select"><li>今天</li><li>一周后</li><li>一月后</li><li>三月后</li><li>一年后</li></ul><ul class="week"><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li></ul></div><ul class="day"></ul></div></div>';

        ECalendar = $(html);

        //设置颜色

        ECalendar.css("border-color",config.skin);
        ECalendar.children('div.head').css({"border-color":config.skin,"background":config.skin});


        day = ECalendar.find("ul.day");
        imonth = ECalendar.find("span.imonth");
        iday = ECalendar.find("span.iday");
        ilast = ECalendar.find("span.ilasttext");
        itimebox = ECalendar.find("span.itimebox");
        iyear = ECalendar.find("span.iyear");
        select = ECalendar.find("ul.select");
        oper = ECalendar.find("ul.oper li");
        currenttime = ECalendar.find("div.currenttime,ul.week");
        input = ECalendar.children("input[type='hidden']");
        //替换INPUT标签的NAME
        var name = _this.attr("name");
        _this.removeAttr("name");
        input.attr("name",name);
       // _this.after('<svg t="1493098552635" class="icon" style="position: absolute;right:'+ (_this.height() - 5) / 1 +'px;top:23%;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1006" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/scss"></style></defs><path d="M856.576 200.192v54.784h58.368V814.08H109.568V256.512h56.832v-56.32H51.2V870.4h921.6V200.192h-116.224z" fill="#666666" p-id="1007"></path><path d="M819.2 102.4h-204.288v255.488L819.2 358.4V102.4z" fill="#EF4848" p-id="1008"></path><path d="M563.712 664.064h256V716.8h-256zM563.712 512h256v51.2h-256zM461.312 200.192h102.4v56.32h-102.4zM205.312 664.064h256V716.8h-256zM205.312 512h256v51.2h-256z" fill="#666666" p-id="1009"></path><path d="M410.112 102.4H204.8v256l205.312-0.512V102.4z" fill="#EF4848" p-id="1010"></path></svg>');
        _this.after(ECalendar);
        var itime = _this.attr("data-ec") ? _this.attr("data-ec") : _this.val();
        var date = itime ? new Date(itime.replace(/-/g, "/")) : null;
        if(date != 'Invalid Date' && date != null)  setData(date);
    }

    function setData(date)
    {
        getFullYear = date.getFullYear();
        getMonth = date.getMonth()+1;
        getDate = date.getDate();
        weekday = date.getDay();
        getHour = config.type ? 0 : date.getHours();
        getMinutes = config.type ? 0 : date.getMinutes();
        if(ECalendar.data("date") != (getFullYear+"-"+getMonth))
        {
            //获取当前月一号的星期
            var oneday = new Date(getFullYear, getMonth - 1,1);
            oneday = oneday.getDay() ? oneday.getDay() : 7;
            oneday = oneday === 1 ? 8 : oneday;
            //获取当前月的总天数
            var count = new Date(getFullYear,getMonth,0).getDate();

            //获取当前日历的最后一天
            var max = 42;

            //获取上一月的最后一天
            var prevcount = new Date(getFullYear,getMonth-1,0).getDate();

            var list = "";
            for(var i = 1; i<=max; i++)
            {
                if(i < oneday) list += "<li class='other prve'>"+ (prevcount - (oneday - i) + 1) +"</li>";
                else if(i >= oneday && i < count+oneday)
                {
                    if((i - oneday + 1) == getDate)
                        list += "<li class='activ' data='"+(i - oneday + 1)+"' style='background:"+config.skin+"'>"+ (i - oneday + 1) +"</li>";
                    else
                        list += "<li data='"+(i - oneday + 1)+"'>"+ (i - oneday + 1) +"</li>";
                }
                else list += "<li class='other next'>"+ (i - (count + oneday) + 1) +"</li>";
            }
            day.html(list);
        }
        //day.children('li.active').removeClass('active').siblings('li[data='+getDate+']').addClass('active');
        //获取当前时间的时间差
        var now = new Date();
        var diff = new Date(getFullYear,getMonth - 1,getDate).getTime() - new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
        diff = parseInt(diff/(24*3600*1000));

        ECalendar.data("date",(getFullYear+"-"+getMonth));
        imonth.children('span').text(getMonth);
        iyear.children('span').text(getFullYear);
        var iilast = "";
        if(diff == 0)
        {
            iilast = "今天";
        }
        else
        {
            iilast = "<span class='itime'>" + Math.abs(diff) + "</span> ";
            if(diff > 0)
                iilast += "天后";
            else
                iilast += "天前";
        }
        ilast.html(iilast);

        if(config.type == 0)
            itimebox.text((getHour < 10 ? "0"+getHour : getHour) + ":" + (getMinutes < 10 ? "0"+getMinutes : getMinutes));

        var val = config.format.replace('yyyy', getFullYear)
            .replace('mm', getMonth < 10 ? "0"+getMonth:getMonth)
            .replace('dd', getDate < 10 ? "0"+getDate:getDate)
            .replace('hh', getHour < 10 ? "0"+getHour:getHour)
            .replace('ii', getMinutes < 10 ? "0"+getMinutes:getMinutes);
        _this.attr("data-ec",date);
        _this.val(val);
        stamp = val.replace(/-/g,"/")
        stamp = Date.parse(stamp) / 1000
        ECalendar.data("thistime",stamp);
        if(config.stamp) input.val(stamp);
        else input.val(val);
    }
    function IsPC()
    {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
}

var fileUtil={
    upload:function (url,callback) {
       /* if(!config || !config.url || config.url==""){
            return ;
        }
        var url=config.url;
        var callback=config.complete;*/
        $("body").find("input[id='file']").remove();
        var file=$("<input type='file' id='file' style='opacity: 0' />");
        file.appendTo("body");
        this.callback=callback;
        file.click();
        file.change(function () {
            var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
            //console.log(fileObj);
            var form = new FormData(); // FormData 对象
            form.append("file", fileObj); // 文件对象
            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.onload = fileUtil.uploadComplete; //请求完成
            xhr.onerror =  fileUtil.uploadFailed; //请求失败
            xhr.upload.onprogress = fileUtil.progressFunction;//【上传进度调用方法实现】
            xhr.upload.onloadstart = function(){//上传开始执行方法
                ot = new Date().getTime();   //设置上传开始时间
                oloaded = 0;//设置上传开始时，以上传的文件大小为0
            };
            xhr.send(form); //开始上传，发送form数据
        });

    },
    uploadComplete:function (evt) {
        var data = JSON.parse(evt.target.responseText);
        var callback=fileUtil.callback;
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
        file.remove();
       // $("body").find("input[id='file']").remove();
    },
    uploadFailed:function (evt) {
        $.ligerDialog.warn("请求失败");
        file.remove();
       // $("body").find("input[id='file']").remove();
    },
    progressFunction:function (evt) {  //进度条功能
       /* var progressBar = document.getElementById("progressBar");
        var percentageDiv = document.getElementById("percentage");
        var time = document.getElementById("time");*/
        // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
        if (evt.lengthComputable) {//
           /* progressBar.max = evt.total;
            progressBar.value = evt.loaded;
            percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";*/
            console.log("进度："+ Math.round(evt.loaded / evt.total * 100) + "%");
        }
        var nt = new Date().getTime();//获取当前时间
        var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
        ot = new Date().getTime(); //重新赋值时间，用于下次计算
        var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
        oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
        //上传速度计算
        var speed = perload/pertime;//单位b/s
        var bspeed = speed;
        var units = 'b/s';//单位名称
        if(speed/1024>1){
            speed = speed/1024;
            units = 'k/s';
        }
        if(speed/1024>1){
            speed = speed/1024;
            units = 'M/s';
        }
        speed = speed.toFixed(1);
        //剩余时间
        var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
        /* time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
        if(bspeed==0) time.innerHTML = '上传已取消';*/
        console.log('  速度：'+speed+units+'，剩余时间：'+resttime+'s');
        if(bspeed==0) console.log("上传已取消");
    }
};
(function($){
    $.extend($.fn, {

        /**
         * 初始化布局
         * @param layoutCfg
         */
        initLayout:function(layoutCfg){
            var obj=this;
            $(obj).ligerLayout(layoutCfg);
            $(window).resize(function () {   //当浏览器大小变化时
                $(obj).ligerLayout(layoutCfg);
            });
        },
        /**
         * 根据配置参数布局
         * @param layoutCfg
         * topHeight:0  //顶部高度
         * leftWidth:0  //左边宽度
         * rightWidth:0 //右边宽度
         * bottomHeight:0 //底部高度
         */
        ligerLayout:function(layoutCfg){
            if(!layoutCfg){
                return ;
            }
            var layout=this;   //当前布局对象
            var layoutSpacing=5;  //子布局边距
            var layoutWidth=$(this).width();  //布局总宽度
            var layoutHeight=$(this).height(); //布局总高度
            var topHeight=layoutCfg.topHeight?layoutCfg.topHeight:0;  //头部高度
            var leftWidth=layoutCfg.leftWidth?layoutCfg.leftWidth:0;  //左边宽度
            var rightWidth=layoutCfg.rightWidth?layoutCfg.rightWidth:0;  //右边宽度
            var bottomHeight=layoutCfg.bottomHeight?layoutCfg.bottomHeight:0; //底部高度
            var topDiv=$(this).find("div[position='top']");
            var leftDiv=$(this).find("div[position='left']");
            var centerDiv=$(this).find("div[position='center']");
            var rightDiv=$(this).find("div[position='right']");
            var bottomDiv=$(this).find("div[position='bottom']");
            var isExitTopDiv=topDiv[0]?true:false;
            var isExitLeftDiv=leftDiv[0]?true:false;
            var isExitCenterDiv=centerDiv[0]?true:false;
            var isExitRightDiv=rightDiv[0]?true:false;
            var isExitBottomDiv=bottomDiv[0]?true:false;
            $(this).find(".layout-vertical-arrow").remove();
            $(this).find(".layout-horizontal-arrow").remove();
            if(topHeight>0&&leftWidth>0&&rightWidth>0&&bottomHeight>0){  //宽度高度都存在
                if(isExitTopDiv&&isExitLeftDiv&&isExitCenterDiv&&isExitRightDiv&&isExitBottomDiv){  //子布局都存在

                    var centerDivWidth=layoutWidth-leftWidth-rightWidth-layoutSpacing*2;
                    var centerDivHeight=layoutHeight-topHeight-bottomHeight-layoutSpacing*2;
                    var leftDivHeight=layoutHeight-topHeight-bottomHeight-layoutSpacing*2;
                    var rightDivHeight=layoutHeight-topHeight-bottomHeight-layoutSpacing*2;
                    topDiv.addClass("layout-son layout-son-bg").css({
                        height:topHeight
                    });

                    leftDiv.addClass("layout-son layout-son-bg").css({
                        float:"left",
                        width:leftWidth,
                        height:leftDivHeight,
                        "margin-top":layoutSpacing
                    });

                    centerDiv.addClass("layout-son").css({
                        float:"left",
                        width:centerDivWidth,
                        height:centerDivHeight,
                        "margin-left":layoutSpacing,
                        "margin-top":layoutSpacing,
                        "margin-bottom":layoutSpacing
                    });

                    rightDiv.addClass("layout-son layout-son-bg").css({
                        float:"left",
                        width:rightWidth,
                        height:rightDivHeight,
                        "margin-left":layoutSpacing,
                        "margin-top":layoutSpacing
                    });

                    bottomDiv.addClass("layout-son layout-son-bg").css({
                        height:bottomHeight,
                        clear:"both"
                    });

                    //左边收缩图标
                    var miniLeft=$("<div class='layout-vertical-arrow mini-left'></div>");
                    miniLeft.css({
                        left:leftWidth,
                        height:layoutHeight-topHeight-bottomHeight-layoutSpacing*2,
                        top:topHeight+layoutSpacing
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-left");
                        if(iconClass){
                            leftDiv.css({
                                width:0,
                                "border-width":0
                            });
                            var centerWith=centerDivWidth+leftWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-left").addClass("mini-right").css({
                                left:0
                            });
                        }else{
                            leftDiv.css({
                                width:leftWidth,
                                "border-width":1
                            });
                            var centerWith=centerDiv.width()+1-leftWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-right").addClass("mini-left").css({
                                left:leftWidth
                            });
                        }
                    });

                    //右侧收缩图标
                    var miniRight=$("<div class='layout-vertical-arrow mini-right'></div>");
                    miniRight.css({
                        right:rightWidth,
                        height:layoutHeight-topHeight-bottomHeight-layoutSpacing*2,
                        top:topHeight+layoutSpacing
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-right");
                        if(iconClass){
                            rightDiv.css({
                                width:0,
                                "border-width":0
                            });
                            var centerWith=centerDivWidth+rightWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-right").addClass("mini-left").css({
                                right:0
                            });
                        }else{
                            rightDiv.css({
                                width:rightWidth,
                                "border-width":1
                            });
                            var centerWith=centerDiv.width()+1-rightWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-left").addClass("mini-right").css({
                                right:rightWidth
                            });
                        }
                    });


                    //上部收缩图标
                    var miniTop=$("<div class='layout-horizontal-arrow mini-top'></div>");
                    miniTop.css({
                        left:0,
                        top:topHeight
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-top");
                        if(iconClass){
                            topDiv.css({
                                height:0,
                                "border-width":0
                            });
                            var centerHeight=centerDivHeight+topHeight;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-top").addClass("mini-bottom").css({
                                top:0
                            });
                        }else{
                            topDiv.css({
                                height:topHeight,
                                "border-width":1
                            });
                            var centerHeight=centerDiv.height()-topHeight+1;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-bottom").addClass("mini-top").css({
                                top:topHeight
                            });
                        }
                    });


                    //底部收缩图标
                    var miniBottom=$("<div class='layout-horizontal-arrow mini-bottom'></div>");
                    miniBottom.css({
                        left:0,
                        bottom:bottomHeight
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-bottom");
                        if(iconClass){
                            bottomDiv.css({
                                height:0,
                                "border-width":0
                            });
                            var centerHeight=centerDivHeight+bottomHeight;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-bottom").addClass("mini-top").css({
                                bottom:0
                            });
                        }else{
                            bottomDiv.css({
                                height:bottomHeight,
                                "border-width":1
                            });
                            var centerHeight=centerDiv.height()-bottomHeight+1;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-top").addClass("mini-bottom").css({
                                bottom:bottomHeight
                            });
                        }
                    });
                }else{
                    console.log("some of div elements are missing");
                }
            }else if(topHeight==0&&leftWidth>0&&rightWidth==0&&bottomHeight==0){  //只有左边有宽度时

                if(isExitLeftDiv&&isExitCenterDiv){  //存在左边布局和中间布局

                    leftDiv.addClass("layout-son layout-son-bg").css({
                        float:"left",
                        width:leftWidth,
                        height:layoutHeight
                    });
                    console.log(layoutWidth-leftWidth-layoutSpacing);
                    centerDiv.addClass("layout-son").css({
                        float:"left",
                        width:layoutWidth-leftWidth-layoutSpacing,
                        height:layoutHeight,
                        "margin-left":layoutSpacing
                    });

                    //左边收缩图标
                    var miniLeft=$("<div class='layout-vertical-arrow mini-left'></div>");
                    miniLeft.css({
                        left:leftWidth,
                        top:0
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-left");
                        if(iconClass){
                            leftDiv.css({
                                width:0,
                                "border-width":0
                            });
                            var centerWith=centerDiv.width()+leftWidth+2;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-left").addClass("mini-right").css({
                                left:0
                            });
                        }else{
                            leftDiv.css({
                                width:leftWidth,
                                "border-width":1
                            });
                            //var centerWith=centerDiv.width()+2-leftWidth;
                            var centerWith=layoutWidth-leftWidth-layoutSpacing;
                            console.log(centerWith);
                           // console.log(layoutWidth-leftWidth-layoutSpacing);
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-right").addClass("mini-left").css({
                                left:leftWidth
                            });
                        }
                    });

                }else{
                    console.log("left or center div elements are missing");
                }
            }else{
                console.log("The corresponding parameters are missing");
            }




        }

    });
})(jQuery);
(function($){
    $.extend($.fn, {
          initTab:function () {
               var obj=this;
               var index=window.localStorage.getItem("tabIndex");
               if(index==null){
                  index=0;
               }
              $(this).children("div[class*='tabs-header']").children("p").removeClass("selected").addClass("cursor");
               /*
               var length=$(this).children("div[class*='tabs-header']").children(".selected").length;
               if(length>0){
                   index=$(this).children("div[class*='tabs-header']").children(".selected").index()
               }else{
                   index=window.localStorage.getItem("tabIndex");
                   if(index==null){
                       index=0;
                   }
               }
               */
              $(this).children("div[class*='tabs-header']").children("p").eq(index).addClass("selected");
              $(this).children("div[class*='tabs-content']").eq(index).show();

              $(this).children("div[class*='tabs-header']").children("p").click(function () {
                   $(obj).children("div[class*='tabs-header']").children("p").removeClass("selected");
                   $(this).addClass("selected");
                   $(obj).children("div[class*='tabs-content']").hide();
                   var i=$(this).index();
                   window.localStorage.setItem("tabIndex",i);
                   $(obj).children("div[class*='tabs-content']").eq(i).show();
              });

          }
    });
})(jQuery);
(function($){
    $.extend($.fn, {
        initTree:function(callback){
            var obj=this;
            $(obj)._treeCss();
            $(obj)._treeOpenClose();
            $(obj)._treeChecked();
            $(obj)._treeClick(callback);
        },
        _treeCss:function(){
           var lis=$(this).find("li");
            lis.each(function(){
                //console.log(123);
                var isHasSunUl=$(this).children("ul").length==1?true:false;
                //var isHasSunI=$(this).children("div").children("i").length==1?true:false;
                //console.log(isHasSunUl);
                var isHasSon=false;
                 if(isHasSunUl){
                     var isHasSunLi=$(this).children("ul").children("li").length>0?true:false;
                     if(isHasSunLi){
                         isHasSon=true;
                     }
                 }
                 if(isHasSon){
                     $(this).children("div").prepend("<i class='iconfont icon-arrow-down'></i>");
                 }else{
                     $(this).children("div").css({
                         "padding-left":20
                     });
                 }
           });
        },
        _treeOpenClose:function(){
            $(this).find("i[class*='iconfont']").click(function(){
                 var iconClass=$(this).hasClass("icon-arrow-right");
                 if(iconClass){  //关闭状态
                     $(this).removeClass("icon-arrow-right").addClass("icon-arrow-down").parent("div").next("ul").show();
                 }else{
                     $(this).removeClass("icon-arrow-down").addClass("icon-arrow-right").parent("div").next("ul").hide();
                 }
            });
        },
        _treeChecked:function(){
            $(this).find("span[class='tree-input']").click(function(){
                 var checked=$(this).find("input[type='checkbox']").prop("checked");
                 if(checked){
                     $(this).parent("div").next("ul").find("input[type='checkbox']").prop("checked",true);
                     $(this).parents("ul").prev("div").find("input[type='checkbox']").prop("checked",true);
                 }else{
                     $(this).parent("div").next("ul").find("input[type='checkbox']").prop('checked',false);
                 }
            });
        },
        _treeClick:function (callback) {
            var obj=this;
            $(this).find("span[class*='tree-text']").click(function () {
                 $(obj).find("span[class*='tree-text']").removeClass("selected");
                 $(this).addClass("selected");
                 if(callback&&$.isFunction(callback)){
                     var value=$(this).attr("data-value");
                     if(!value){
                         value=null;
                     }
                     callback(value)
                 }
            });
        }
    });
})(jQuery);