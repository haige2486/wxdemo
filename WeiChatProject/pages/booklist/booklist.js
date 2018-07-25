// pages/booklist/booklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'isbn': null,
    'src': null,
    'bookName': null,
    'cart': null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      var self = this;
      self.setData({
        isbn: options.id,
      });
      this.lend();
    } else {
      this.setData({
        cart: wx.getStorageSync('cart0'),
      })
    }
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
  
  },
  /**
   * 在storage获取借阅书本信息
   */
  lend: function () {
    var self = this;
    var isbn = this.data.isbn;
    var arr = wx.getStorageSync('cart');
    for (var i in arr) {
      if (arr[i].isbn = isbn) {
        self.setData({
          src: arr[i].src,
          bookName: arr[i].bookName
        });
        return;
      }
    }
  },
})