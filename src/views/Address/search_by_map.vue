<!--  -->
<template>
  <div class="map-search">
    <div class="map" id="map">
      <!-- <i class="iconfont icon-ic_tomap"></i> -->
    </div>
    <div id="surround_result">
      <ul>
        <router-link
          tag="li"
          :to="{ path:to,query:{position:item}}"
          v-for="(item,index) in surrounding"
          :key="index"
          @click.native="set_history(item,addAddressFlag)"
        >
          <i class="iconfont icon-ic_tomap"></i>
          <div>
            <p>{{item.title}}</p>
            <span class="long-text">{{item.address}}</span>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import BMap from "BMap";
export default {
  props: ["addAddressFlag"],
  data() {
    return {
      surrounding: null,
      to: "/add_ship_address"
    };
  },

  components: {},

  computed: {
    ...mapState([
      "currentPosition",
      "selectPosition",
      "currentCity",
      "currentCityId"
    ])
  },
  created() {},
  mounted() {
    this.init_map();
    this.init_data();
  },

  methods: {
    init_data() {
      // console.log("QUERY", this.addAddressFlag);
      if (!this.addAddressFlag) {
        this.to = "/home";
      }
      // console.log("init", this.info);
    },
    init_map() {
      var info = this.$route.query.info;
      var longitude =
        info.point.lng ||
        (Object.keys(this.selectPosition).length > 0
          ? this.selectPosition.longitude || this.selectPosition.point["lng"]
          : this.currentPosition.longitude);
      var latitude =
        info.point.lat ||
        (Object.keys(this.selectPosition).length > 0
          ? this.selectPosition.latitude || this.selectPosition.point.lat
          : this.currentPosition.latitude);
      console.log("initmap", longitude, latitude);
      var map = new BMap.Map("map");
      var point = new BMap.Point(longitude, latitude);
      map.centerAndZoom(point, 16);
      map.enableScrollWheelZoom(true);

      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      marker.enableDragging(); // 不可拖拽
      marker.disableMassClear(); //禁止清除

      var geoc = new BMap.Geocoder();
      this.get_position(marker, geoc);

      marker.addEventListener("dragend", () => {
        this.get_position(marker, geoc);
      });

      marker.addEventListener("dragging", () => {
        map.clearOverlays();
      });
    },
    get_position(marker, geoc) {
      var p = marker.getPosition(); //获取marker的位置

      geoc.getLocation(p, res => {
        this.surrounding = res.surroundingPois;
        var label = new BMap.Label(res["surroundingPois"][0].title, {
          offset: new BMap.Size(-30, -25)
        });
        label.enableMassClear();
        marker.setLabel(label);
      });
    },
    set_history(item, b) {
      // console.log("map", b);
      this.$parent.set_history(item, b);
    }
  }
};
</script>
<style lang='scss' scoped>
.map-search {
  padding-top: 10px;
  .map {
    width: 100%;
    height: 3rem;
    // border: 1px solid #ccc;
  }
  #surround_result {
    height: 2.5rem;
    overflow-y: scroll;
    padding: 0 0.1rem;
    li {
      display: flex;
      padding: 0.1rem 0;
      justify-content: flex-start;
      align-items: center;
      i {
        padding-right: 0.1rem;
      }
      p {
        font-weight: 700;
        color: #000;
      }
      div {
        width: 90%;
      }
      span {
        width: 100%;
        font-size: 12px;
      }
    }
    li:first-of-type p {
      color: #26a2ff;
    }
    li:first-of-type i {
      color: #26a2ff;
    }
  }
}
</style>