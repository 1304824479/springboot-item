// JavaScript Document

var version,phoneWidth=parseInt(window.screen.width),phoneScale=phoneWidth/750,ua=navigator.userAgent;/Android (\d+\.\d+)/.test(ua)?(version=parseFloat(RegExp.$1),version>2.3?document.write('<meta name="viewport" content="width=375, minimum-scale='+phoneScale+", maximum-scale = "+phoneScale+', target-densitydpi=device-dpi">'):document.write('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">')):document.write('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');
