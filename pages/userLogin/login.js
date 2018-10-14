const app = getApp()

Page({
    data: {
      imgUrls: [
        '../resource/images/0093.jpg',
        '../resource/images/293726-106.jpg',
        '../resource/images/296027-0.jpg'
      ],
    },

    doLogin: function(e) {
      var formObj = e.detail.value;
      var username = formObj.username;
      var password = formObj.password;

      //简单验证
      if(username.length == 0 || password.length == 0) {
        wx.showToast({
          title: '用户名或密码不能为空',
          icon:'none',
          duration:3000
        })
      }else{
        var serverUrl = app.serverUrl;
        wx.showLoading({
          title: '请等待',
        })
        wx.request({
          url: serverUrl+'/login',
          method : "POST",
          data:{
            username: username,
            password:password
          },header: {
            'content-type':'application/json'
          },
          success :function(res) {
            console.log(res.data);
            wx.hideLoading();
            var status = res.data.status;
            if(status == 200) {
              wx.showToast({
                title: "登录成功",
                icon: 'success',
                duration: 2000
              });
              //app.userInfo = res.data.data;
              app.setGlobalUserInfo(res.data.data);

              wx.redirectTo({
                url: '../mine/mine',
              });
            }else if(status == 500) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      }
    },
  goRegistPage:function() {
      wx.redirectTo({
        url:'../userRegist/regist'
      })
  }

})