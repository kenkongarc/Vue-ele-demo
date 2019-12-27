<!-- add new address -->
<template>
  <div class="add-new-address">
    <Headertitle :header-title="headerTitle"></Headertitle>
    <main>
      <div class="form">
        <div class="form-group">
          <label for class="item-title">联系人</label>
          <div class="name-box">
            <div class="item-control name">
              <input
                type="text"
                placeholder="姓名"
                v-model="username"
                class="item-input"
                name="username"
              />
            </div>
            <div class="item-control male">
              <div :class="['new_radio',{active:gender=='先生'} ]" style="margin-right:10px">
                <label class="radio-hidden">
                  <input type="radio" v-model="gender" class="item-input" name="gender" value="先生" />
                </label>
                <span>先生</span>
              </div>
              <div :class="['new_radio',{active:gender=='女士'} ]">
                <label class="radio-hidden">
                  <input type="radio" v-model="gender" class="item-input" name="gender" value="女士" />
                </label>
                <span>女士</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for class="item-title">电话</label>
          <div class="item-control phone-number more-text">
            <input type="tel" placeholder="手机号码" v-model="phone" class="item-input" name="phone" />
            <span>
              <i>+</i>通讯录
            </span>
          </div>
        </div>
        <router-link
          tag="div"
          :to="{path:'/search_city/'+ (selectPosition.id || currentPosition.currentCityId),query:{search_type:'map'}}"
          class="form-group"
        >
          <label for class="item-title">地址</label>
          <div class="item-control more-text">
            <span :class="{'black':address !== '选择收货地址'}">{{address}}</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <div class="form-group">
          <label for class="item-title">门牌号</label>
          <div class="item-control">
            <input
              type="text"
              placeholder="例：5号楼203室"
              v-model="detailAdd"
              class="item-input"
              name="detailAdd"
            />
          </div>
        </div>
        <div class="form-group">
          <label for class="item-title">标签</label>
          <div class="item-control mark">
            <div :class="['new_radio',{active:addressMark=='家'} ]" style="margin-right:10px">
              <label class="radio-hidden">
                <input
                  type="radio"
                  v-model="addressMark"
                  class="item-input"
                  name="addressMark"
                  value="家"
                />
              </label>
              <span>家</span>
            </div>
            <div :class="['new_radio',{active:addressMark=='公司'} ]" style="margin-right:10px">
              <label class="radio-hidden">
                <input
                  type="radio"
                  v-model="addressMark"
                  class="item-input"
                  name="addressMark"
                  value="公司"
                />
              </label>
              <span>公司</span>
            </div>
            <div :class="['new_radio',{active:addressMark=='学校'} ]" style="margin-right:10px">
              <label class="radio-hidden">
                <input
                  type="radio"
                  v-model="addressMark"
                  class="item-input"
                  name="addressMark"
                  value="学校"
                />
              </label>
              <span>学校</span>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" @click="save_and_use">保存并使用</button>
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
      username: "",
      gender: "",
      phone: "",
      address: "选择收货地址",
      detailAdd: "",
      addressMark: ""
    };
  },

  components: {
    Headertitle
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/shipping_address") {
      this.username = "";
      this.gender = "";
      this.phone = "";
      this.address = "选择收货地址";
      this.detailAdd = "";
      this.addressMark = "";
    }
    next();
  },
  computed: {
    ...mapState(["currentPosition", "selectPosition"])
  },
  created() {},
  mounted() {
    this.init_data();
  },
  activated() {
    var query = this.$route.query;
    if (
      Object.keys(query).length > 0 &&
      (this.address != query.position.title || query.position.name)
    ) {
      this.address = query.position.title || query.position.name;
    } else {
      this.address = "选择收货地址";
    }
  },
  methods: {
    ...mapActions(["set_ship_address"]),
    init_data() {
      let _this = this;
      let query = _this.$route.query;
      _this.headerTitle = _this.$route.meta.title;
      _this.address =
        Object.keys(query).length > 0
          ? query.position.title || query.position.name
          : "选择收货地址";
    },
    save_and_use() {
      let query = this.$route.query;
      let addId = new Date().getTime();
      let add_detail = Object.keys(query).length > 0 ? query.position : {};
      add_detail["id"] =
        this.selectPosition.id || this.currentPosition.currentCityId;
      add_detail["user_addId"] = addId;
      add_detail["user_name"] = this.username;
      add_detail["user_gender"] = this.gender;
      add_detail["user_phoneNum"] = this.phone;
      add_detail["user_detailAdd"] = this.detailAdd;
      add_detail["user_addressMark"] = this.addressMark;
      console.log("add", add_detail);
      if (
        this.username &&
        this.phone &&
        this.detailAdd &&
        this.address &&
        this.address !== "选择收货地址"
      ) {
        this.set_ship_address_tolacal(add_detail);
        this.$router.push("/shipping_address");
      }
    },
    set_ship_address_tolacal(item) {
      let oas = JSON.parse(localStorage.getItem("shipAddress"));
      oas.push(item);
      localStorage.setItem("shipAddress", JSON.stringify(oas));
      this.set_ship_address(item);
    }
  }
};
</script>
<style lang='scss' scoped>
.add-new-address {
  main {
    width: 100%;
    padding: 0 0.12rem;
    margin-top: 0.63rem;
    .form {
      width: 100%;
      font-size: 12px;
      .form-group {
        width: 100%;
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid;
        border-bottom-color: rgba(204, 204, 204, 0.3);
        input {
          border: 0;
          font-size: 12px;
        }
        .item-title {
          display: inline-block;
          width: 0.6rem;
          color: #000;
          font-weight: 700;
        }
        .name-box {
          width: 82%;
        }
        .male {
          display: block;
          padding-top: 10px;
        }
        .phone-number {
          span {
            color: #26a2ff;
          }
        }
        .new_radio {
          width: 0.6rem;
          height: 0.18rem;
          line-height: 0.18rem;
          text-align: center;
          display: inline-block;
          padding-right: 15px;
          border: 1px solid;
          border-color: rgba(204, 204, 204, 0.5);
          border-radius: 5px;
        }
        .radio-hidden {
          opacity: 0;
        }
        .more-text {
          width: 82%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          i {
            font-size: 16px;
          }
          .blank {
            color: #000 !important;
          }
        }

        .active {
          border-color: #26a2ff !important;
          color: #26a2ff;
        }
        .name {
          padding-bottom: 10px;
          border-bottom: 1px solid;
          border-bottom-color: rgba(204, 204, 204, 0.3);
        }
      }
      button {
        margin-top: 0.2rem;
      }
    }
  }
}
</style>