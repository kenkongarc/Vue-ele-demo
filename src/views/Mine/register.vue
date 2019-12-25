<!--  -->
<template>
  <div class="register">
    <Headertitle :header-title="headerTitle"></Headertitle>
    <main>
      <div :class="['message','alert-'+(active ? 'info' :'danger')]" v-if="showMsg">{{msg}}</div>
      <!-- <form id="register-form"> -->
      <div class="form-group">
        <label for="username" class="control-label">用户名</label>
        <input
          type="text"
          v-model="username"
          class="form-control"
          autocomplete="off"
          placeholder="请输入用户名"
        />
      </div>
      <div class="form-group">
        <label for="email" class="control-label">E-mail</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          autocomplete="off"
          placeholder="请输入email"
        />
      </div>
      <div class="form-group">
        <label for="phoneNUm" class="control-label">联系电话</label>
        <input
          type="tel"
          v-model="phoneNUm"
          class="form-control"
          autocomplete="off"
          placeholder="请输入联系电话"
        />
      </div>
      <div class="form-group">
        <label for="password" class="control-label">密码</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </div>
      <div class="form-group">
        <label for="confirm-psd" class="control-label">确认密码</label>
        <input
          type="password"
          v-model="confirmPsd"
          class="form-control"
          autocomplete="off"
          placeholder="请再次输入密码"
        />
      </div>

      <div class="form-group">
        <div>
          <input type="checkbox" v-model="flag" />
          <span>阅读并同意以下协议：</span>
          <a href>淘宝平台服务协议</a>
          <a href>隐私权政策</a>
          <a href>法律声明</a>
          <a href>支付宝及客户端服务协议</a>
        </div>

        <button class="btn btn-primary" @click="register">同意协议并注册</button>
      </div>
      <!-- </form> -->
    </main>
  </div>
</template>

<script>
import Headertitle from "@/components/Header/header";
import axios from "axios";
export default {
  components: { Headertitle },
  data() {
    return {
      headerTitle: "",
      username: null,
      password: null,
      confirmPsd: null,
      phoneNUm: null,
      email: null,
      flag: 0,
      msg: "",
      active: false,
      showMsg: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.headerTitle = this.$route.meta.title;
    },
    register() {
      var _this = this;
      let formData = new FormData();
      formData.append("username", _this.username);
      formData.append("password", _this.password);
      formData.append("telephone", _this.phoneNUm);
      formData.append("email", _this.email);
      formData.append("type", "register");
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
            _this.active = true;
            console.log(data.data.msg);
            var s = 3;
            _this.msg = data.data.msg + "页面将在" + s + "s后跳转至登陆界面";

            var timer = setInterval(() => {
              s--;
              _this.msg = data.data.msg + "页面将在" + s + "s后跳转至登陆界面";
              if (s === 0) {
                window.clearInterval(timer);
                _this.$router.push("/login");
              }
            }, 1000);
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
<style lang='scss' scoped>
.register {
  main {
    width: 100%;
    margin-top: 0.63rem;
    padding: 0.21rem 0.12rem 0;
    .form-group {
      margin-bottom: 15px;
      a {
        color: #337ab7;
        text-decoration: none;
        margin-left: 5px;
      }
      .btn {
        width: 100%;
        border: 0;
        padding: 8px 0;
        margin-top: 10px;
        border-radius: 16px;
        background-color: #26a2ff;
        background-image: linear-gradient(
          to right,
          rgb(168, 220, 233),
          #26a2ff
        );
      }
    }
    label {
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .form-control {
      display: block;
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
  }
}
</style>