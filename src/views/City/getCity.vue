<!-- 获取当前城市位置 -->
<template>
  <div class="init-position">
    <header>
      <div class="home-logo" @click="reload_cur_page">
        <div class="img-box">
          <img src="../../assets/ele-logo-blue.png" alt />
        </div>
      </div>
      <router-link to="/mine" class="mine">
        <i class="fa fa-user"></i>
      </router-link>
    </header>
    <main>
      <div class="search-city">
        <div :class="['item-container', 'bg',{'fix-position':hasCont}]">
          <div class="search-bar">
            <i class="fa fa-search"></i>
            <input
              v-model="value"
              type="text"
              placeholder="请输入城市名、拼音或首字母查询"
              class="searchbar-core"
              @keyup="search_city"
            />
          </div>
        </div>
        <div class="search-result-list" v-show="!hasCont">
          <ul class="result-list padding-left">
            <li v-show="this.filterResult && this.filterResult.length < 1" class="no-result">无结果</li>
            <router-link
              tag="li"
              :to="'/city/' + item.id"
              v-for="(item,index) in filterResult"
              :key="index"
              class="content-item"
            >{{item.name}}</router-link>
          </ul>
        </div>
      </div>
      <div v-show="hasCont" class="city-list">
        <div class="index-link">
          <ul>
            <li
              v-for="(value,key,index) in sortCityByIndex"
              :key="index"
              @click="goAnchor(key)"
            >{{key}}</li>
          </ul>
        </div>
        <div class="cur-posi-city">
          <div class="type-title">当前定位城市</div>
          <div class="cur-city">{{currentCity}}</div>
        </div>
        <div class="all-city">
          <div class="fist-index-city" v-for="(value,key,index) in sortCityByIndex" :key="index">
            <div class="type-title" :id="key" :name="key">{{key}}</div>
            <ul class="padding-left">
              <router-link
                tag="li"
                :to="'/city/' + item.id"
                class="content-item"
                v-for="(item,index) in value"
                :key="index"
              >{{item.name}}</router-link>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      defaultResult: [],
      hasCont: true,
      cityGroup: {},
      currentCity: ""
    };
  },

  components: {},

  computed: {
    // 获取实时搜索的结果
    filterResult() {
      if (this.value) {
        return this.defaultResult.filter(
          value =>
            new RegExp(this.value, "i").test(value.abbr) ||
            new RegExp(this.value, "i").test(value.name) ||
            new RegExp(this.value, "i").test(value.pinyin)
        );
      }
    },
    // 将城市按照A-Z分类
    sortCityByIndex() {
      let that = this;
      let sortResult = {};
      for (let i = 65; i <= 90; i++) {
        if (that.cityGroup[String.fromCharCode(i)]) {
          sortResult[String.fromCharCode(i)] =
            that.cityGroup[String.fromCharCode(i)];
        }
      }
      return sortResult;
    }
  },

  mounted() {
    this.$get("/v1/cities?type=group").then(res => {
      let _this = this;
      let new_obj = res;
      _this.cityGroup = new_obj;
      console.log("test", _this.cityGroup);
      let city_array = [];
      for (let key in new_obj) {
        city_array.push(new_obj[key]);
        for (let i = 0; i < city_array.length; i++) {
          _this.defaultResult.push(...city_array[i]);
        }
      }
    });
    this.$get("/v1/cities?type=guess").then(res => {
      let _this = this;
      _this.currentCity = res.name;
    });
  },

  methods: {
    reload_cur_page() {
      window.location.reload();
    },
    search_city() {
      this.hasCont = this.value ? false : true;
      console.log("eee", this.value, this.filterResult);
    },
    goAnchor(sel) {
      let oa = this.$el.querySelector("#" + sel).offsetTop + 90;
      window.scrollTo(0, oa);
    }
    // 搜索防抖
    // debounce(fn, delaytime) {
    //   let timer = null;
    //   return function() {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //     timer = setTimeout(fn, delaytime);
    //   };
    // }
  }
};
</script>
<style lang='scss' scoped>
.init-position {
  header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 0.63rem;
    padding: 0.21rem 0.12rem 0;
    background-color: #26a2ff;
    z-index: 999;
    .img-box {
      width: 0.52rem;
      height: 0.19rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mine {
      font-size: 22px;
    }
  }
  main {
    width: 100%;
    margin-top: 0.63rem;
    .padding-left {
      padding-left: 0.12rem;
    }
    .content-item {
      padding: 0.12rem 0;
      border-bottom: 1px solid #ccc;
    }
    .search-city {
      height: auto;
      overflow: hidden;
      .bg {
        background: #26a2ff;
      }
      .item-container {
        padding: 0.05rem 0.12rem;
      }
      .fix-position {
        position: fixed;
        top: 0.63rem;
        left: 0;
        width: 100%;
        z-index: 999;
      }
      .search-bar {
        height: 28px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #fff;
        border: 1px solid #fff;
        border-radius: 0.15rem;
        font-size: 12px;
        i {
          padding-left: 10px;
        }
        .searchbar-core {
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: inherit;
          text-indent: 10px;
          font-size: 12px;
        }
      }
      .search-result-list {
        overflow: auto;
        height: 100%;
        ul {
          font-size: 10px;
          li:last-child {
            border-bottom: 0;
          }
        }
      }
    }
    .city-list {
      margin-top: 0.38rem;
      .index-link {
        width: auto;
        position: fixed;
        top: 30%;
        right: 3%;
        z-index: 999;
        li {
          padding: 0 10px;
        }
      }
      .type-title {
        text-indent: 0.12rem;
        padding: 0.12rem 0 0.06rem 0;
        border-bottom: 1px solid #ccc;
        background: #eee;
      }
      .cur-city {
        padding: 0.12rem;
      }
      .all-city {
        position: relative;
        ul {
          li:last-child {
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>