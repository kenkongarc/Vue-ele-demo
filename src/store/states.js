export default {
  isLogin: 0, //0->未登录状态，1->登陆状态
  currentPosition: {
    latitude: "", //当前纬度
    longitude: "", //当前经度
    currentPosName: "请确认地址...", //当前定位
    currentCity: "",
    currentCityId: "",
  },
  shipAddress: null, //当前收获地址
  surroundingPosition: null,
  selectPosition: "",
  searchHistory: [],
}