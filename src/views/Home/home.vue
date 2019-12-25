<!-- home -->
<template>
  <div class="home-page">
    <header>
      <div class="home-logo">
        <div class="img-box">
          <img src="../../assets/ele-logo-blue.png" alt />
        </div>
      </div>
      <router-link
        :to="{path:'/shipping_address'}"
        class="home-address"
        v-show="addressFlag"
        @click.native="search_map_position(selectPosition)"
      >
        <div class="address-icon">
          <i class="fa fa-map-marker"></i>
          <span>{{selectPosition.name || currentPosition}}</span>
          <!-- <div id="box" style="width:0;height:0;display:none"></div> -->
          <i class="fa fa-angle-down"></i>
        </div>
      </router-link>
      <router-link to="/search_product" class="home-search">
        <i class="fa fa-search"></i>
        <span>输入商家、商品名称</span>
      </router-link>
    </header>

    <main>
      <homeNav></homeNav>
    </main>

    <footguide></footguide>
  </div>
</template>

<script>
import Footguide from "@/components/footguide/footguide";
import HomeNav from "./homeNav";
import BMap from "BMap";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    Footguide,
    HomeNav
  },
  data() {
    return {
      scrollTop: "",
      addressFlag: true, //当前定位是否显示,
      routeFormPos: false
    };
  },
  created() {},
  mounted() {
    this.init_data();
  },
  computed: {
    ...mapState(["currentPosition", "selectPosition"])
  },
  methods: {
    ...mapActions(["add_map_position", "search_map_position"]),
    init_data() {
      window.addEventListener("scroll", this.debounce(this.show_scrollTop, 50));
      this.$store.dispatch("add_map_position");
      // this.first_get_cur_position();
      this.get_cityId();
    },
    // first_get_cur_position() {
    //   // console.log("first", this.$route.query);
    //   var hasQuery = this.$route.query;
    //   if (Object.keys(hasQuery).length === 0) {
    //     console.log("first", hasQuery);
    //     this.$store.dispatch("add_map_position");
    //   } else {
    //     return false;
    //   }
    // },
    debounce(fn, delaytime) {
      let timer = null;
      return function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, delaytime);
      };
    },
    show_scrollTop() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      this.addressFlag = this.scrollTop > 50 ? false : true;
    },
    get_cityId() {
      this.$get("/v1/cities?type=guess").then(res => {
        let _this = this;
        localStorage.cityId = res.id;
        // console.log("222", res);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.home-page {
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.21rem 0.12rem;
    padding-bottom: 0.1rem;
    background-color: #26a2ff;
    z-index: 999;
    .home-logo {
      width: 100%;
      height: 0.42rem;
      padding: 0.12rem 0.1rem;
      .img-box {
        width: 0.52rem;
        height: 0.19rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .home-address {
      display: inline-block;
      width: 100%;
      padding-bottom: 0.1rem;
      font-size: 14px;
      color: #fff;
      i,
      span {
        padding-left: 5px;
      }
    }
    .home-search {
      display: inline-block;
      width: 100%;
      height: 0.32rem;
      border: 1px solid #fff;
      border-radius: 0.15rem;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      i,
      span {
        padding-left: 5px;
      }
      span {
        color: #ccc;
        font-size: 12px;
      }
    }
  }
  main {
    width: 100%;
    // height: 20rem;
    padding: 1.34rem 0.12rem 0.5rem;
    display: flex;
    align-items: center;
  }
}
</style>