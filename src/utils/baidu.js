export function searchPosition_by_keyword(city, keyword) {
  var localSearch = new BMap.LocalSearch(city);
  var result = localSearch.search(keyword);
  result.setSearchCompleteCallback((rs) => {
    console.log("baiduSearch", rs)
  })
}