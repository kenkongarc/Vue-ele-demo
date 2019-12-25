<template>
  <div class="mine-page">
    <header>
      <img src="../../assets/ele-logo-black.png" height="50%" alt="logo" />
      <div>
        <router-link to="/setting" class="setting" tag="span">
          <i class="iconfont icon-shezhi"></i>
        </router-link>
        <router-link to="/system-info" class="setting" tag="span">
          <i class="iconfont icon-message"></i>
        </router-link>
      </div>
    </header>
    <main>
      <div class="login-text" v-show="isLogin">
        <router-link class="login-status" tag="div" to="/baseMessage">
          <div class="avatar">
            <img src="../../assets/avatar.jpeg" alt="avatar" />
          </div>
          <div class="avatar-info">
            <h2>15032154684</h2>
            <p>再忙，也要记得吃饭呦~</p>
          </div>
        </router-link>
        <div class="ele-ads">
          <router-link class="superVIP" to="/superVIP">
            <div class="VIP-logo">
              <i class="iconfont icon-huangguan"></i>
              <span>超级会员</span>
            </div>
            <div class="VIP-link small-font">
              <span>
                开通后，每月领超过
                <i class="red">20</i>元红包
                <i class="fa fa-angle-right"></i>
              </span>
            </div>
          </router-link>
          <router-link class="ads-detail logining" to="/ticket">
            <div class="ads-title">
              <p>红包卡卷</p>
            </div>
            <span class="small-font">
              <i class="red">1</i>个未使用
            </span>
          </router-link>
          <router-link class="ads-detail logining" to="/allowance">
            <div class="ads-title">
              <p>津贴</p>
            </div>
            <span class="small-font">
              <i class="red">￥20</i>可用
            </span>
          </router-link>
          <router-link class="ads-detail logining" to="/wallet">
            <div class="ads-title">
              <p>钱包</p>
            </div>
            <span class="small-font">
              <i class="red"></i>金币、借钱、福利
            </span>
          </router-link>
        </div>
      </div>
      <div class="login-text" v-show="!isLogin">
        <router-link class="login-status" tag="div" to="/login">
          <div class="avatar">
            <img src="../../assets/ele-logo-avatar.jpg" alt="ele-avatar" />
          </div>
          <div class="avatar-info">
            <h2>
              立即登陆
              <i class="fa fa-angle-right"></i>
            </h2>

            <p>饿不饿都上饿了么~</p>
          </div>
        </router-link>
        <div class="ele-ads">
          <router-link class="not_login ads-detail" to="/login">
            <div class="ads-title">
              <p>红包卡卷</p>
              <i class="iconfont icon-hongbao1" style="color:pink"></i>
            </div>
            <span class="small-font">登陆后查看</span>
          </router-link>
          <router-link class="not_login ads-detail" to="/login">
            <div class="ads-title">
              <p>钱包</p>
              <i class="iconfont icon-qianbao1" style="color:	#87CEFA"></i>
            </div>
            <span class="small-font">金币、借钱、福利</span>
          </router-link>
        </div>
      </div>
      <div class="my-info">
        <ul class="info-list">
          <router-link
            :to="item.src"
            tag="li"
            class="info-item"
            v-for="(item,index) in myInfo"
            :key="index"
          >
            <i :class="['iconfont',item.icon]"></i>
            <div class="item-text">
              <span>{{item.title}}</span>
              <span>
                <span class="small-font">{{item.note}}</span>
                <i class="fa fa-angle-right"></i>
              </span>
            </div>
          </router-link>
        </ul>
      </div>
      <div class="loginOut" @click="loginOut" v-show="isLogin">退出登陆</div>
    </main>

    <Footguide></Footguide>
  </div>
</template>
<script>
import Footguide from "@/components/footguide/footguide";
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      myInfo: [
        {
          icon: "icon-shoucang1",
          title: "我的收藏",
          note: "",
          src: "/my_collection"
        },
        {
          icon: "icon-kefu",
          title: "我的客服",
          note: "",
          src: "/my_kefu"
        },
        {
          icon: "icon-location",
          title: "我的地址",
          note: "",
          src: "/my_ship_address"
        },
        {
          icon: "icon-shangwu",
          title: "商务合作",
          note: "",
          src: "/cooperation"
        },
        {
          icon: "icon-qia",
          title: "办卡有礼",
          note: "",
          src: "/apply_card"
        },
        {
          icon: "icon-gongyi",
          title: "3小时公益",
          note: "",
          src: "/public_service"
        }
      ]
    };
  },
  components: {
    Footguide
  },
  computed: { ...mapState(["isLogin"]) },
  mounted() {},
  methods: {
    loginOut() {
      this.$cookies.remove("password_key");
      window.location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.mine-page {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 0.63rem;
    padding: 0.21rem 0.12rem 0;
    .setting {
      i {
        font-size: 21px;
        padding: 3px;
        color: #333;
      }
    }
  }
  main {
    width: 100%;
    margin-bottom: 0.63rem;
    padding: 0 0.12rem;
    .login-status {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      .avatar {
        width: 0.6rem;
        height: 0.6rem;
        border: 1px solid #ccc;
        border-radius: 50%;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .avatar-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 15px;
        h2 {
          font-weight: 700;
        }
      }
    }
    .ele-ads {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 10px;
      .ads-detail {
        padding: 10px 8px;
        border: 1px solid;
        border-color: rgba(204, 204, 204, 0.3);
        border-radius: 5px;
        box-shadow: 5px 5px 5px #ccc;
        margin-bottom: 5px;
      }
      .not_login {
        width: 49.5%;
      }
      .logining {
        width: 33%;
      }
      .red {
        color: rgb(245, 6, 6);
        font-weight: 700;
      }
      .ads-title {
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        p {
          font-size: 14px;
          font-weight: 700;
        }
      }
      .superVIP {
        width: 100%;
        border: 1px solid;
        border-color: rgba(255, 235, 205, 0.3);
        border-radius: 5px;
        padding: 8px 6px;
        background: linear-gradient(45deg, #ffebcd, #f5deb3);
        margin: 8px 0;
        display: flex;
        justify-content: space-between;
        .VIP-logo {
          i {
            color: #daa520;
            margin-right: 8px;
          }
        }
      }
    }
    .my-info {
      .info-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        i {
          // font-size: 14px;
          color: #26a2ff;
          margin: 0 8px;
          font-weight: 900;
        }
        .item-text {
          width: 100%;
          padding: 12px 8px;
          padding-left: 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid;
          border-bottom-color: rgba(204, 204, 204, 0.3);
          i {
            color: #666;
            margin: 0;
          }
        }
      }
      .info-item:last-child .item-text {
        border-bottom: 0;
      }
    }
    .loginOut {
      padding: 12px 8px;
      background: rgba(204, 204, 204, 0.3);
      border-radius: 5px;
      text-align: center;
      font-size: 16px;
      color: red;
    }
  }
}
</style>