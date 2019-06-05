// pages/index1/index1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: ['https://i.bmp.ovh/imgs/2019/06/0b12bdbc5c048212.jpg', 'https://i.bmp.ovh/imgs/2019/06/b826340c01babee3.jpg', 'https://i.bmp.ovh/imgs/2019/06/6eb9c9ef7edfd39b.jpg', 'https://i.bmp.ovh/imgs/2019/06/b3d41ceedfe43050.jpg', 'https://i.bmp.ovh/imgs/2019/06/3c8fdbf061f8e1d6.jpg'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})