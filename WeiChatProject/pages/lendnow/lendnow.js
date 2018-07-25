// pages/lendnow/lendnow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'isbn':null,
    'src':null,
    'bookName':null,
    'cart':null,
    'num':null,
    'location': '',
    'defaultAddress': false,
    'address': null,
    'userName': null,
    'phoneNumber': null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    //单本书立即购买
    if(options.id){
      var self = this;
      self.setData({
        isbn: options.id,
        num:1
      });
      this.lend();
    }else{
      //购物车已选书本购买
      var arr = wx.getStorageSync('cart');
      var cart0 =  [];
      for(var i = 0;i<arr.length;i++){
        if(arr[i].checked==true){
           cart0.push(arr[i]);
        }
      }
      //console.log(cart0);
      wx.setStorageSync('cart0', cart0);
      this.setData({
        cart: cart0.slice(0,2),
        num: cart0.length
      })
    }
      
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    //wx.removeStorageSync('userInfo');
    this.setData({
      location: wx.getStorageSync('userInfo')
    });
    var arr = wx.getStorageSync('userInfo');
    if (this.data.location !== '') {
      this.setData({
        defaultAddress: true,
        userName: arr[0].userName,
        phoneNumber: arr[0].phoneNumber,
        address: arr[0].location + arr[0].detailAddress
      })
    } else {
      this.setData({
        defaultAddress: false
      });
    };
   // console.log(this.data.defaultAddress)
  },
  /**
   * 在storage获取借阅书本信息
   */
  lend:function(){
    var self = this;
    var isbn = this.data.isbn;
    var arr = wx.getStorageSync('cart');
    for( var i in arr){
      if(arr[i].isbn = isbn){
        self.setData({
          src: arr[i].src,
          bookName: arr[i].bookName
        });
        return;
      }
    }
  },
  //设置及修改送书地址
  setLocation:function(){
    wx.navigateTo({
      url: '/pages/location/location'
    })
  },
  //查看下单书籍信息
  viewBookInfo:function(){
   // console.log(this.data.isbn);
    if (this.data.isbn == null){
      wx.navigateTo({
        url: '/pages/booklist/booklist'
      })
    }else{
      var id = this.data.isbn;
      wx.navigateTo({
        url: '/pages/booklist/booklist?id=' + id
      })
    }
  }
})