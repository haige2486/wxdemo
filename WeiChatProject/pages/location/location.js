// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:'',
    defaultAddress:false,
    address:'null',
    userName:'null',
    phoneNumber:'null',
    userInfo :'null'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  //wx.removeStorageSync('userInfo');
    this.setData({
      location: wx.getStorageSync('userInfo')
    });
   //console.log(this.data.location);
    var location = this.data.location;
    if (location.length) {
      this.setData({
        defaultAddress: true,
        userName: location[0].userName,
        phoneNumber:location[0].phoneNumber,
        address:location[0].location + location[0].detailAddress,
        userInfo: wx.getStorageSync('userInfo')
      })
    } else {
      this.setData({
        defaultAddress: false
      });
    };
   // console.log(this.data.defaultAddress)
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
   * 新增收货地址
   */
  addNewAddress:function(){
    wx.navigateTo({
      url: '/pages/addnewaddress/addnewaddress'
    })
  },
  radioChange:function(e){
    //console.log(e)
  },
  getIndex:function(e){
    var index = e.currentTarget.dataset.index;
    var userInfo = wx.getStorageSync('userInfo');
    for (var i in userInfo){
      userInfo[i].isSelected = false;
    }
    var arr = userInfo[index];
    arr.isSelected = true;
    userInfo.splice(index,1);
    userInfo.unshift(arr);
    wx.setStorageSync('userInfo', userInfo);
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      userName: arr.userName,
      phoneNumber: arr.phoneNumber,
      address: arr.location + arr.detailAddress
    })
  },
  remove:function(e){
    var index = e.currentTarget.dataset.index;
    var userInfo = wx.getStorageSync('userInfo');
    var arr = userInfo[index];
    if (arr.isSelected){
      //console.log(1);
      if(userInfo.length>1){
        userInfo.splice(0, 1);
        userInfo[0].isSelected = true;
      }else{
        userInfo.splice(index, 1);
        wx.removeStorageSync('userInfo');
        this.setData({
          defaultAddress: false
        });
        return true;
      }
    }else{
      //console.log(2);
      userInfo.splice(index, 1);
    }

   /** userInfo.splice(0, 1);
    userInfo[0].isSelected = true;**/
    wx.setStorageSync('userInfo', userInfo);
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      userName: userInfo[0].userName,
      phoneNumber: userInfo[0].phoneNumber,
      address: userInfo[0].location + userInfo[0].detailAddress
    })
  },
  editor:function(e){
    var id = e.currentTarget.dataset.id;
   // console.log(index);
    wx.navigateTo({
        url: '/pages/addnewaddress/addnewaddress?id=' + id,
    })
  }
})