<template>
  <div class="main">
    <navbar></navbar>
    <el-container>
      <div class="leftBox">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="人员地理分布" name="1">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="personCheckAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedPersons" @change="handleCheckedChange">
              <el-checkbox
                v-model="persons"
                v-for="person in persons"
                :label="person"
                :key="person.militaryName"
              >{{person.militaryName}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="专业人才分布" name="2">
            <el-checkbox
              :indeterminate="isIndeterminate2"
              v-model="profressionCheckAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedProfessions" @change="handleCheckedChange">
              <el-checkbox
                v-model="professions"
                v-for="profession in professions"
                :label="profession"
                :key="profession.militaryName"
              >{{profession.militaryName}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div id="digital_earth" class="box"></div>
    </el-container>
    <div class="locationStyle">
      <i class="el-icon-remove-outline" @click="changeCameraHeight(-1)"></i>
      <i class="el-icon-circle-plus-outline" @click="changeCameraHeight(1)"></i>

      <!-- <el-icon-remove-outline style="width:30px;height:30px"></el-icon-remove-outline> -->
    </div>
    <InfoAlertShow @isShow="showInfoAlert" v-show="isShow" :infoLists="infoLists"></InfoAlertShow>
    <el-footer>Footer</el-footer>
    <!-- https://www.cnblogs.com/xifengxiaoma/p/9573439.html -->
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import Cesium from "cesium/Cesium";
import widgets from "cesium/Widgets/widgets.css";
import InfoAlertShow from "./infoAlertShow.vue";
var viewer;
var entityClickedHandler;
var human_distribution_primitives = new Cesium.PrimitiveCollection(); // 人力资源分布Entitys
var personOptions = []; // 人员分布
var professionalOptions = []; // 专业人才分布
var allEntitys = [];

export default {
  name: "dashboard",
  components: { Navbar, InfoAlertShow },
  data() {
    return {
      user: "",
      isShow: false,
      activeName: "1",
      persons: personOptions,
      professions: professionalOptions,
      personCheckAll: false,
      profressionCheckAll: false,
      checkedPersons: [],
      checkedProfessions: [],
      isIndeterminate: false,
      isIndeterminate2: false,

      infoLists: [
        {
          name: "XX部门",
          detail: "技术平台部"
        },
        {
          name: "总人数",
          detail: "100人"
        },
        {
          name: "地址",
          detail: "北京理工大学国防科技园"
        },
        {
          name: "主打产品",
          detail: "态势分布项目，人力资源分布项目……"
        }
      ],
      lists: [
        {
          id: "1110",
          lat: 38.4534456,
          lng: 117.34827737,
          number: 918,
          unitName: "北京都在",
          detail: [
            {
              name: "XX部门",
              detail: "技术平台部"
            },
            {
              name: "总人数",
              detail: "100人"
            }
          ]
        },
        {
          id: "1111",
          lat: 33.4534456,
          lng: 117.2311111,
          number: 918,
          unitName: "北京都在哪网讯科技",
          detail: [
            {
              name: "XX部门",
              detail: "伤物语不读"
            },
            {
              name: "总人数",
              detail: "1889人"
            },
            {
              name: "地址",
              detail: "北京理工大学国防科技园"
            }
          ]
        },
        {
          id: "1112",
          lat: 35.4534456,
          lng: 114.34827737,
          number: 918,
          unitName: "南京都在哪网讯科技",
          detail: [
            {
              name: "和杜绝部门",
              detail: "中国移动十多个不能"
            },
            {
              name: "设备数",
              detail: "99台"
            },
            {
              name: "地址",
              detail: "哒哒哒哒哒哒多多多多"
            }
          ]
        },
        {
          id: "1113",
          lat: 35.0123445,
          lng: 114.34827737,
          number: 918,
          unitName: "上海都在哪网讯科技",
          detail: [
            {
              name: "hhhhh部门",
              detail: "数据都没码成功"
            },
            {
              name: "十多个工队",
              detail: "22"
            },
            {
              name: "主打产品",
              detail: "态势分布项目，人力资源分布项目……"
            }
          ]
        },
        {
          id: "1114",
          lat: 39.4534456,
          lng: 117.34827737,
          number: 558,
          unitName: "山东都在哪网讯科技",
          detail: []
        },
        {
          id: "1115",
          lat: 36.4534456,
          lng: 118.34827737,
          number: 918,
          unitName: "河南都在哪网讯科技",
          detail: [
            {
              name: "地址",
              detail: "北京理工大学国防科技园"
            },
            {
              name: "主打产品",
              detail: "态势分布项目，人力资源分布项目……"
            }
          ]
        },
        {
          id: "1116",
          lat: 36.4534456,
          lng: 118.34827737,
          number: 918,
          unitName: "河北都在哪网讯科技",
          detail: [
            {
              name: "XX部门",
              detail: "技术平台部"
            },
            {
              name: "主打产品",
              detail: "态势分布项目，人力资源分布项目……"
            }
          ]
        },
        {
          id: "1117",
          lat: 37.66547788,
          lng: 117.34827737,
          number: 918,
          unitName: "山西都在哪网讯科技",
          detail: [
            {
              name: "XX部门",
              detail: "技术平台部"
            }
          ]
        },
        {
          id: "1118",
          lat: 38.13244443,
          lng: 117.78655499,
          number: 918,
          unitName: "陕西都在哪网讯科技",
          detail: [
            {
              name: "主打产品",
              detail: "态势分布项目，人力资源分布项目……"
            }
          ]
        },
        {
          id: "1119",
          lat: 37.4534456,
          lng: 118.34827737,
          number: 918,
          unitName: "广州都在哪网讯科技",
          detail: [
            {
              name: "ddddde",
              detail: "平部哈哈"
            },
            {
              name: "加快速度",
              detail: "88"
            },
            {
              name: "打得过",
              detail: "北京理工大学国防科技园"
            },
            {
              name: "党工委",
              detail:
                "2017年4月16日 - vue实现简单表格组件 本来想这一周做一个关于vuex的总结的,但是由于朋友反应说还不知道如何用vue去写一个组件,所以在此写写一篇文章来说明下如何去写vue页面或者..."
            }
          ]
        }
      ]
    };
  },
  created: function() {
    // 请求数据
    setTimeout(() => {
      personOptions = require("./personDistribution.json").personCategroy;
      this.persons = personOptions;
      professionalOptions = require("./talentDistribution.json").personCategroy;
      this.professions = professionalOptions;
    }, 2000);
  },
  mounted: function() {
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
    viewer.scene.primitives.add(human_distribution_primitives);
    // entity 添加点击事件
    entityClickedHandler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene.canvas
    );

    // this.addDataToMap();
  },
  methods: {
    showInfoAlert(value) {
      this.isShow = value;
    },
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
    // 在地图上添加Entity
    addDataToMap() {
      let color = new Cesium.Color(222.0 / 255, 59.0 / 255, 100.0 / 255, 1);
      this.lists.forEach(element => {
        let position = new Cesium.Cartesian3.fromDegrees(
          element.lng,
          element.lat,
          0
        );
        viewer.entities.add({
          id: "point" + element.id,
          objc: element,
          position: position,
          point: {
            pixelSize: 7,
            color: color,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        });
      });
      this.mouseMoveEvent();
      this.addClickedEvent();
    },
    // 鼠标移动到entity上触发事件
    mouseMoveEvent() {
      var oldEntity = null;
      entityClickedHandler.setInputAction(function(movement) {
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

    // 点击entity触发事件
    addClickedEvent() {
      let that = this;
      entityClickedHandler.setInputAction(function(movement) {
        var pick = viewer.scene.pick(movement.position);

        if (
          Cesium.defined(pick) &&
          pick.id != undefined &&
          pick.id.id.indexOf("point") != -1
        ) {
          var position = pick.id.position.getValue(Cesium.JulianDate.now);
          // var position = pick.id.position.getValue(Cesium.JulianDate.fromDate(new Date(2017,7,11)));
          let boxInfo = pick.id.objc;
          that.showDetailInformation(boxInfo);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    removeEntityFromMap() {
      for (var i = 0; i < allEntitys.length; i++) {
        let entity = allEntitys[i];
        viewer.entities.remove(entity);
      }
      allEntitys.length = 0;
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

    // 显示提示框
    showDetailInformation(element) {
      this.isShow = true;
      this.infoLists = element.detail;
      // this.infoLists.push({ name: "XXXXXX", detail: "1233333333" });
    },

    handleCheckAllChange(val) {
      if (this.activeName == "1") {
        this.checkedPersons = val ? personOptions : [];
        this.isIndeterminate = false;

        this.checkedProfessions = [];
        this.profressionCheckAll = false;
        this.removeEntityFromMap();
        if (val) {
          // 全选
          personOptions.forEach(element => {
            this.addEntityToMap(element);
          });
        }
      } else if (this.activeName == "2") {
        this.checkedProfessions = val ? professionalOptions : [];
        this.isIndeterminate2 = false;

        this.personCheckAll = false;
        this.checkedPersons = [];
        this.removeEntityFromMap();
        if (val) {
          // 全选
          professionalOptions.forEach(element => {
            this.addEntityToMap(element);
          });
        }
      }
    },
    handleCheckedChange(value) {
      if (this.activeName == "1") {
        let checkedCount = value.length;
        this.personCheckAll = checkedCount === this.persons.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.persons.length;
        this.removeEntityFromMap();
        this.checkedProfessions = [];
        this.profressionCheckAll = false;
        value.forEach(element => {
          this.addEntityToMap(element);
        });
      } else if (this.activeName == "2") {
        let checkedCount = value.length;
        this.profressionCheckAll = checkedCount === this.professions.length;
        this.isIndeterminate2 =
          checkedCount > 0 && checkedCount < this.professions.length;
        this.removeEntityFromMap();
        this.personCheckAll = false;
        this.checkedPersons = [];
        value.forEach(element => {
          this.addEntityToMap(element);
        });
      }
    },
    changeCameraHeight(value) {
      if (value == 1) {
        // 放大地图，视角变小
        viewer.camera.moveForward(
          viewer.camera.positionCartographic.height * 0.5
        );
      } else if (value == -1) {
        // 缩小地图，视角变大
        viewer.camera.moveBackward(viewer.camera.positionCartographic.height);
      }
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

.box {
  display: block;
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
.leftBox {
  height: 100%;
  min-width: 257px;
  background-color: white;
}
.locationStyle {
  width: 30px;
  height: 60px;
  background-color: transparent;
  right: 20px;
  bottom: 100px;
  position: absolute;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.main >>> .el-icon-remove-outline {
  width: 30px;
  height: 30px;
  color: white;
}
.main >>> .el-icon-circle-plus-outline {
  width: 30px;
  height: 30px;
  color: white;
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