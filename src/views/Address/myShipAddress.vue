<!-- 收货地址 -->
<template>
  <div class="address-manager">
    <Headertitle :header-title="headerTitle"></Headertitle>
    <main :class="{main:addressList.length>0}">
      <ul class="address-list" v-if="addressList.length>0">
        <li class="list-item" v-for="(item,index) in addressList" :key="index">
          <div class="address-msg">
            <div class="list-item1">
              <span>{{item.title || item.name}}</span>
              <span
                :class="{'alert-danger': item.user_addressMark == '家','alert-info':item.user_addressMark == '公司','alert-success':item.user_addressMark == '学校'}"
              >{{item.user_addressMark}}</span>
            </div>
            <div class="list-item2">{{item.user_detailAdd}}</div>
            <div class="list-item2">
              <span>{{item.user_name}}{{item.user_gender}}</span>&nbsp;&nbsp;&nbsp;
              <span>{{item.user_phoneNum}}</span>
            </div>
          </div>
          <router-link
            tag="div"
            :to="{path:'/modify_ship_address',query:{addressInfo:item}}"
            class="edit-msg"
          >
            <i class="iconfont icon-bianji"></i>
          </router-link>
        </li>
        <li class="list-item" @click="link_to_addAddress">
          <span style="color: #26a2ff;">新增地址</span>
          <i style="font-size: 18px" class="fa fa-angle-right"></i>
        </li>
      </ul>
      <div class="no-address-list" v-else>
        <div class="add-logo">
          <img src alt="rider_logo" width="100%" />
        </div>
        <h4>无收货地址</h4>
        <button class="btn-primary xs-btn" @click="link_to_addAddress">新增地址</button>
      </div>
    </main>
  </div>
</template>

<script>
import Headertitle from "@/components/Header/header";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      headerTitle: "",
      addressList: []
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
      _this.addressList = JSON.parse(localStorage.getItem("shipAddress"));
    },
    link_to_addAddress() {
      this.$router.push("/add_ship_address");
    }
  }
};
</script>
<style lang='scss' scoped>
.address-manager {
  .main {
    border-top: 5px solid #eee;
    border-bottom: 5px solid #eee;
  }
  main {
    width: 100%;
    padding: 0 0.12rem;
    margin-top: 0.63rem;
    .address-list {
      padding: 0 0.1rem;
      .list-item {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .edit-msg {
          padding: 0.2rem 0.12rem;
          padding-right: 0;
        }
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
    .no-address-list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .add-logo {
        width: 70%;
      }
      .xs-btn {
        border: 0;
        border-radius: 3px;
        padding: 10px 20px;
        color: #fff;
        font-size: 14px;
        margin-top: 20px;
      }
    }
  }
}
</style>