<!--  -->
<template>
  <div class="word-search">
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
          :to="{path:'/home',query:{position:item}}"
          @click.native="set_history(item)"
          v-for="(item,index) in searchResult"
          :key="index"
        >
          <p>{{item.name}}</p>
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
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      searchResult: [],
      historyList: [],
      hasHistory: false,
      hasResult: false
    };
  },

  components: {},

  computed: {
    ...mapState(["searchHistory"])
  },

  mounted() {
    this.init_data();
  },

  methods: {
    ...mapActions(["clear_search_history"])
  }
};
</script>
<style lang='scss' scoped>
</style>