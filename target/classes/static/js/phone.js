/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

var itemApp={
    domain:"http://192.168.2.45:8080",
    phone:1,    //0  wap   1 android    2   ios
    webRoot:""  //项目更目录
};




function windowRoot(){
    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    });

    /*
    if(dirDeep > 1){
        //获取本地存储的用户名
        var userId=token.getItem("userId");
        var username=token.getItem("username");
        var tokenStr=token.getItem("tokenStr");
        if (userId == null || username == null || tokenStr == null) { // 用户名为空或者用户key为空
            var url_prefix = "";
            for(var i=0; i<(dirDeep-1); i++) {
                url_prefix += "../";
            }
            window.location.href = url_prefix + "login.html";
        } else {
            $.post(app.domain + "/token_verific.html", {
                userId : userId,
                username : username,
                tokenStr : tokenStr
            }, function(data) {
                var resultCode = data.resultCode; // 返回结果代码
                var resultInfo = data.resultInfo; // 返回结果信息
                if (resultCode != 0) {
                    var url_prefix = "";
                    for(var i=0; i<(dirDeep-1); i++) {
                        url_prefix += "../";
                    }
                    window.location.href = url_prefix + "login.html";
                } else {
                    if (data.tokenStr != "" && data.tokenStr != undefined) {
                        token.setItem("tokenStr", data.tokenStr);
                    }
                    pageRoot();
                }
            });
        }
    }else if(dirDeep==1){
        pageRoot();
    }
    */

    pageRoot();
}


//页面初始化的函数入口
function pageRoot(){
    $(function() {

        //执行页面初始化函数
        var initFun = $("div[class='page']").attr("data-initFun");
        if (initFun != undefined) {
            window[initFun]();
        }

        //绑定事件
        bindEvent();

    });
}


//获取目录的深度   1：代表一级目录，即网站根目录  2：代表二级目录
function getDirDeep(){
    var rootStart = "/app";
    //console.log("rootStart="+rootStart);
    var pagePath=  window.location.pathname;  //页面路径
   // console.log("pagePath="+pagePath);
    pagePath = pagePath.substring(pagePath.indexOf("/app/"), pagePath.length);
    pagePath = pagePath.replace(rootStart, "");
   // console.log("pagePath="+pagePath);
    var dirDeep = getStrCount(pagePath,"/");
    return dirDeep;
}

//绑定事件
function bindEvent() {

    //绑定含有data-url的点击事件
    $("[data-url]").click(function() {
        var url = $(this).attr("data-url");
        window.location.href = url;
    });


    //绑定返回事件
    $("div[class='back']").click(function() {
        var url = $(this).attr("data-url");
        var clickFun = $(this).attr("data-clickFun");
        if (url == undefined && clickFun == undefined) {
            window.history.go(-1);
        } else if (clickFun != undefined) {
            window[clickFun]();
        }
    });

    //绑定input的回车事件
    $("input").keypress(function(e){
        if(e.keyCode === 13) {
            // 处理相关逻辑
            $(this).blur();
            var keyEnter=$(this).attr("data-keyEnter");
            if (keyEnter != undefined) {
                window[keyEnter]();
            }
        }
    });
}

function loadJs(cfg) {
    var  loadJsType=cfg.loadJsType; //0 默认  1：自定义js
    var  jsRoot=cfg.jsRoot; //js的根目录
    var  jsFileName=cfg.jsFileName;  //自定义js文件名

    var pagePath=  window.location.pathname;  //页面路径
    if(loadJsType==0){
        jsFileName=pagePath.substring(pagePath.lastIndexOf("/")+1,pagePath.lastIndexOf("."))+".js";
        var url_prefix = "";
        var dirDeep = getDirDeep(); //目录的深度  1：代表一级目录，即网站根目录  2：代表二级目录    3：代表三级目录
       // console.log("dirDeep="+dirDeep);
        for(var i=0; i<(dirDeep-1); i++) {
            url_prefix += "../";
        }
    }
    var jsFile=url_prefix+jsRoot+jsFileName;
    console.log("jsFile="+jsFile);
    document.write("<script src='"+jsFile+"'></script>");
}



var pageConfig={
    loadJsType:0, //0 默认  1：自定义js
    jsRoot:"js/pages/data/" , //js的根目录
    jsFileName:""  //自定义js文件名
};
//loadJs(pageConfig); //加载js
windowRoot();  //执行页面初始化


var app={

    //保存数据到缓存中
    setItem:function(key,value){
        var islocal='localStorage' in window && window['localStorage'] !== null;
        if(islocal){
            window.localStorage.setItem(key,value);
        }else{
            $.cookie(key,value,{expires:365,path: '/'});
        }
    },

    //从缓存中获取数据
    getItem:function (key) {
        var islocal='localStorage' in window && window['localStorage'] !== null;
        var value=null;
        if(islocal){
            value=localStorage.getItem(key);
        }
        if(value==null){
            value=$.cookie(key);
        }
        return value;
    },

    //删除缓存中的数据
    removeItem:function (key) {
        var islocal='localStorage' in window && window['localStorage'] !== null;
        if(islocal){
            window.localStorage.removeItem(key);
        }else{
            $.cookie(key,null,{ path: '/' });
        }
    },
    //发起post请求
    post:function(methodPath, param1, param2) {
        var paramsLength = arguments.length;
        var userId = this.getItem("userId");
        var username = this.getItem("username");
        var tokenStr = this.getItem("tokenStr");

        var url = itemApp.domain   + methodPath;

        var params = null; // 请求参数
        var callback = null; // 回调函数
        if (userId == null) {
            userId = "";
        }
        if (username == null) {
            username = "";
        }
        if (tokenStr == null) {
            tokenStr = "";
        }

        if (paramsLength == 3) {
            params = param1;
            params['userId'] = userId;
            params['username'] = username;
            params['tokenStr'] = tokenStr;
            callback = param2;
        }
        if (paramsLength == 2) {
            params = {
                "userId" : userId,
                "username" : username,
                "tokenStr" : tokenStr
            };
            callback = param1;
        }
        $.post(url, params, function(data) {
            if ((typeof callback) == 'function') {
                if (data != "error") {
                    callback(data);
                } else {

                }
            }
        });
    },
    //获取页面的参数值
    getParamValue:function (name) {
        var thisURL = document.URL;
        var index = thisURL.indexOf("?");
        var result = "";
        if (index != -1) {
            var param = thisURL.substring(index + 1, thisURL.lenght);
            var arr = param.split("&");
            for (var i = 0; i < arr.length; i++) {
                var str = arr[i];
                var str2 = str.split("=");
                if (name == str2[0]) {
                    result = str2[1];
                }
            }
        }
        return result;
    },
    //及时弹出框
    alert:function (content,callback) {
        var alertBg = $("<div class='alert-bg'></div>");
        var contentDiv = $("<div class='alert'>" + content + "</div>");
        var length = $("body").find("div[class='alert']").length;
        if (length == 0) {
            alertBg.append(contentDiv);
            $("body").append(alertBg);
            var width = contentDiv.outerWidth();
            var bgWidth=alertBg.outerWidth();
            console.log(width);
            var left = (bgWidth- width) / 2 ;
            contentDiv.css("marginLeft",left);
            contentDiv.fadeIn("slow");
            window.setTimeout(function() {
                contentDiv.fadeOut("slow", function() {
                    alertBg.remove();
                    if((typeof callback)== 'function'){
                        callback();
                    }
                });
            }, 2000);
        }
    }
};

//jQuery扩展函数
jQuery.fn.extend({
    clickToPage: function (url) {
        return this.each(function () {
            $(this).click(function () {
                window.location.href = url;
            });
        });
    }
});

/* 跳转页面  */
function toPage(url){
    window.location.href = url;
}


/* 刷新页面  */
function refreshPage(){
    window.location.reload();
}



//获取特殊字符在源字符串中的个数
function getStrCount(scrstr, armstr){  //scrstr 源字符串  armstr 特殊字符
    var count=0;
    while(scrstr.indexOf(armstr) >=0 ){
        scrstr = scrstr.replace(armstr,"");
        count++;
    }
    return count;
}


// 验证手机号是否正确
function isMobile(phone) {
    var reg = /^0?(13[0-9]|14[01456789]|15[0-9]|16[56]|17[01235678]|18[0-9]|19[89])[0-9]{8}$/;
    if (!reg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

// 验证座机号码是否正确
function isPhone(phone) {
    var reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if (!reg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

//金额格式化
function amountFormat(amount){
    var reg=/^\d+$/;
    if(reg.test(amount)){
        return amount;
    }else{
        var amount2=amount.toFixed(2);
        amount2=parseFloat(amount2)
        return amount2;
    }
}


//String类型扩展方法
String.prototype.endWith = function(str) {
    if (str == null || str == "" || this.length == 0
        || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
};

//String类型扩展方法
String.prototype.startWith = function(str) {
    if (str == null || str == "" || this.length == 0
        || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
};

//String类型扩展方法
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};


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

//String类替换所有字符
String.prototype.replaceAll = function (FindText, RepText) {
    var regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
};

//验证是否为空
function isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
(function($){
    $.extend($.fn, {
        /**
         * 作者：姚明
         * 日期：2018-11-01
         * 功能：仿android加载列表数据
         * @param config
         * url:请求后台的url (可选参数)
         * params：请求后台的参数  (可选参数)
         * data：列表数据 (可选参数)
         * isOpenCache： 是否开启页面缓存机制 默认false (可选参数)
         * moreDiv：更多按钮 (必填参数)
         * onItemClick ：项目点击方法，(可选参数)
         * getItem：获取每一项数据 (必填参数)
         *
         */
         list:function (config) {
             if(this._checkListConfig(config)){
                 var ulObj=this;
                 if(config.isOpenCache){
                     var listCache=window.localStorage.getItem("listCache");
                     if(listCache==null){
                         $(ulObj)._list(config,1);
                     }else{
                         listCache=JSON.parse(listCache);
                         var ulObjHtml=listCache.ulObjHtml;
                         var page=listCache.page;
                         var pageCount=listCache.pageCount;
                         var scrollTop=listCache.scrollTop;
                         $(ulObj).html(ulObjHtml);
                         var isHaveClick=$.isFunction(config.onItemClick);
                         if(isHaveClick){
                             $(ulObj).children().each(function () {
                                 var item=this;
                                 var cacheObj=$(item).attr("data-cache");
                                 obj=JSON.parse(cacheObj);
                                 $(this)._onItemClick(ulObj,config,page,pageCount,obj);
                             });
                         }
                         if(page<pageCount){
                             var moreDiv=config.moreDiv;
                             $(ulObj)._scroll(config,page);
                             $(ulObj).after(moreDiv);
                         }
                         window.localStorage.removeItem("listCache");
                         $(ulObj).parent().scrollTop(scrollTop);
                     }
                 }else{
                     $(ulObj)._list(config,1);
                 }
             }
         },
        _checkListConfig:function (config) {
            if(!config){
                //alert("列表配置文件不能为空");
                app.alert("列表配置文件不能为空");
                return false;
            }

            if(!config.moreDiv || config.moreDiv==""){
                app.alert("更多列表元素不能为空");
                return false;
            }
            return true;
        },
        _list:function (config,page) {
            var ulObj=this;
            var moreDiv=config.moreDiv;
            var data=config.data;
            var pageCount=1;
            var isHaveClick=$.isFunction(config.onItemClick);
            if(data){
                pageCount=data.pageCount;

                var list=data.list;
                $.each(list,function(i,obj){
                    var item=config.getItem(obj);
                    if(isHaveClick){
                        item._onItemClick(ulObj,config,page,pageCount,obj);
                    }
                    $(ulObj).append(item);
                });
                if(page==1&&page<pageCount){
                    $(ulObj).after(moreDiv);
                }
                if(page<pageCount){
                    $(ulObj)._scroll(config,page);
                }else{
                    moreDiv.remove();
                }
            }else{
                var url=config.url;
                var params=config.params;
                if(!params){
                    params={page:page}
                }else{
                    params['page']=page;
                }

                $.post(url,params,function (data) {
                    pageCount=data.pageCount;
                    var list=data.list;
                    $.each(list,function(i,obj){
                        var item=config.getItem(obj);
                        if(isHaveClick){
                            item._onItemClick(ulObj,config,page,pageCount,obj);
                        }
                        $(ulObj).append(item);
                    });
                    console.log("page="+page+",pageCount="+pageCount);
                    if(page==1&&page<pageCount){
                        $(ulObj).after(moreDiv);
                    }
                    if(page<pageCount){
                        $(ulObj)._scroll(config,page);
                    }else{
                        moreDiv.remove();
                    }
                });

            }
        },
        _scroll:function (config,page) {
            var ulObj=this;
            var ulParent=$(this).parent();
            $(ulParent).on('scroll',function(){
                var divHeigth=ulParent.outerHeight();
                var scrollTop=ulParent.scrollTop();
                var scrollHeight=ulParent.get(0).scrollHeight;
                if(scrollHeight==(divHeigth+scrollTop)){
                    $(ulParent).unbind("scroll");
                    page+=1;
                    console.log("加载第"+page+"页");
                    $(ulObj)._list(config,page);
                }
            });
        },
        _onItemClick:function (ulObj,config,page,pageCount,obj) {
            var isHaveClick=$.isFunction(config.onItemClick);
            var isOpenCache=config.isOpenCache;
            var item=this;
            $(item).attr("data-cache",JSON.stringify(obj));
            if(isHaveClick){
                $(item).removeAttr("onclick");
                item.click(function () {
                    if(isOpenCache){
                        var ulObjHtml=$(ulObj).html();
                        var scrollTop=$(ulObj).parent().scrollTop();
                        var listCache={
                            ulObjHtml:ulObjHtml,
                            page:page,
                            pageCount:pageCount,
                            scrollTop:scrollTop
                        };
                        listCache=JSON.stringify(listCache);
                        window.localStorage.setItem("listCache",listCache);
                    }
                    config.onItemClick(obj);
                })
            }
        }
    });
})(jQuery);







(function($){
    $.extend($.fn, {
        /**
         * 作者：姚明
         * 日期：2018-10-30
         * @param config
         * leftSymbol：变量左符号 (可选参数  默认符号 {{ )
         * rightSymbol：变量右符号 (可选参数  默认符号 }} )
         * url:请求后台的url (可选参数)
         * params：请求后台的参数  (可选参数)
         * data:要加载的数据  (可选参数,如果缺省，则请求url加载数据)
         * getData:数据的绑定 （可选参数，如果存在，则请求到后台数据之后通过该方法对数据进行绑定）
         *
         */
        entity:function (config) {
            if(!config){
                app.alert("配置文件不能为空");
                return ;
            }
            var docObj=this;
            var leftSymbol=config.leftSymbol?config.leftSymbol:"{{"; //左分隔符
            var rightSymbol=config.rightSymbol?config.rightSymbol:"}}"; //右分隔符
            var  resultObj=$(docObj)._checkHtmlCode(leftSymbol,rightSymbol);
            var checkResult=resultObj.checkResult;
            var length=resultObj.length;
            if(checkResult&&length>0){
                var startArr=resultObj.startArr;
                var endArr=resultObj.endArr;
                var htmlCode=$(docObj).html();
                //$(docObj)._replaceHtml(htmlCode,startArr,endArr);
                var obj=config.data;
                if(obj){
                    $(docObj)._replaceHtml(htmlCode,obj,startArr,endArr,leftSymbol,rightSymbol);
                }else{
                    var url=config.url;
                    var params=config.params;
                    if(!params){params={} };
                    if(url&&url!=""){
                        $.post(url,params,function (data) {
                            var isMethod=$.isFunction(config.getData);
                            obj=data;
                            if(isMethod){
                                obj=config.getData(data);
                            }
                            //console.log(obj);
                             $(docObj)._replaceHtml(htmlCode,obj,startArr,endArr,leftSymbol,rightSymbol);
                        });
                    }


                }


            }
        },
        _checkHtmlCode:function (leftSymbol,rightSymbol) {
            var docObj=this;
            var htmlCode=$(docObj).html();
            var startArr=new Array();
            var endArr=new Array();
            var startIndex=htmlCode.indexOf(leftSymbol);
            while (startIndex!=-1){
               // console.log("startIndex="+startIndex);
                startArr.push(startIndex);
                startIndex=htmlCode.indexOf(leftSymbol,startIndex+leftSymbol.length);
            }
            var endIndex=htmlCode.indexOf(rightSymbol);
            while (endIndex!=-1){
                endArr.push(endIndex);
                endIndex=htmlCode.indexOf(rightSymbol,endIndex+rightSymbol.length);
            }
            var length=startArr.length;
            var checkResult=true;
            var resultObj={
                checkResult:checkResult,
                startArr:startArr,
                endArr:endArr,
                length:length
            };
            if(length==0){
                resultObj.checkResult=false;
                return resultObj;
            }
            if(startArr.length!=endArr.length){
                resultObj.checkResult=false;
                app.alert("左符号和右符号的数量不匹配");
                return resultObj;
            }
            for(var i=0;i<length;i++){
                 if(startArr[i]>endArr[i]){
                     resultObj.checkResult=false;
                     app.alert("右符号不能在左括号的前面");
                     return resultObj;
                 }
                 if(i<length-1){
                     if(startArr[i+1]<endArr[i]){
                         resultObj.checkResult=false;
                         app.alert("符号不能嵌套使用");
                         return resultObj;
                     }
                 }
                 var varName=htmlCode.substring(startArr[i]+leftSymbol.length,endArr[i]).trim();
                 var reg=/^[A-Za-z0-9]+$/;
                 if(!reg.test(varName)){
                     resultObj.checkResult=false;
                     app.alert("变量名"+varName+"命名规范有误");
                     return resultObj;
                 }
            }
            return resultObj;
        },
        _replaceHtml:function (htmlCode,obj,startArr,endArr,leftSymbol,rightSymbol) {
            var docObj=this;
            var length=startArr.length;
            var htmlResult=htmlCode;
            for(var i=0;i<length;i++){
                var sourceName=htmlCode.substring(startArr[i]+leftSymbol.length,endArr[i]);
                var objName=sourceName.trim();
                if(obj&&obj[objName]){
                    htmlResult=htmlResult.replace(leftSymbol+sourceName+rightSymbol,obj[objName]);
                }else{
                   // htmlResult=htmlResult.replace("["+sourceName+"]","");
                }
            }
            //htmlResult=htmlResult.replace(/data-src/g,"src");
            $(docObj).html(htmlResult);
            $(docObj).find("img").each(function () {
                var data_src=$(this).attr("data-src");
                //console.log(data_src);
                if(data_src.indexOf(leftSymbol)==-1&&data_src.indexOf(rightSymbol)==-1){
                    $(this).attr("src",data_src).removeAttr("data-src");
                }
            })
        }
    });
})(jQuery);