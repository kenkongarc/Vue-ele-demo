<!-- 收货地址 -->
<template>
  <div class="address-manager">
    <Headertitle :header-title="headerTitle"></Headertitle>
    <main></main>
  </div>
</template>

<script>
import Headertitle from "@/components/Header/header";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      headerTitle: ""
    };
  },

  components: { Headertitle },

  computed: {},

  mounted() {
    this.init_data();
  },

  methods: {
    init_data() {
      var _this = this;
      _this.headerTitle = this.$route.meta.title;
    }
  }
};
</script>
<style lang='scss' scoped>
.address-manager {
  main {
    width: 100%;
  }
}
</style>