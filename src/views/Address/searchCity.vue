<!--  -->
<template>
  <div class="search-city">
    <Headertitle :header-title="headerTitle"></Headertitle>
    <main>
      <div class="search-area">
        <div class="search-left">
          <router-link to="/select_city" class="sel-city">
            <span class="long-text" style="max-width:0.5rem;">{{currentCity}}</span>
            <i class="fa fa-angle-down"></i>
          </router-link>
          <div class="serach-cont">
            <i class="fa fa-search"></i>
            <input
              type="text"
              v-model="keyword"
              class="searchbar-core"
              @keyup="debounce(searchPosition_by_keyword(currentCity, keyword),50)"
              @focus="set_search_type_to_word"
            />
          </div>
        </div>
        <div class="search-right" v-show="searchType" @click="set_search_type_to_map">
          <div class="cont">取消</div>
        </div>
      </div>
      <div class="word-search" v-if="searchType">
        <div class="search-history" v-show="hasHistory">
          <div class="history-title">
            <span>历史搜索</span>
          </div>
          <ul class="history-list">
            <router-link
              tag="li"
              class="history-item"
              :to="{path:'/home',query:{position:item}}"
              v-for="(item,index) in historyList"
              :key="index"
              @click.native="set_city_by_history(item)"
            >{{item.name || item.title}}</router-link>
          </ul>
          <div class="clear-history">
            <div @click="clear_history">清空搜索历史</div>
          </div>
        </div>
        <div class="search-result">
          <ul class="result-list" v-show="hasResult">
            <router-link
              tag="li"
              :to="{path:to,query:{position:item}}"
              v-for="(item,index) in searchResult"
              :key="index"
              @click.native="set_history(item, toFlag)"
            >
              <p>{{item.title}}</p>
              <span>{{item.address}}</span>
            </router-link>
          </ul>
          <div class="search-note">
            <p>找不到地址？</p>
            <p>请尝试只输入小区、写字楼、或学校名,</p>
            <p>详细地址(如门牌号)可稍后输入哦。</p>
          </div>
        </div>
      </div>
      <SearchByMap :add-address-flag="toFlag" v-else></SearchByMap>
    </main>
  </div>
</template>

<script>
import Headertitle from "@/components/Header/header";
import SearchByMap from "./search_by_map";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      headerTitle: "",
      currentCity: "",
      cityId: "",
      keyword: "",
      to: "/add_ship_address",
      searchResult: [],
      historyList: [],
      hasHistory: false,
      hasResult: false,
      searchType: true, //true-> word; false->map
      toFlag: false
    };
  },

  components: {
    Headertitle,
    SearchByMap
  },

  computed: {
    ...mapState(["searchHistory", "selectPosition", "currentPosition"]),
    add_address_flag() {
      if (
        Object.keys(this.$route.query).length > 0 &&
        this.$route.query.search_type
      ) {
        return (this.toFlag = true);
      }
    }
  },

  mounted() {
    this.init_data();
    // this.$get("/v1/cities/" + this.cityId).then(res => {
    //   this.currentCity = res.name;
    // });
    // this.get_city_detail();
  },
  methods: {
    ...mapActions(["clear_search_history"]),
    init_data() {
      let _this = this;
      let oas = _this.searchHistory;
      if (!_this.add_address_flag) {
        _this.to = "/home";
      }
      // console.log("8888", _this.add_address_flag);
      // let oas = JSON.parse(localStorage.searchHistory);
      _this.headerTitle = _this.$route.meta.title;
      _this.cityId = _this.$route.params.currentCityId;
      let info = _this.$route.query.info;
      _this.currentCity =
        info.city ||
        _this.selectPosition.city ||
        _this.selectPosition.name ||
        _this.currentPosition.currentCity;
      _this.historyList = oas;
      _this.hasHistory = oas.length > 0 ? true : false;
      _this.searchType = _this.$route.query.search_type ? false : true;
    },
    // get_city_detail() {
    //   this.hasResult = this.keyword ? true : false;
    //   this.$get("/v1/pois", {
    //     city_id: this.cityId,
    //     keyword: this.keyword
    //   }).then(res => {
    //     this.searchResult = res; //为避免使用文字搜索时获取的信息不全，这里需要优化，应改为使用百度地图的API来查找
    //   });
    // },
    searchPosition_by_keyword(city, keyword) {
      this.hasResult = this.keyword ? true : false;
      var localSearch = new BMap.LocalSearch(city);
      localSearch.search(keyword);
      localSearch.setSearchCompleteCallback(rs => {
        console.log("baiduSearch", rs);
        this.searchResult = rs.Br;
      });
    },
    set_history(item, b) {
      if (b) {
        return false;
      } else {
        item.id = this.cityId;
        item.city = this.currentCity;
        let oas = JSON.parse(localStorage.getItem("searchHistory"));
        if (oas.length < 1) {
          oas.push(item);
          localStorage.setItem("searchHistory", JSON.stringify(oas));
        } else {
          let oa = oas.some(function(aaa, index, oas) {
            return (aaa.name || aaa.title) === (item.name || item.title);
          });
          if (!oa) {
            oas.push(item);
          }
          localStorage.setItem("searchHistory", JSON.stringify(oas));
        }
        localStorage.setItem("selectPosition", JSON.stringify(item));
      }
    },
    clear_history() {
      localStorage.searchHistory = JSON.stringify([]);
      this.clear_search_history();
      this.init_data();
      // window.location.reload();
    },
    set_city_by_history(item) {
      localStorage.setItem("selectPosition", JSON.stringify(item));
    },
    set_search_type_to_map() {
      this.searchType = false;
    },
    set_search_type_to_word() {
      this.searchType = true;
    },

    //实时搜索防抖
    debounce(fn, delaytime) {
      let timer = null;
      return function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, delaytime);
      };
    }
  }
};
</script>
<style lang='scss' scoped>
.search-city {
  main {
    width: 100%;
    margin-top: 0.63rem;
    .search-area {
      width: 100%;
      padding: 0 0.12rem;
      display: flex;
      justify-content: space-between;
      .search-left {
        // display: inline-block;
        width: 100%;
        height: 0.32rem;
        border: 1px solid #eee;
        border-radius: 0.15rem;
        background-color: #eee;
        // margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        i,
        span {
          padding-right: 5px;
        }
        span {
          font-size: 12px;
        }
        .sel-city {
          // width: 0.9rem;
          padding-left: 15px;
          i {
            padding-right: 10px;
          }
        }
        .serach-cont {
          // width: 100%;
          height: 28px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background: #eee;
          border: 1px solid #eee;
          border-radius: 0.15rem;
          font-size: 12px;
          i {
            padding-left: 10px;
            border-left: 1px solid #ccc;
          }
          .searchbar-core {
            width: 100%;
            height: 100%;
            border: 0;
            border-radius: inherit;
            text-indent: 6px;
            font-size: 12px;
            background: #eee;
          }
        }
      }
      .cont {
        width: 0.5rem;
        height: 100%;
        padding-left: 0.12rem;
        display: flex;
        align-items: center;
      }
    }
    .word-search {
      width: 100%;
      padding: 0 0.12rem;
      .search-history {
        widows: 100%;
        .history-title {
          font-size: 10px;
          color: #ccc;
          padding-top: 0.12rem;
        }
        .history-list {
          .history-item {
            color: #000;
            padding: 0.12rem 0;
            border-bottom: 1px solid #ccc;
          }
        }
        .clear-history {
          padding-top: 0.12rem;
          text-align: center;
          font-size: 12px;
          color: #26a2ff;
        }
      }
      .search-result {
        .result-list {
          border-top: 1px solid #ccc;
          li {
            padding: 0.12rem 0;
            border-bottom: 1px solid #ccc;
            p {
              font-weight: 700;
              color: #000;
            }
            span {
              font-size: 12px;
            }
          }
          li:last-child {
            border-bottom: 0;
          }
        }
        .search-note {
          width: 100%;
          padding: 0.24rem 0;
          font-size: 12px;
          color: #ccc;
          text-align: center;
        }
      }
    }
  }
}
</style>