const app = getApp()

Page({
    data: {
      bgmList:[],
      serverUrl:"",
      videoParams:{}
    },

    onLoad:function(params) {
      var me  = this;
      console.log(params);

      me.setData({
        videoParams:params
      });

      var serverUrl = app.serverUrl;
      wx.showLoading({
        title: '请等待',
      })
      wx.request({
        url: serverUrl + '/bgm/list',
        method: "POST",
         header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          wx.hideLoading();
          var status = res.data.status;
          if (status == 200) {
            var bgmList = res.data.data;

            me.setData({
              bgmList:bgmList
            })
          } 
        }
      })
    },
    upload:function(e) {
      var me = this;
      var serverUrl = app.serverUrl;

      var bgmId = e.detail.value.bgmId;
      var desc = e.detail.value.desc;

      var duration = me.data.videoParams.duration;
      var tmpheight = me.data.videoParams.tmpheight;
      var tmpwidth = me.data.videoParams.tmpwidth;
      var tmptempFilePath = me.data.videoParams.tmptempFilePath;
      var tmpthumbTempFilePath = me.data.videoParams.tmpthumbTempFilePath;

      wx.showLoading({
        title: '请等待',
      })
      //上传短视频
      wx.uploadFile({
        url: serverUrl + '/video/upload',
        formData: {
          userId:app.userInfo.id,
          bgmId: bgmId,
          videoSeconds: duration,
            videoWidth: tmpwidth,
          videoHeight: tmpheight,
            desc: desc
        },
        filePath: tmptempFilePath,
        name: 'file',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          var data = JSON.parse(res.data);
          wx.hideLoading();

          var status = data.status;
          if (status == 200) {
            wx.navigateBack({
                    delta:1,
                  })
            // var videoId = data.data

            // wx.showLoading({
            //   title: '请等待',
            // })
            // //上传短视频
            // wx.uploadFile({
            //   url: serverUrl + '/video/uploadCover',
            //   formData: {
            //     userId: app.userInfo.id,
            //     videoId: videoId,
            //   },
            //   filePath: tmpthumbTempFilePath,
            //   name: 'file',
            //   header: {
            //     'content-type': 'application/json'
            //   },
            //   success(res) {
            //     var data = JSON.parse(res.data);
            //     wx.hideLoading();

            //     var status = data.status;
            //     if (status == 200) {
            //       wx.showToast({
            //         title: '上传成功',
            //         icon: "success"
            //       });
            //       wx.navigateBack({
            //         delta:1,
            //       })
            //     }else {
            //       wx.showToast({
            //         title: '上传失败',
            //         icon: "none"
            //       });
            //     }
            //   }
            // });
          } else {
                  wx.showToast({
                    title: '上传失败',
                    icon: "none"
                  });
                }
        }
      });
    }
})

