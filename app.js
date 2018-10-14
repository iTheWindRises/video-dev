//app.js
App({
  serverUrl:"http://192.168.2.1:8080",
 userInfo :null,
 
 setGlobalUserInfo:function(user) {
   wx.setStorageSync("userInfo", user);
 },
  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  }
})