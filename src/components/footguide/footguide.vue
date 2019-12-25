<template>
  <div class="tabbar">
    <ul>
      <li
        :class="{active:message == item.path}"
        @click="linkto(item.path)"
        v-for="(item,index) in tabbaritem"
        :key="index"
      >
        <i :class="['iconfont',item.icon]"></i>
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "footguide",
  data() {
    return {
      message: this.$route.name,
      tabbaritem: [
        { title: "首页", path: "home", icon: "icon-ele-logo" },
        { title: "订单", path: "list", icon: "icon-xinbaniconshangchuan-" },
        { title: "我的", path: "mine", icon: "icon-yonghu1" }
      ]
    };
  },
  methods: {
    linkto(url) {
      this.$router.push("/" + url);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  z-index: 999;
  background-color: #fff;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    .active {
      color: #26a2ff;
    }
  }
}
</style>

