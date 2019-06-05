//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    imgUrl: ['https://yangxia.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181025165102.jpg', 'https://yangxia.oss-cn-beijing.aliyuncs.com/share1.jpg', 'https://yangxia.oss-cn-beijing.aliyuncs.com/share2.jpg', 'https://yangxia.oss-cn-beijing.aliyuncs.com/share3.jpg', 'https://yangxia.oss-cn-beijing.aliyuncs.com/share4.jpg',
      'https://yangxia.oss-cn-beijing.aliyuncs.com/share5.jpg'],
    contents: `一 【永泰亚洲·宫园巧筑】 一  
        ☆从新加坡，到上海
        ☆两座城市气韵，一种花园梦想
        ☆美兰湖大道，一隅芬芳地
        ☆USGA高尔夫球场环伺
        从匠心 筑匠造 一墅盛开九花园`
  },
  onLoad: function (options) {

  },
  /**
   * 复制
   */
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
    * 预览图片
    */
  viewImage(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imgUrl,
    });
  },
  /**
   * 保存图片
   */
  saveImgToPhotosAlbumTap(e) {
    // var that = this;
    var imgTemp = e.currentTarget.dataset.src;
    wx.getSetting({
      success: (res) => {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: (res) => {
            console.log("授权成功");
            wx.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
              url: imgTemp,
              success: function (resy) {
                // 下载成功后再保存到本地
                let temp = resy.tempFilePath;
                console.log(temp)
                wx.saveImageToPhotosAlbum({
                  filePath: temp, //返回的临时文件路径，下载后的文件会存储到一个临时文件
                  success: function (res) {
                    console.log(111);
                    wx.showToast({
                      title: '成功保存到相册',
                      icon: 'success'
                    })
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '保存到相册失败',
                      icon: 'success'
                    })
                  }
                })
              }
            })
          },
          fail: res => {
            wx.openSetting({
              success: function (res) { }
            })
          }
        })
      }
    })

  },
  /**
   * 保存
   */
  savePhoto() {
    // wx.getImageInfo({
    //     src: this.data.imgUrl,
    //     success: function(ret) {
    //         // console.log(ret)
    //         var path = ret.path;
    //         wx.saveImageToPhotosAlbum({
    //             filePath: path,
    //             success(result) {
    //                 wx.showToast({
    //                     title: '保存图片成功！',
    //                 })
    //             },
    //             fail(res) {
    //                 wx.showToast({
    //                     title: '保存图片失败！',
    //                 })
    //             }
    //         })
    //     }
    // })
  },

  
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
