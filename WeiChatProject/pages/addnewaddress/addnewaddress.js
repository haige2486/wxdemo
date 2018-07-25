//index.js
//获取应用实例
var tcity = require("../../utils/citys.js");

Page({
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    detailAddress:'',
    userName:'',
    phoneNumber:'',
    location:'',
    index:'',
    id:''
  },
  onshow:function(e){
     //console.log(e);
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
     // console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
     // console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
    //  console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function (options) {
    
    //console.log(options.index);
  
      var that = this;

      tcity.init(that);

      var cityData = that.data.cityData;


      const provinces = [];
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData.length; i++) {
        provinces.push(cityData[i].name);
      }
      //console.log('省份完成');
      for (let i = 0; i < cityData[0].sub.length; i++) {
        citys.push(cityData[0].sub[i].name)
      }
      // console.log('city完成');
      for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
        countys.push(cityData[0].sub[0].sub[i].name)
      }

      that.setData({
        'provinces': provinces,
        'citys': citys,
        'countys': countys,
        'province': cityData[0].name,
        'city': cityData[0].sub[0].name,
        'county': cityData[0].sub[0].sub[0].name
      })
   // console.log('初始化完成');


      //如果是编辑页面，编辑页面数据填充
      var id = options.id;
      //console.log(id);
      var editorLocation = wx.getStorageSync('userInfo');
      if (id) {
      for(let i = 0;i < editorLocation.length; i++){
        if (id == editorLocation[i].id){
          that.setData({
            userName: editorLocation[i].userName,
            phoneNumber: editorLocation[i].phoneNumber,
            location: editorLocation[i].location,
            detailAddress: editorLocation[i].detailAddress,
            id: editorLocation[i].id
          })
        }
      }
      }
  },
  save:function(e){
    //console.log(e);
    const that = this;
    let userName, phoneNumber, location, detailAddress;
    if (e.detail.value.userName == ''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else if (!(/^1(3|4|5|7|8)\d{9}$/).test(e.detail.value.phoneNumber)){
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else if (e.detail.value.detailAddress == ''){
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    /**
* 生成一个用不重复的ID
*/
    function GenNonDuplicateID(randomLength) {
      let idStr = Date.now().toString(36)
      idStr += Math.random().toString(36).substr(3, randomLength)
      return idStr
    }


    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    //console.log(viewText); //输出该文本

    // GenNonDuplicateID(3) 将生成类似 ix49wl2978w 的ID
   // GenNonDuplicateID(3)
    that.setData({
      userName: e.detail.value.userName,
      phoneNumber: e.detail.value.phoneNumber,
      location: viewText,
      detailAddress: e.detail.value.detailAddress,
     // id: GenNonDuplicateID(3)
    });

     if(!that.data.id){
       that.setData({
         id: GenNonDuplicateID(3)
       });
     }

    var userInfo = { 
     "userName": this.data.userName,
     "phoneNumber": this.data.phoneNumber, 
     "location": this.data.location, 
     "detailAddress": this.data.detailAddress,
     "isSelected":false,
     "id":this.data.id
     };

    if (wx.getStorageSync('userInfo')) {   //已经有设置过地址
      var userInfo1 = wx.getStorageSync('userInfo');
      //console.log(this.data.id);
      var index = '';
      for (let i = 0; i < userInfo1.length; i++) {
        if (this.data.id == userInfo1[i].id) {
              index = i;
          }
      }
      //console.log(index);
     if(index){
        //console.log("修改非默认地址");
        userInfo1[index].userName = userInfo.userName;
        userInfo1[index].phoneNumber = userInfo.phoneNumber;
        userInfo1[index].location = userInfo.location;
        userInfo1[index].detailAddress = userInfo.detailAddress;
        userInfo1[index].id = userInfo.id;
      }else{
        if (index == '0') {
          //console.log("修改默认地址");
          userInfo1[index].userName = userInfo.userName;
          userInfo1[index].phoneNumber = userInfo.phoneNumber;
          userInfo1[index].location = userInfo.location;
          userInfo1[index].detailAddress = userInfo.detailAddress;
          userInfo1[index].id = userInfo.id;
        }else{
          //console.log("新增地址");
          userInfo1.push(userInfo);
        }
      }
    } else {
      var userInfo1 = [];
      userInfo.isSelected = true;
      userInfo1.push(userInfo);
    }

    //console.log(this.data.userName);
   
    wx.setStorageSync('userInfo',userInfo1);
    wx.showToast({
      title: '地址添加成功',
      icon: 'none',
      duration: 2000
    });
    wx.navigateBack({
      delta: 1
    })
  }
})
