<!-- 收获地址 -->
<template>
  <div class="ship_address">
    <headertitle :header-title="headerTitle"></headertitle>
    <main>
      <div class="item-container">
        <div class="change-position">
          <router-link to="/select_city" class="sel-city">
            <span
              class="long-text"
              style="max-width:0.5rem;"
            >{{city||selectPosition.city||currentCity}}</span>
            <i class="fa fa-angle-down"></i>
          </router-link>
          <router-link
            :to="'/search_city/'+ (cityId || selectPosition.id || currentCityId)"
            class="search-add-detail"
          >
            <i class="fa fa-search"></i>
            <span>请输入小区、写字楼、学校名称等</span>
          </router-link>
        </div>
      </div>

      <div class="current-position item-container">
        <div class="item-title">
          <!-- <div id="box" style="width:0;height:0;display:none"></div> -->
          <span>当前定位</span>
        </div>
        <div class="item-content cur-posi-cont" @click="back_to_home">
          <keep-alive>
            <div class="posi-left">
              <i class="fa fa-paper-plane"></i>
              <!-- <span v-show="routeShow">{{currentPos}}</span> -->
              <span>{{currentPosition}}</span>
            </div>
          </keep-alive>
          <div class="posi-right" @click="reget_cur_position">
            <span>重新定位</span>
          </div>
        </div>
      </div>

      <div class="item-container shipAddress">
        <div class="item-title">
          <span>收货地址</span>
          <router-link to="/my_ship_address">
            <span>管理</span>
            <i class="fa fa-angle-right"></i>
          </router-link>
        </div>
        <div class="item-content">
          <!-- v-for="(item,index) in addressList"
          :key="index"-->
          <ul class="address-list" v-show="!hasAdd">
            <router-link class="list-item" tag="li" :to="{path:'/home',query:{position:1}}">
              <div class="list-item1">
                <span>后田中心</span>
                <span class="alert-danger">家</span>
              </div>

              <div class="list-item2">15-1003</div>
              <div class="list-item2">
                <span>五一</span>&nbsp;&nbsp;&nbsp;
                <span>73993424201</span>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="item-container surrounding">
        <div class="item-title">
          <span>附近地址</span>
          <router-link :to="'/search_city/'+ (cityId || selectPosition.id || currentCityId)">
            <span>更多</span>
            <i class="fa fa-angle-right"></i>
          </router-link>
        </div>
        <div class="item-content">
          <ul class="surrounding-list" v-show="hasSurrounding">
            <router-link
              class="surrounding-btn"
              tag="li"
              :to="{path:'/home',query:{position:1}}"
              v-for="(item,index) in surroundingPosition"
              :key="index"
              @click.native="set_surrounding_position(item)"
            >{{item.title}}</router-link>
          </ul>
        </div>
      </div>
    </main>
    <footer>
      <mt-button type="primary" @click.native="to_add_address">新增地址</mt-button>
    </footer>
  </div>
</template>

<script>
import Headertitle from "@/components/Header/header";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      headerTitle: "",
      city: "",
      cityId: "",
      routeShow: true,
      hasAdd: false,
      hasSurrounding: true
    };
  },
  components: {
    Headertitle
  },

  computed: {
    ...mapState([
      "currentPosition",
      "selectPosition",
      "currentCity",
      "currentCityId",
      "surroundingPosition"
    ])
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.init_data();
    }, 50);
  },

  methods: {
    ...mapActions(["add_map_position", "reset_get_position"]),
    init_data() {
      let _this = this;
      _this.headerTitle = this.$route.meta.title;
      _this.city = _this.$route.query ? _this.$route.query.city : "";
      _this.cityId = _this.$route.query ? _this.$route.query.cityId : "";
      window.scrollTo(0, 0);
    },
    back_to_home() {
      this.$router.push({ path: "/home" });
    },
    to_add_address() {
      this.$router.push({ path: "/add_ship_address" });
    },
    reget_cur_position(e) {
      var e = event || window.event;
      e.cancelBubble = true;
      e.stopPropagation();
      localStorage.setItem("selectPosition", JSON.stringify({}));
      this.$store.dispatch("add_map_position");
    },
    set_surrounding_position(item) {
      var reset_sel_pos = {};
      reset_sel_pos["address"] = item.address;
      reset_sel_pos["city"] = item.city;
      reset_sel_pos["geohash"] =
        item.point.lat.toString() + " " + item.point.lng.toString();
      reset_sel_pos["latitude"] = item.point.lat;
      reset_sel_pos["longitude"] = item.point.lng;
      reset_sel_pos["name"] = item.title;
      reset_sel_pos["id"] = this.selectPosition.id;
      localStorage.setItem("selectPosition", JSON.stringify(reset_sel_pos));
    }
  }
};
</script>
<style lang='scss' scoped>
.ship_address {
  main {
    width: 100%;
    min-height: 100%;
    margin-top: 0.63rem;
    padding: 0.05rem 0;
    .item-container {
      width: 100%;
      padding: 0 0.12rem;
    }
    .item-title {
      font-size: 10px;
      color: #ccc;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        i,
        span {
          font-size: 10px;
          color: #ccc;
          padding-right: 5px;
        }
      }
    }
    .item-content {
      padding: 0 10px;
    }
    .change-position {
      width: 100%;
      height: 0.32rem;
      border: 1px solid #eee;
      border-radius: 0.15rem;
      background-color: #eee;
      margin-bottom: 10px;
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
        padding-left: 15px;
        i {
          padding-right: 10px;
        }
      }
      .search-add-detail {
        padding-left: 15px;
        border-left: 1px solid #ccc;
        i,
        span {
          color: #ccc;
          letter-spacing: 1px;
        }
      }
    }
    .current-position {
      border-bottom: 5px solid #eee;
      .cur-posi-cont {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .posi-left {
          font-weight: 700;
          i {
            color: #26a2ff;
            padding-right: 5px;
          }
        }
        .posi-right {
          font-size: 12px;
          color: #26a2ff;
        }
      }
    }
    .shipAddress {
      border-bottom: 5px solid #eee;
      .list-item {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .list-item:last-child {
        border-bottom: 0;
      }
      .list-item1 {
        padding-bottom: 10px;
      }
      .list-item1 span:first-child {
        font-weight: 700;
      }
      .list-item1 span:last-child {
        display: inline-block;
        font-size: 10px;
        margin-left: 8px;
        border: 1px solid;
      }
      .list-item2 {
        font-size: 10px;
        padding-bottom: 2px;
      }
    }
    .surrounding {
      .surrounding-list {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        .surrounding-btn {
          margin: 3px;
          padding: 8px 12px;
          background: #eee;
          border-radius: 5px;
          color: #000;
          font-size: 12px;
        }
      }
    }
  }
  footer {
    width: 100%;
    padding: 0.08rem 0.12rem;
    position: fixed;
    bottom: 0;
    left: 0;
    .mint-button {
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>