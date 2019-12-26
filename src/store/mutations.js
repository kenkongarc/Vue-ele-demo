import {
  GET_CURRENT_POSITION,
  RESET_GET_POSITION,
  SET_SELECT_CITY,
  SET_LOGIN_STATE,
  CLEAR_SEARCH_HISTORY,
  RESET_SURROUNDING_POSITION
} from "./const";
export default {
  [GET_CURRENT_POSITION](state, res) {
    state.currentPosition.currentPosName = res.addressComponents.street + res.addressComponents.streetNumber
    state.currentPosition.currentCity = res.addressComponents.city
    state.surroundingPosition = res.surroundingPois
    state.currentPosition.longitude = res.point.lng
    state.currentPosition.latitude = res.point.lat
    state.currentPosition.currentCityId = localStorage.cityId
    state.selectPosition = JSON.parse(localStorage.selectPosition)
    state.searchHistory = JSON.parse(localStorage.searchHistory)
  },
  [RESET_GET_POSITION](state, item) {
    state.selectCity = item.city
    state.selectCityId = item.id
  },
  [SET_SELECT_CITY](state, item) {
    state.selectPosition = item
  },
  [SET_LOGIN_STATE](state, item) {
    state.isLogin = item
  },
  [CLEAR_SEARCH_HISTORY](state) {
    state.searchHistory = JSON.parse(localStorage.searchHistory)
  },
  [RESET_SURROUNDING_POSITION](state, res) {
    state.surroundingPosition = res.surroundingPois
  }
}