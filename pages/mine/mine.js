
const app = getApp()

Page({
  data: {
    faceUrl:'../resource/images/noneface.png',
  },
  onLoad: function() {
      var me = this;
      var serverUrl = app.serverUrl;

      var user = app.userInfo;
      wx.request({
            url: serverUrl+'/user/query?userId='+user.id,
            method : "POST",
            header: {
              'content-type':'application/json'
            },
            success :function(res) {
              console.log(res.data);
              var status = res.data.status;
              if(status == 200) {
                var userInfo = res.data.data;
                var faceUrl = "../resource/images/noneface.png"
                if (userInfo.faceImage != null && userInfo.faceImage != "" && 
                  userInfo.faceImage!= undefined) {
                    faceUrl = userInfo.faceImage
                  }
                me.setData({
                  faceUrl:serverUrl +userInfo.faceImage,
                  fansCounts: userInfo.fansCounts,
                  followCounts: userInfo.followCounts,
                  receiveLikeCounts: userInfo.receiveLikeCounts,
                  nickname: userInfo.nickname
                })
              }
            }
          })
  },
  logout: function() {
    var user = app.userInfo;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待',
    })
    wx.request({
      url: serverUrl + '/logout?userId='+user.id,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        var status = res.data.status;
        if (status == 200) {
          wx.showToast({
            title: "注销成功",
            icon: 'success',
            duration: 2000
          });
           app.userInfo = null;
           wx.redirectTo({
             url: '../userLogin/login',
           });
        } 
      }
    })
  },
  changeFace:function() {
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['album'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        

        wx.showLoading({
          title: '上传中',
        })
        var serverUrl = app.serverUrl;
        wx.uploadFile({
          url: serverUrl+'/user/uploadFace?userId='+app.userInfo.id, 
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            var data = JSON.parse(res.data);
            console.log(data);
            wx.hideLoading();

            var status = data.status;
            if (status == 200) {
              wx.showToast({
                title: '上传成功',
                icon:"success"
              });

              var imageUrl = data.data;
              me.setData({
                faceUrl: serverUrl+imageUrl
              });
            }else if (status == 500) {
              wx.showToast({
                title: data.msg
              });
            }
          }
        })
      }
    });
  },
  uploadVideo:function() {
    var me = this;
    wx.chooseVideo({
      sourceType: ['album'],
      success(res) {
        console.log(res)
        var duration = res.duration
        var tmpheight = res.height
        var tmpwidth = res.width
        var tmptempFilePath = res.tempFilePath
        var tmpthumbTempFilePath = res.thumbTempFilePath

        if(duration > 30) {
          wx.showToast({
            title: '视频不能超过30秒',
            icon:"none",
            duration:2500
          })
        }else {
          //打开选择bgm的页面
          wx.navigateTo({
            url: '../chooseBgm/chooseBgm?duration=' + duration
              + "&tmpheight=" + tmpheight
              + "&tmpwidth=" + tmpwidth
            + "&tmptempFilePath=" + tmptempFilePath
            + "&tmpthumbTempFilePath=" + tmpthumbTempFilePath
          })
        }
      }
    })
  }
})
