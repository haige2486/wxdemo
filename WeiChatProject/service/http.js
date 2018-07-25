var root = 'https://www.sojson.com';  //你的域名
function req(url,data,cb){
  wx.request({
    url:root + url,
    data:data,
    method:'GET',
    header: {'content-type':'application/json'},
    success:function(res){
      return typeof cb == "function" && cb(res.data);
    },
    fail:function(){
      return typeof cb == "function" && cb(false);
    }
  })
}
module.exports = {req:req}