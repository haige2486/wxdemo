// pages/list/list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    bookList:[
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.removeStorageSync('cart');
  },
  toDetail : function(e){
    var index = e.currentTarget.dataset.index;
    var bookList = this.data.bookList;
    var id = bookList[index].isbn;
    wx.navigateTo({
      url: '/pages/details/details?bookName=' + id,
    })
  },
  addCart : function(e){
    this.setData({
      toastHidden: false
    });
    //遍历书列表与购物车中现有书 
    for(var i in this.data.bookList){
      //点击的目标为需要添加到购物车的项
      if(this.data.bookList[i].isbn == e.target.id){
        //console.log(e.target.id);
          this.data.bookList[i].count = 1;
          this.data.bookList[i].checked = false;
          var arr = wx.getStorageSync('cart') || [];
          if(arr.length>0){
            for(var j in arr){
              if (arr[j].isbn == e.target.id){
                //arr[j].count = arr[j].count + 1;
                try {
                  wx.showToast({
                    title: '借阅车已存在该书,无需重复加入',
                    icon: 'none',
                    duration: 2000
                  })
                  wx.setStorageSync('cart', arr);
                } catch (e) {
                  console.log(e);
                }
                return;
              }
            }
            arr.push(this.data.bookList[i]);
          }else{
            arr.push(this.data.bookList[i]);
          }
          try{
            wx.showToast({
              title: '加入借阅车成功',
              icon: 'none',
              duration: 2000
            })
            wx.setStorageSync('cart', arr);
            return;
          }catch(e){
            console.log(e);
          }
      }
    }
  },
  /*text:function(){
    app.func.req('/open/api/weather/json.shtml', {city: '北京'},function(res){
      console.log(res.data);
    })
  }*/
  /*,
  skipCart:function(e){
    console.log('跳转购物车');
    wx.navigateTo({
      url: '/pages/shopcart/shopcart'
    })
  }*/
})