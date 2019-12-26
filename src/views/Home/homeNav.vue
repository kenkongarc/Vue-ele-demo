<template>
  <div class="home-nav">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide nav-page" v-for="(typeItem,index) in navData" :key="index">
          <router-link
            :to="{path:'/food_type_item',query:{title:item.title,id:get_category_id(item.link)}}"
            v-for="(item,index) in typeItem"
            :key="index"
            class="nav-item"
          >
            <dl>
              <dd>
                <img :src="imgBaseUrl + item.image_url" :alt="item.title" />
              </dd>
              <dt>{{item.title}}</dt>
            </dl>
          </router-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  data() {
    return {
      navData: [],
      imgBaseUrl: "https://fuss10.elemecdn.com"
    };
  },
  created() {},
  mounted() {
    var _this = this;
    _this.$get("v2/index_entry").then(response => {
      let ResLength = response.length;
      let resArray = [...response];
      let TypeArray = [];
      for (let i = 0, j = 0; i < ResLength; i += 8, j++) {
        TypeArray[j] = resArray.splice(0, 8);
      }
      _this.navData = TypeArray;
      // console.log("111", _this.navData);
      _this.$nextTick(function() {
        var swiper = new Swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination"
          },
          loop: true
        });
      });
    });
  },
  updated() {},
  methods: {
    /**
     * 通过解码获取食物分类中每类对应的id,用于数据请求；
     * url --> 每类食物对应的url
     */
    get_category_id(url) {
      let foodTypeUrlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(foodTypeUrlData)) {
        return JSON.parse(foodTypeUrlData).restaurant_category_id.id;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home-nav {
  width: 100%;
  .swiper-container {
    .swiper-wrapper {
      padding-bottom: 0.15rem;
      .nav-page {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .nav-item {
          width: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          dd,
          dt {
            width: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
          dd {
            padding: 0.1rem;
            padding-bottom: 0;
          }
          dt {
            text-align: center;
          }
        }
      }
    }
    .swiper-pagination {
      .swiper-pagination-bullet {
        width: 0.1rem;
      }
    }
    .swiper-pagination-bullets {
      bottom: 0;
    }
  }
}
</style>
