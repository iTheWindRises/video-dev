const app = getApp()

Page({
  data: {
    //用于分页的属性
    totalPage:1,
    page:1,
    videoList:[],

    screenWidth: 350,
    serverUrl:""
  },
  getAllVideoList: function (page) {
    var me = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: serverUrl + '/video/showAll?page='+page,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        
        console.log(res);

        //判断当前page是否是第一页,如果是第一页,设置videoList为空
        if (page == 1) {
          me.setData({
            videoList: []
          });
        }

        var videoList = res.data.data.rows;
        var newVideoList = me.data.videoList;

        me.setData({
          videoList: newVideoList.concat(videoList),
          page: page,
          totalPage: res.data.data.total,
          serverUrl: serverUrl
        });

      }
    })
  },
  onLoad: function (params) {
    var me = this;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth,
    });

    //获取当前的分页树
    var page = me.data.page;
  
    me.getAllVideoList(page);
  },
  onReachBottom:function() {
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    //判断当前页数和总页数是否相等
    if (currentPage == totalPage) {
        wx.showToast({
          title: '人家已经到底了',
          icon:'none'
        })
        return;
    }

    var page = currentPage+1;
    me.getAllVideoList(page);
  },
  onPullDownRefresh:function() {
    wx.showNavigationBarLoading();
    this.getAllVideoList(1);
  }
})
