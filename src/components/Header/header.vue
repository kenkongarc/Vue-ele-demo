<!-- 带导航头部 -->
<template>
  <div class="header-back">
    <i class="fa fa-angle-left" @click="goback"></i>
    <span>{{headerTitle}}</span>
  </div>
</template>

<script>
export default {
  props: ["headerTitle"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
.header-back {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 0.63rem;
  padding: 0.21rem 0.12rem 0;
  background-color: #fff;
  z-index: 999;
  i {
    font-size: 20px;
    color: #26a2ff;
    padding-right: 10px;
  }
}
</style>