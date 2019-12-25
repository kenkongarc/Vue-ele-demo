<!--  -->
<template>
  <div class="login note" :style="note">
    <div class="header-back">
      <i class="fa fa-angle-left" @click="goback"></i>
      <span>{{headerTitle}}</span>
    </div>
    <header>
      <div class="logo">
        <img src="../../assets/ele-logo-login.png" alt="ele-logo" />
      </div>
    </header>
    <main>
      <div :class="['message','alert-'+(active ? 'info' :'danger')]" v-if="showMsg">{{msg}}</div>
      <div class="form-group">
        <i class="fa fa-user"></i>
        <input type="text" v-model="username" class="form-control" placeholder="用户名/邮箱/手机号" />
      </div>
      <div class="form-group">
        <i class="fa fa-unlock-alt"></i>
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="密码"
          v-show="show_psd"
        />
        <i class="fa fa-eye" id="show_psd" v-show="show_psd" @click.prevent="show_password"></i>
        <input
          type="text"
          v-model="password"
          class="form-control"
          placeholder="密码"
          v-show="!show_psd"
        />
        <i class="fa fa-eye-slash" id="show_psd" v-show="!show_psd" @click.prevent="show_password"></i>
      </div>
      <div class="form-group" style="margin-bottom: 12px">
        <button @click="loginIn" class="btn btn-primary">登录</button>
      </div>
      <div class="form-group link-box">
        <router-link to="/forget_psd" class="link">忘记密码？</router-link>
        <router-link to="/register" class="link">快速注册</router-link>
      </div>
    </main>
    <footer>
      <fieldset>
        <legend>关联第三方账号快速登陆</legend>
      </fieldset>
      <div class="other_logo">
        <div class="third_party_logo">
          <img
            src="http://images.669pic.com/element_pic/95/6/81/53/978f45e99fae88bde65934d7afaf92e1.jpg"
            alt="alipay-logo"
          />
        </div>
        <div class="third_party_logo">
          <img
            src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180614/8d65570f0aba48a4904ad87467c02122.jpeg"
            alt="taobao-logo"
          />
        </div>
        <div class="third_party_logo">
          <img
            src="http://img1.imgtn.bdimg.com/it/u=3994285169,1703446932&fm=26&gp=0.jpg"
            alt="wechat-logo"
          />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // components: { Headertitle },
  data() {
    return {
      headerTitle: "",
      username: null,
      password: null,
      show_psd: true,
      msg: "",
      active: false,
      showMsg: false,
      toRoute: "",
      note: {
        backgroundImage:
          "url(" + require("../../assets/background-blue.jpg") + ") ",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.headerTitle = this.$route.meta.title;
      console.log(this.$route);
      var toFullpath = this.$route.query.Rurl;
      this.toRoute = toFullpath || "/mine";
    },
    show_password() {
      this.show_psd = !this.show_psd;
    },
    goback() {
      this.$router.go(-1);
    },
    loginIn() {
      var _this = this;
      let formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("type", "login");
      axios({
        method: "post",
        url: "http://localhost/my_api/test_api/users.php",
        data: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(function(data) {
          console.log("res", data);
          _this.msg = data.data.msg;
          _this.showMsg = true;
          if (data.data.resultCode == 200) {
            console.log(data.data.msg, data.data.data[0].new_password_key);
            _this.active = true;
            _this.$cookies.set(
              "password_key",
              data.data.data[0].new_password_key,
              "30d"
            );
            setTimeout(() => {
              _this.$router.push(_this.toRoute);
            }, 2000);
          } else {
            _this.active = false;
            console.log(data.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  padding: 0.6rem 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    z-index: 999;
    i {
      font-size: 20px;
      // color: #26a2ff;
      padding-right: 10px;
    }
  }
  main {
    background: #fff;
    padding: 15px;
    box-shadow: 3px 3px 3px;
    border-radius: 5px;
    margin-bottom: 20px;
    .form-group {
      margin-bottom: 15px;
      position: relative;
      .fa {
        position: absolute;
        top: 5px;
        font-size: 20px;
      }
      #show_psd {
        right: 0;
      }
    }
    .form-group:last-child {
      margin-bottom: 0;
    }
    input {
      text-indent: 20px;
    }
    .form-control {
      // display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 0;
      border-bottom: 1px solid #ccc;
    }
    .link-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  footer {
    fieldset {
      margin-bottom: 15px;
      border: 0;
      border-top: 1px solid #ccc;
      legend {
        color: #ccc;
        text-align: center;
        padding: 0 10px;
      }
    }
    .other_logo {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .third_party_logo {
        width: 0.5rem;
        height: 0.5rem;
        // border: 1px solid #ccc;
        border-radius: 50%;
        img {
          width: 100%;
          border: 0;
          border-radius: 50%;
        }
      }
    }
  }
  header {
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 100%;
      // height: 1rem;
      // border: 1px solid #ccc;
      // border-radius: 50%;
      img {
        width: 100%;
        border: 0;
        border-radius: 50%;
      }
    }
  }
}
</style>