import {
  GET_CURRENT_POSITION,
  RESET_GET_POSITION,
  SET_SELECT_CITY,
  SET_LOGIN_STATE,
  CLEAR_SEARCH_HISTORY,
  RESET_SURROUNDING_POSITION
} from "./const";
import {
  get
} from "../api/http"
import {
  getCookie
} from "../api/tool"
export default {
  //根据浏览器获取当前定位（默认）
  add_map_position(store) {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        let geocoder = new BMap.Geocoder();
        geocoder.getLocation(
          r.point,
          rs => {
            localStorage.setItem("currentPosition", JSON.stringify(rs))
            var res = JSON.parse(localStorage.getItem("currentPosition"))
            store.commit(GET_CURRENT_POSITION, res)
          }, {
            enableHighAccuracy: true
          }
        );
      } else {
        alert("failed" + this.getStatus());
      }
    });
  },
  //根据搜索位置获取定位
  search_map_position(store, item) {
    if (!item["longitude"]) return false;
    let geocoder = new BMap.Geocoder();
    let geo = new BMap.Point(item.longitude, item.latitude)
    // let geo = new BMap.Point(120.385155, 36.105408)
    geocoder.getLocation(
      geo,
      res => {
        store.commit(RESET_SURROUNDING_POSITION, res)
      }, {
        enableHighAccuracy: true
      }
    );

  },
  reset_get_position(store, item) {
    store.commit(RESET_GET_POSITION, item)
  },
  set_select_city(store, item) {
    store.commit(SET_SELECT_CITY, item)
  },
  clear_search_history(store) {
    store.commit(CLEAR_SEARCH_HISTORY)
  },
  // set_select_city_by_geo(store, item) {
  //   let sel_city_geo = item.geohash
  //   get("/v2/pois/" + sel_city_geo).then(res => {
  //     console.log("detail222", res);
  //     let item = {}
  //     item.name = res.city
  //     item.id = res.cityId
  //     store.commit(SET_SELECT_CITY, item)
  //   });
  // }
  check_login_state(store) {
    var isLogin = getCookie('password_key');
    if (isLogin) {
      store.commit(SET_LOGIN_STATE, 1)
    } else {
      store.commit(SET_LOGIN_STATE, 0)
    }
  }
}