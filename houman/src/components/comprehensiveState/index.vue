<template>
  <div class="main">
    <navbar></navbar>
    <el-container>
      <div class="leftBox">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedPersons" @change="handleCheckedPersonsChange">
          <el-checkbox
            v-model="persons"
            v-for="person in persons"
            :label="person"
            :key="person.militaryName"
          >{{person.militaryName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div id="digital_earth" class="box"></div>
    </el-container>

    <el-footer>Footer</el-footer>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import Cesium from "cesium/Cesium";
import widgets from "cesium/Widgets/widgets.css";
var viewer;
var entityMouseOverHandler;
var allEntitys = [];
var personOptions = [];

export default {
  name: "dashboard",
  components: { Navbar },

  data() {
    return {
      user: "",
      checkAll: false,
      checkedPersons: [],
      persons: personOptions,
      isIndeterminate: false
    };
  },
  created: function() {
    // 请求数据
    setTimeout(() => {
      personOptions = require("./personCategroy.json").personCategroy;
      this.persons = personOptions;
    }, 2000);
  },
  mounted: function() {
    // this.isrefresh = this.isrefresh ? false:true;
    viewer = new Cesium.Viewer("digital_earth", {
      animation: false, //是否创建动画小器件，左下角仪表
      shouldAnimate: true,
      // baseLayerPicker: false, //是否显示图层选择器
      fullscreenButton: false, //是否显示全屏按钮
      geocoder: false, //是否显示geocoder小器件，右上角查询按钮
      homeButton: false, //是否显示Home按钮
      infoBox: false, //是否显示信息框
      // sceneModePicker: false, //是否显示3D/2D选择器
      selectionIndicator: false, //是否显示选取指示器组件
      timeline: false, //是否显示时间轴
      navigationHelpButton: false, //是否显示右上角的帮助按钮
      sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
      // skyAtmosphere: false, // 三维地球圆边（false 无）
      skyBox: false,
      terrainShadows: Cesium.ShadowMode.DISABLED
    });
    //隐藏logo
    viewer._cesiumWidget._creditContainer.style.display = "none";
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    // var layers = viewer.scene.imageryLayers;
    // layers.removeAll();
    // viewer.scene.globe.baseColor = new Cesium.Color(
    //   9 / 255,
    //   48 / 255,
    //   64 / 255,
    //   1
    // );
    viewer.scene.globe.enableLighting = false;
    viewer.scene.globe.depthTestAgainstTerrain = false;
    viewer.scene.fog.enabled = false;
    // viewer.scene.fog.density = 0;
    viewer.scene.fxaa = false;
    viewer.scene.globe.shadows = false;
    viewer.scene.globe.showGroundAtmosphere = false; // 大气层
    var camera_heading = 0;
    var camera_pitch = -90;
    var camera_roll = 0;
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(117.16, 39.71, 20000000.0),
      orientation: {
        heading: Cesium.Math.toRadians(camera_heading), // east, default value is 0.0 (north)
        pitch: Cesium.Math.toRadians(camera_pitch), // default value (looking down)
        roll: camera_roll // default value
      }
    });
    // this.lowMap(viewer);
    // viewer.scene.primitives.add(human_distribution_primitives);

    entityMouseOverHandler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene.canvas
    );

    // this.addDataToMap();
  },
  methods: {
    // 加载地图背景
    lowMap(viewer) {
      var url = "http://dev.iwhere.com:8010/geoserver/GJ/wms";
      if (
        location.host.indexOf("dev.iwhere.com") != -1 ||
        location.host.indexOf("localhost") != -1 ||
        location.host.indexOf("127.0.0.1") != -1
      ) {
        url = "http://dev.iwhere.com:8010/geoserver/GJ/wms";
      } else if (
        location.host.indexOf("qa.iwhere.com") != -1 ||
        location.host.indexOf("www.iwhere.com") != -1
      ) {
        url = "http://qa.iwhere.com:8112/geoserver/GJ/wms";
      }
      var provider = new Cesium.WebMapServiceImageryProvider({
        //    url : 'http://192.168.50.211:8080/geoserver/GJ/wms',
        //    url : 'http://dev.iwhere.com:8010/geoserver/GJ/wms',
        url: url,
        layers: "GJ:GJLayer",
        parameters: {
          service: "WMS",
          format: "image/png",
          style: "ts_polygon",
          transparent: true
        }
      });
      var imageryLayer = viewer.imageryLayers.addImageryProvider(provider);
      imageryLayer.brightness = 2.0;
    },

    // 地图上添加entity
    addEntityToMap(value) {
      let r = value.color.r / 255.0;
      let g = value.color.g / 255.0;
      let b = value.color.b / 255.0;
      let a = value.color.a;

      let color = new Cesium.Color(r, g, b, a);
      value.locations.forEach(element => {
        let position = new Cesium.Cartesian3.fromDegrees(
          element.lng,
          element.lat,
          0
        );
        var entity = viewer.entities.add({
          id: "point" + element.id,
          objc: element,
          position: position,
          point: {
            pixelSize: 7,
            color: color,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        });
        allEntitys.push(entity);
      });
      this.mouseMoveEvent();
    },

    removeEntityFromMap() {
      for (var i = 0; i < allEntitys.length; i++) {
        let entity = allEntitys[i];
        viewer.entities.remove(entity);
      }
      allEntitys.length = 0;
    },

    // 鼠标移动到entity上触发事件
    mouseMoveEvent() {
      var oldEntity = null;
      entityMouseOverHandler.setInputAction(function(movement) {
        var pick = viewer.scene.pick(movement.endPosition);
        if (Cesium.defined(pick) && pick.id != undefined) {
          if (oldEntity != null && oldEntity != pick.id) {
            oldEntity.point.pixelSize = 7;
          }
          pick.id.point.pixelSize = 20;
          oldEntity = pick.id;
        } else {
          if (oldEntity != null && oldEntity.id.indexOf("point") != -1) {
            oldEntity.point.pixelSize = 7;
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE); //MOUSE_MOVE
    },

    handleCheckAllChange(val) {
      this.checkedPersons = val ? personOptions : [];
      this.isIndeterminate = false;
      this.removeEntityFromMap();
      if (val) {
        // 全选
        personOptions.forEach(element => {
          this.addEntityToMap(element);
        });
      } 
    },
    handleCheckedPersonsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.persons.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.persons.length;
      this.removeEntityFromMap();
      value.forEach(element => {
        this.addEntityToMap(element);
      });
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  flex: 1;
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.leftBox {
  height: 100%;
  min-width: 250px;
  background-color: white;
}
.box {
  height: 100%;
  width: 100%;
}

.el-table {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
}

.main >>> .bga {
  min-width: 420px;
  width: 70%;
  height: 500px;
  background-color: rebeccapurple !important;
}
.el-checkbox-group {
  font-size: 0;
  display: flex;
  flex-direction: column;
}
.el-checkbox + .el-checkbox {
  margin-left: 0px;
}
.el-checkbox-group {
  font-size: 0;
  margin-left: 25px;
}
.el-checkbox {
  margin-top: 10px;
}
.el-checkbox,
.el-checkbox__input {
  display: inline-block;
  position: relative;
  white-space: nowrap;
  padding: 4px;
}
</style>