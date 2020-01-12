/**
 * 页面初始化的入口函数
 */
function initFun() {


    var config={
        url:"http://192.168.2.45:7878/entity",
        params:{
            id:123
        },
        getData:function (obj) {
            var data={
                username:obj['username'],
                address:"广东省深圳市南山科技园",
                birthday:obj['birthday'],
                schoole:obj['schoole'],
                src:obj['src']
            };
            return data;
        }
    };
    $("div[class='page-content']").entity(config);

}