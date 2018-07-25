// pages/details/details.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    'bookDetail' : null,
    'num' : 0,
    'price':'3.00',
    'isChecked' : false,
    'show':'...展示',
    'bookList': [

      
      {
        'bookName': '孤独是生命的礼物',
        'author': '余光中，林清玄，白先勇 等 著',
        'isbn': '9787535482051',
        'src': '/images/cover_1.jpg',
        'desc': '缅怀乡愁诗人余光中。余光中、林清玄、白先勇联手巨献，重温经典，送别先生。总有一天，你会明白，孤独才是生命的常态。一部直击现代人孤独的精神献礼。中国散文协会推荐！',
        'press': '长江文艺出版社',
        'price': 25.9
      },
      {
        'bookName': '偷影子的人',
        'author': '[法] 马克·李维 著；段韵灵 译',
        'isbn': '9787540455958',
        'src': '/images/cover_2.jpg',
        'desc': '数百万中文读者口口相传外国文学畅销经典',
        'press': ' 湖南文艺出版社',
        'price': 20.5
      },
      {
        'bookName': '无声告白',
        'author': '[美] 伍绮诗 著；孙璐 译',
        'isbn': '9787539982830',
        'src': '/images/cover_3.jpg',
        'desc': '我们终此一生，就是要摆脱他人的期待，找到真正的自己。',
        'press': ' 江苏凤凰文艺出版社',
        'price': 24.1
      },
      {
        'bookName': '摆渡人',
        'author': '[英] 克莱儿·麦克福尔 著；付强 译',
        'isbn': '9787550013247',
        'src': '/images/cover_4.jpg',
        'desc': '或许，命运就是一条孤独的河流，我们都会遇见灵魂的摆渡人。',
        'press': ' 百花洲文艺出版社',
        'price': 17.2
      },
      {
        'bookName': '追风筝的人',
        'author': '[美] 卡勒德·胡赛尼 著；李继宏 译',
        'isbn': '9787208061644',
        'src': '/images/cover_5.jpg',
        'desc': '快乐大本营高圆圆感动推荐，奥巴马送给女儿的新年礼物。为你，千千万万遍！',
        'press': '上海人民出版社',
        'price': 17.7
      }
    ],
    'bookCart':'',
    'totalCount': 0,
    'isbn':null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.removeStorageSync('cart');
    //console.log(options.id);
    this.getbookItem();
    this.getCart();
    this.calculateTotal();
    //全局函数 getApp()   获取全局变量
    //var appInstance = getApp();
    //console.log(appInstance.globalData.bookNum);
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
  getbookItem : function(){
    var self = this;
    wx.request({
      url: 'https://www.sojson.com/open/api/weather/json.shtml', //仅为示例，并非真实的接口地址
      method: 'GET', //请求方式
      data: {
        city: '北京'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       //console.log(res);
        var data1 = [
        {
            'bookName': '孤独是生命的礼物',
            'author': '余光中，林清玄，白先勇 等 著',
            'isbn': '9787535482051',
            'src': '/images/cover_1.jpg',
            'desc': '缅怀乡愁诗人余光中。余光中、林清玄、白先勇联手巨献，重温经典，送别先生。总有一天，你会明白，孤独才是生命的常态。一部直击现代人孤独的精神献礼。中国散文协会推荐！',
            'press': '长江文艺出版社',
            'price': 25.9
          }
       ];
        self.setData({
          bookDetail: data1,
          isbn: data1[0].isbn
        });
      },
      fail: function () {
        
      }
    })
  },
  getCart: function () {
    var self = this;
    var bookCart = wx.getStorageSync('cart');
    self.setData({
      bookCart: bookCart
    })
  },
  /**
  * 计算商品总数
  */
  calculateTotal: function () {
    var bookCart = this.data.bookCart;
    var totalCount = 0;
    for (var i = 0; i < bookCart.length; i++) {
      totalCount += bookCart[i].count;
    };
    this.setData({
      'totalCount': totalCount
    });
  },
  checkShow: function(e){
    var self = this;
    if (e.target.dataset.num % 2 == 0){
      self.setData({
        isChecked: true,
        show: '收起'
      })
    }else{
      self.setData({
        isChecked: false,
        show: '...展示'
      })
    } 
    self.setData({
      num: e.target.dataset.num + 1
    })
  },
  skipCart: function (e) {
    wx.navigateTo({
      url: '/pages/shopcart/shopcart'
    })
  },
  add: function (e) {
      this.setData({
        toastHidden: false
      });
      //遍历书列表与购物车中现有书 
      for (var i in this.data.bookList) {
        //点击的目标为需要添加到购物车的项
        if (this.data.bookList[i].isbn == e.target.id) {
          this.data.bookList[i].count = 1;
          var arr = wx.getStorageSync('cart') || [];
          if (arr.length > 0) {
            for (var j in arr) {
              if (arr[j].isbn == e.target.id) {
               // arr[j].count = arr[j].count + 1;
                try {
                  wx.showToast({
                    title: '借阅车已存在该书,无需重复加入',
                    icon: 'none',
                    duration: 2000
                  })
                  wx.setStorageSync('cart', arr);
                  this.getCart();
                  this.calculateTotal();
                } catch (e) {
                  console.log(e);
                }
                return;
              }
            }
            arr.push(this.data.bookList[i]);
          } else {
            arr.push(this.data.bookList[i]);
          }
          try {
            wx.showToast({
              title: '加入借阅车成功',
              icon: 'none',
              duration: 2000
            })
            wx.setStorageSync('cart', arr);
            this.getCart();
            this.calculateTotal();
            return;
          } catch (e) {
            console.log(e);
          }
        }
      };
    
  },
  lendNow: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/lendnow/lendnow?id='  + id,
    })
  }
})
