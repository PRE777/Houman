<template>
  <div id="teamControl">
    <aside>
      <el-tree
        accordion
        highlight-current
        node-key="1"
        :data="departmentData"
        @node-click="handleNodeClick"
      ></el-tree>
    </aside>
    <div id="contents">
      <div id="page-title">{{pageTitle}}</div>
      <div id="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="超缺失衡监控" name="first">
            <div id="surpass-lack">
              <div
                id="surpass-lack-general"
              >当前单位总编制员额{{totalEstablishmentCount}}人，现编人数{{actualEstablishmentCount}}人，超缺编{{surpassLackCount}}人，净超编{{surpassCount}}人，净缺编{{lackCount}}人。</div>
              <table id="surpass-lack-table"></table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="高配监控" name="second">
            <div id="high-configuration">
              <div
                id="high-configuration-general"
              >当前单位领导干部岗位总计{{leaderCounts}}人，高配人员总数{{highCounts}}人，高配人员占比{{(highCounts * 100 / leaderCounts).toFixed(2) + '%'}}。</div>
              <el-table :data="highData" border style="width: 90%">
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="ID" label="身份号"></el-table-column>
                <el-table-column prop="positionLevel" label="职务等级"></el-table-column>
                <el-table-column prop="jobLevel" label="岗位等级"></el-table-column>
                <el-table-column prop="stages" label="高配级数"></el-table-column>
              </el-table>
              <el-pagination background layout="prev, pager, next" :total="200"></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="超配监控" name="third">
            <div id="surpass-control">
              <div id="leader1"></div>
              <div id="leader2"></div>
              <div id="leader3"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="领导岗位流动监控" name="fourth">
            <div id="leader-position-mobility">
              <el-table :data="mobilityData" border style="width: 90%">
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="job" label="岗位"></el-table-column>
                <el-table-column prop="first" label="第一任在职年限"></el-table-column>
                <el-table-column prop="second" label="第二任在职年限"></el-table-column>
                <el-table-column prop="third" label="第三任在职年限"></el-table-column>
                <el-table-column prop="fourth" label="第四任在职年限"></el-table-column>
                <el-table-column prop="fifth" label="第五任在职年限"></el-table-column>
                <el-table-column prop="average" label="平均在职年限"></el-table-column>
              </el-table>
              <el-pagination background layout="prev, pager, next" :total="200"></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="退役比例监控" name="fivth">
            <div id="retirement-control">
              <div
                id="retirement-control-general"
              >当前单位2018年编制员额总计{{totalCounts}}人，退役人员总数{{retireCounts}}人，退役人员占比{{(retireCounts * 100 / totalCounts).toFixed(2) + '%'}}。</div>
              <el-table :data="retireData" border style="width: 90%">
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="ID" label="身份号"></el-table-column>
                <el-table-column prop="retireTime" label="退役时间"></el-table-column>
              </el-table>
              <el-pagination background layout="prev, pager, next" :total="13"></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="生长干部补充比例监控" name="sixth">
            <div id="grow-control">
              <div
                id="grow-control-general"
              >当前单位2018年编制员额总计{{totalCounts}}人，生长干部补充人员总数{{growCounts}}人，生长干部补充人员占比{{(growCounts * 100 / totalCounts).toFixed(2) + '%'}}。</div>
              <el-table :data="growData" border style="width: 90%">
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="ID" label="身份号"></el-table-column>
                <el-table-column prop="growTime" label="生长补充时间"></el-table-column>
              </el-table>
              <el-pagination background layout="prev, pager, next" :total="13"></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  configureTableInfo,
  configureLeaderSurpass
} from "../../assets/js/teamControl.js";
import echarts from "echarts";
export default {
  name: "teamControl",
  data() {
    return {
      activeName: "first",
      pageTitle: "A单位",
      departmentData: [
        {
          label: "A单位",
          id: 1,
          children: [
            {
              label: "A单位办公室",
              id: 2,
              children: [
                {
                  label: "A单位办公室第一秘书处"
                },
                {
                  label: "A单位办公室第二秘书处"
                }
              ]
            }
          ]
        },
        {
          label: "B单位",
          children: [
            {
              label: "B单位办公室",
              children: [
                {
                  label: "B单位办公室法务部"
                }
              ]
            },
            {
              label: "B单位行政部",
              children: [
                {
                  label: "B单位行政部一处"
                }
              ]
            }
          ]
        },
        {
          label: "C单位",
          children: [
            {
              label: "C单位办公室",
              children: [
                {
                  label: "C单位办公室秘书部"
                }
              ]
            },
            {
              label: "C单位商务部",
              children: [
                {
                  label: "C单位商务部一部"
                }
              ]
            }
          ]
        }
      ],
      currentDepartment: "department-first",
      currentTab: "pane-first",
      // 总编制
      totalEstablishmentCount: 20,
      // 总现编
      actualEstablishmentCount: 21,
      // 超/缺编
      surpassLackCount: 1,
      // 净超
      surpassCount: 4,
      // 净缺
      lackCount: 3,
      // 超缺失衡
      surpassLackData: [
        ["", "编制员额", "现编人数", "超编人数", "缺编人数"],
        ["A单位岗位一", "1", "1", "0", "0"],
        ["A单位岗位二", "1", "1", "0", "0"],
        ["A单位岗位三", "2", "3", "1", "0"],
        ["A单位岗位四", "1", "1", "0", "0"],
        ["A单位岗位五", "3", "2", "0", "1"],
        ["A单位岗位六", "4", "2", "0", "2"],
        ["A单位岗位七", "1", "2", "1", "0"],
        ["A单位岗位八", "1", "1", "0", "0"],
        ["A单位岗位九", "3", "5", "2", "0"],
        ["A单位岗位十", "1", "1", "0", "0"],
        ["A单位岗位十一", "1", "1", "0", "0"],
        ["A单位岗位十二", "1", "1", "0", "0"]
      ],
      // 领导岗位总数
      leaderCounts: 132,
      // 高配岗位总数
      highCounts: 13,
      // 高配
      highData: [
        {
          department: "A单位",
          name: "王小虎",
          ID: "0098431",
          positionLevel: "01",
          jobLevel: "02",
          stages: 1
        },
        {
          department: "A单位",
          name: "李河北",
          ID: "3218431",
          positionLevel: "03",
          jobLevel: "05",
          stages: 2
        },
        {
          department: "A单位",
          name: "汪真真",
          ID: "3432181",
          positionLevel: "05",
          jobLevel: "06",
          stages: 1
        },
        {
          department: "A单位",
          name: "夏海",
          ID: "8134321",
          positionLevel: "05",
          jobLevel: "07",
          stages: 2
        },
        {
          department: "A单位",
          name: "王津",
          ID: "2813431",
          positionLevel: "06",
          jobLevel: "07",
          stages: 1
        },
        {
          department: "A单位",
          name: "杜贺",
          ID: "0098431",
          positionLevel: "07",
          jobLevel: "08",
          stages: 1
        },
        {
          department: "A单位",
          name: "吕建国",
          ID: "3218431",
          positionLevel: "08",
          jobLevel: "10",
          stages: 2
        },
        {
          department: "A单位",
          name: "陈壮",
          ID: "3432181",
          positionLevel: "09",
          jobLevel: "10",
          stages: 1
        },
        {
          department: "A单位",
          name: "李济",
          ID: "8134321",
          positionLevel: "10",
          jobLevel: "11",
          stages: 1
        },
        {
          department: "A单位",
          name: "董武",
          ID: "2813431",
          positionLevel: "10",
          jobLevel: "12",
          stages: 2
        }
      ],
      // 超配
      surpassData: [],
      // 领导岗位流动监控
      mobilityData: [
        {
          department: "A单位",
          job: "岗位一",
          first: 3,
          second: 4,
          third: 2,
          fourth: "-",
          fifth: "-",
          average: 3.3
        },
        {
          department: "A单位",
          job: "岗位二",
          first: 5,
          second: 2,
          third: 2,
          fourth: 1,
          fifth: "-",
          average: 2.5
        },
        {
          department: "A单位",
          job: "岗位三",
          first: 6,
          second: 4,
          third: "-",
          fourth: "-",
          fifth: "-",
          average: 5
        },
        {
          department: "A单位",
          job: "岗位四",
          first: 3,
          second: 4,
          third: 3,
          fourth: "-",
          fifth: "-",
          average: 3.3
        },
        {
          department: "A单位",
          job: "岗位五",
          first: 4,
          second: 5,
          third: 1,
          fourth: "-",
          fifth: "-",
          average: 3.3
        },
        {
          department: "A单位",
          job: "岗位六",
          first: 2,
          second: 3,
          third: 3,
          fourth: 2,
          fifth: "-",
          average: 2.5
        },
        {
          department: "A单位",
          job: "岗位七",
          first: 2,
          second: 2,
          third: 1,
          fourth: 2,
          fifth: 3,
          average: 2
        },
        {
          department: "A单位",
          job: "岗位八",
          first: 4,
          second: 4,
          third: 2,
          fourth: "-",
          fifth: "-",
          average: 3.3
        },
        {
          department: "A单位",
          job: "岗位九",
          first: 3,
          second: 2,
          third: 5,
          fourth: "-",
          fifth: "-",
          average: 3.3
        },
        {
          department: "A单位",
          job: "岗位十",
          first: 3,
          second: 3,
          third: 4,
          fourth: "-",
          fifth: "-",
          average: 3.3
        }
      ],
      // 退役人员
      retireData: [
        {
          department: "A单位",
          name: "王小虎",
          ID: "0098431",
          retireTime: "2018-10-20"
        },
        {
          department: "A单位",
          name: "李河北",
          ID: "3218431",
          retireTime: "2018-12-03"
        },
        {
          department: "A单位",
          name: "汪真真",
          ID: "3432181",
          retireTime: "2018-09-22"
        },
        {
          department: "A单位",
          name: "夏海",
          ID: "8134321",
          retireTime: "2018-08-22"
        },
        {
          department: "A单位",
          name: "王津",
          ID: "2813431",
          retireTime: "2018-05-26"
        },
        {
          department: "A单位",
          name: "杜贺",
          ID: "0098431",
          retireTime: "2018-03-20"
        },
        {
          department: "A单位",
          name: "吕建国",
          ID: "3218431",
          retireTime: "2018-11-12"
        },
        {
          department: "A单位",
          name: "陈壮",
          ID: "3432181",
          retireTime: "2018-06-18"
        },
        {
          department: "A单位",
          name: "李济",
          ID: "8134321",
          retireTime: "2018-03-20"
        },
        {
          department: "A单位",
          name: "董武",
          ID: "2813431",
          retireTime: "2018-09-12"
        }
      ],
      // 总编制员额
      totalCounts: 124,
      // 退役人数
      retireCounts: 13,
      // 生长补充
      growData: [
        {
          department: "A单位",
          name: "王小虎",
          ID: "0098431",
          growTime: "2018-10-20"
        },
        {
          department: "A单位",
          name: "李河北",
          ID: "3218431",
          growTime: "2018-12-03"
        },
        {
          department: "A单位",
          name: "汪真真",
          ID: "3432181",
          growTime: "2018-09-22"
        },
        {
          department: "A单位",
          name: "夏海",
          ID: "8134321",
          growTime: "2018-08-22"
        },
        {
          department: "A单位",
          name: "王津",
          ID: "2813431",
          growTime: "2018-05-26"
        },
        {
          department: "A单位",
          name: "杜贺",
          ID: "0098431",
          growTime: "2018-03-20"
        },
        {
          department: "A单位",
          name: "吕建国",
          ID: "3218431",
          growTime: "2018-11-12"
        },
        {
          department: "A单位",
          name: "陈壮",
          ID: "3432181",
          growTime: "2018-06-18"
        },
        {
          department: "A单位",
          name: "李济",
          ID: "8134321",
          growTime: "2018-03-20"
        },
        {
          department: "A单位",
          name: "董武",
          ID: "2813431",
          growTime: "2018-09-12"
        }
      ],
      // 生长补充干部总数
      growCounts: 17
    };
  },
  mounted() {
    configureTableInfo(this.surpassLackData);
  },
  methods: {
    // - 点击节点：选择单位
    handleNodeClick(data, node, view) {
      console.log(data);
      console.log(node);
      console.log(view);
      this.pageTitle = node.label;
    },
    // 选择部门
    chooseDepartment(eve) {
      var liObjs = document.getElementById("sideUl").getElementsByTagName("li");
      for (var i = 0; i < liObjs.length; i++) {
        liObjs[i].className = "";
      }
      eve.target.className = "is-current";
      this.currentDepartment = eve.target.id;
      switch (this.currentTab) {
        case "pane-first":
          if (this.currentDepartment == "department-first") {
            this.surpassLackData = [
              ["", "编制员额", "现编人数", "超编人数", "缺编人数"],
              ["A单位岗位一", "1", "1", "0", "0"],
              ["A单位岗位二", "1", "1", "0", "0"],
              ["A单位岗位三", "2", "3", "1", "0"],
              ["A单位岗位四", "1", "1", "0", "0"],
              ["A单位岗位五", "3", "2", "0", "1"],
              ["A单位岗位六", "4", "2", "0", "2"],
              ["A单位岗位七", "1", "2", "1", "0"],
              ["A单位岗位八", "1", "1", "0", "0"],
              ["A单位岗位九", "3", "5", "2", "0"],
              ["A单位岗位十", "1", "1", "0", "0"],
              ["A单位岗位十一", "1", "1", "0", "0"],
              ["A单位岗位十二", "1", "1", "0", "0"]
            ];
          } else if (this.currentDepartment == "department-second") {
            this.surpassLackData = [
              ["", "编制员额", "现编人数", "超编人数", "缺编人数"],
              ["B单位岗位一", "1", "1", "0", "0"],
              ["B单位岗位二", "1", "1", "0", "0"],
              ["B单位岗位三", "2", "3", "1", "0"],
              ["B单位岗位四", "1", "1", "0", "0"],
              ["B单位岗位五", "3", "2", "0", "1"],
              ["B单位岗位六", "4", "2", "0", "2"],
              ["B单位岗位七", "1", "2", "1", "0"],
              ["B单位岗位八", "1", "1", "0", "0"],
              ["B单位岗位九", "3", "5", "2", "0"],
              ["B单位岗位十", "1", "1", "0", "0"],
              ["B单位岗位十一", "1", "1", "0", "0"]
            ];
          } else if (this.currentDepartment == "department-third") {
            this.surpassLackData = [
              ["", "编制员额", "现编人数", "超编人数", "缺编人数"],
              ["C单位岗位一", "1", "1", "0", "0"],
              ["C单位岗位二", "1", "1", "0", "0"],
              ["C单位岗位三", "2", "3", "1", "0"],
              ["C单位岗位四", "1", "1", "0", "0"],
              ["C单位岗位五", "3", "2", "0", "1"],
              ["C单位岗位六", "4", "2", "0", "2"],
              ["C单位岗位七", "1", "2", "1", "0"],
              ["C单位岗位八", "1", "1", "0", "0"],
              ["C单位岗位九", "3", "5", "2", "0"],
              ["C单位岗位十", "1", "1", "0", "0"],
              ,
            ];
          } else if (this.currentDepartment == "department-fourth") {
            this.surpassLackData = [
              ["", "编制员额", "现编人数", "超编人数", "缺编人数"],
              ["D单位岗位一", "1", "1", "0", "0"],
              ["D单位岗位二", "1", "1", "0", "0"],
              ["D单位岗位三", "2", "3", "1", "0"],
              ["D单位岗位四", "1", "1", "0", "0"],
              ["D单位岗位五", "3", "2", "0", "1"],
              ["D单位岗位六", "4", "2", "0", "2"],
              ["D单位岗位七", "1", "2", "1", "0"],
              ["D单位岗位八", "1", "1", "0", "0"],
              ["D单位岗位九", "3", "5", "2", "0"],
              ["D单位岗位十", "1", "1", "0", "0"],
              ["D单位岗位十一", "1", "1", "0", "0"],
              ["D单位岗位十二", "1", "1", "0", "0"],
              ["D单位岗位十三", "3", "4", "1", "0"]
            ];
          } else if (this.currentDepartment == "department-fivth") {
            this.surpassLackData = [
              ["", "编制员额", "现编人数", "超编人数", "缺编人数"],
              ["E单位岗位一", "1", "1", "0", "0"],
              ["E单位岗位二", "1", "1", "0", "0"],
              ["E单位岗位三", "2", "3", "1", "0"],
              ["E单位岗位四", "1", "1", "0", "0"],
              ["E单位岗位五", "3", "2", "0", "1"],
              ["E单位岗位六", "4", "2", "0", "2"],
              ["E单位岗位七", "1", "2", "1", "0"],
              ["E单位岗位八", "1", "1", "0", "0"],
              ["E单位岗位九", "3", "5", "2", "0"],
              ["E单位岗位十", "1", "1", "0", "0"],
              ["E单位岗位十一", "1", "1", "0", "0"],
              ["E单位岗位十二", "1", "1", "0", "0"],
              ["E单位岗位十三", "3", "4", "1", "0"],
              ["E单位岗位十四", "2", "1", "0", "1"]
            ];
          }
          configureTableInfo(this.surpassLackData);
          break;
        case "pane-second":
          if (this.currentDepartment == "department-first") {
            this.highData = [
              {
                department: "A单位",
                name: "王小虎",
                ID: "0098431",
                positionLevel: "01",
                jobLevel: "02",
                stages: 1
              },
              {
                department: "A单位",
                name: "李河北",
                ID: "3218431",
                positionLevel: "03",
                jobLevel: "05",
                stages: 2
              },
              {
                department: "A单位",
                name: "汪真真",
                ID: "3432181",
                positionLevel: "05",
                jobLevel: "06",
                stages: 1
              },
              {
                department: "A单位",
                name: "夏海",
                ID: "8134321",
                positionLevel: "05",
                jobLevel: "07",
                stages: 2
              },
              {
                department: "A单位",
                name: "王津",
                ID: "2813431",
                positionLevel: "06",
                jobLevel: "07",
                stages: 1
              },
              {
                department: "A单位",
                name: "杜贺",
                ID: "0098431",
                positionLevel: "07",
                jobLevel: "08",
                stages: 1
              },
              {
                department: "A单位",
                name: "吕建国",
                ID: "3218431",
                positionLevel: "08",
                jobLevel: "10",
                stages: 2
              },
              {
                department: "A单位",
                name: "陈壮",
                ID: "3432181",
                positionLevel: "09",
                jobLevel: "10",
                stages: 1
              },
              {
                department: "A单位",
                name: "李济",
                ID: "8134321",
                positionLevel: "10",
                jobLevel: "11",
                stages: 1
              },
              {
                department: "A单位",
                name: "董武",
                ID: "2813431",
                positionLevel: "10",
                jobLevel: "12",
                stages: 2
              }
            ];
          } else if (this.currentDepartment == "department-second") {
            this.highData = [
              {
                department: "B单位",
                name: "王小虎",
                ID: "0098431",
                positionLevel: "01",
                jobLevel: "02",
                stages: 1
              },
              {
                department: "B单位",
                name: "李河北",
                ID: "3218431",
                positionLevel: "03",
                jobLevel: "05",
                stages: 2
              },
              {
                department: "B单位",
                name: "汪真真",
                ID: "3432181",
                positionLevel: "05",
                jobLevel: "06",
                stages: 1
              },
              {
                department: "B单位",
                name: "夏海",
                ID: "8134321",
                positionLevel: "05",
                jobLevel: "07",
                stages: 2
              },
              {
                department: "B单位",
                name: "王津",
                ID: "2813431",
                positionLevel: "06",
                jobLevel: "07",
                stages: 1
              },
              {
                department: "B单位",
                name: "杜贺",
                ID: "0098431",
                positionLevel: "07",
                jobLevel: "08",
                stages: 1
              },
              {
                department: "B单位",
                name: "吕建国",
                ID: "3218431",
                positionLevel: "08",
                jobLevel: "10",
                stages: 2
              },
              {
                department: "B单位",
                name: "陈壮",
                ID: "3432181",
                positionLevel: "09",
                jobLevel: "10",
                stages: 1
              },
              {
                department: "B单位",
                name: "李济",
                ID: "8134321",
                positionLevel: "10",
                jobLevel: "11",
                stages: 1
              },
              {
                department: "B单位",
                name: "董武",
                ID: "2813431",
                positionLevel: "10",
                jobLevel: "12",
                stages: 2
              }
            ];
          } else if (this.currentDepartment == "department-third") {
            this.highData = [
              {
                department: "C单位",
                name: "王小虎",
                ID: "0098431",
                positionLevel: "01",
                jobLevel: "02",
                stages: 1
              },
              {
                department: "C单位",
                name: "李河北",
                ID: "3218431",
                positionLevel: "03",
                jobLevel: "05",
                stages: 2
              },
              {
                department: "C单位",
                name: "汪真真",
                ID: "3432181",
                positionLevel: "05",
                jobLevel: "06",
                stages: 1
              },
              {
                department: "C单位",
                name: "夏海",
                ID: "8134321",
                positionLevel: "05",
                jobLevel: "07",
                stages: 2
              },
              {
                department: "C单位",
                name: "王津",
                ID: "2813431",
                positionLevel: "06",
                jobLevel: "07",
                stages: 1
              },
              {
                department: "C单位",
                name: "杜贺",
                ID: "0098431",
                positionLevel: "07",
                jobLevel: "08",
                stages: 1
              },
              {
                department: "C单位",
                name: "吕建国",
                ID: "3218431",
                positionLevel: "08",
                jobLevel: "10",
                stages: 2
              },
              {
                department: "C单位",
                name: "陈壮",
                ID: "3432181",
                positionLevel: "09",
                jobLevel: "10",
                stages: 1
              },
              {
                department: "C单位",
                name: "李济",
                ID: "8134321",
                positionLevel: "10",
                jobLevel: "11",
                stages: 1
              },
              {
                department: "C单位",
                name: "董武",
                ID: "2813431",
                positionLevel: "10",
                jobLevel: "12",
                stages: 2
              }
            ];
          } else if (this.currentDepartment == "department-fourth") {
            this.highData = [
              {
                department: "D单位",
                name: "王小虎",
                ID: "0098431",
                positionLevel: "01",
                jobLevel: "02",
                stages: 1
              },
              {
                department: "D单位",
                name: "李河北",
                ID: "3218431",
                positionLevel: "03",
                jobLevel: "05",
                stages: 2
              },
              {
                department: "D单位",
                name: "汪真真",
                ID: "3432181",
                positionLevel: "05",
                jobLevel: "06",
                stages: 1
              },
              {
                department: "D单位",
                name: "夏海",
                ID: "8134321",
                positionLevel: "05",
                jobLevel: "07",
                stages: 2
              },
              {
                department: "D单位",
                name: "王津",
                ID: "2813431",
                positionLevel: "06",
                jobLevel: "07",
                stages: 1
              },
              {
                department: "D单位",
                name: "杜贺",
                ID: "0098431",
                positionLevel: "07",
                jobLevel: "08",
                stages: 1
              },
              {
                department: "D单位",
                name: "吕建国",
                ID: "3218431",
                positionLevel: "08",
                jobLevel: "10",
                stages: 2
              },
              {
                department: "D单位",
                name: "陈壮",
                ID: "3432181",
                positionLevel: "09",
                jobLevel: "10",
                stages: 1
              },
              {
                department: "D单位",
                name: "李济",
                ID: "8134321",
                positionLevel: "10",
                jobLevel: "11",
                stages: 1
              },
              {
                department: "D单位",
                name: "董武",
                ID: "2813431",
                positionLevel: "10",
                jobLevel: "12",
                stages: 2
              }
            ];
          } else if (this.currentDepartment == "department-fivth") {
            this.highData = [
              {
                department: "E单位",
                name: "王小虎",
                ID: "0098431",
                positionLevel: "01",
                jobLevel: "02",
                stages: 1
              },
              {
                department: "E单位",
                name: "李河北",
                ID: "3218431",
                positionLevel: "03",
                jobLevel: "05",
                stages: 2
              },
              {
                department: "E单位",
                name: "汪真真",
                ID: "3432181",
                positionLevel: "05",
                jobLevel: "06",
                stages: 1
              },
              {
                department: "E单位",
                name: "夏海",
                ID: "8134321",
                positionLevel: "05",
                jobLevel: "07",
                stages: 2
              },
              {
                department: "E单位",
                name: "王津",
                ID: "2813431",
                positionLevel: "06",
                jobLevel: "07",
                stages: 1
              },
              {
                department: "E单位",
                name: "杜贺",
                ID: "0098431",
                positionLevel: "07",
                jobLevel: "08",
                stages: 1
              },
              {
                department: "E单位",
                name: "吕建国",
                ID: "3218431",
                positionLevel: "08",
                jobLevel: "10",
                stages: 2
              },
              {
                department: "E单位",
                name: "陈壮",
                ID: "3432181",
                positionLevel: "09",
                jobLevel: "10",
                stages: 1
              },
              {
                department: "E单位",
                name: "李济",
                ID: "8134321",
                positionLevel: "10",
                jobLevel: "11",
                stages: 1
              },
              {
                department: "E单位",
                name: "董武",
                ID: "2813431",
                positionLevel: "10",
                jobLevel: "12",
                stages: 2
              }
            ];
          }
          break;
        case "pane-third":
          var category1 = [];
          var data1 = [];
          var category2 = [];
          var data2 = [];
          var category3 = [];
          var data3 = [];
          if (this.currentDepartment == "department-first") {
            category1 = [
              "A单位岗位一",
              "A单位岗位二",
              "A单位岗位三",
              "A单位岗位四",
              "A单位岗位五",
              "A单位岗位六",
              "A单位岗位七",
              "A单位岗位八",
              "A单位岗位九",
              "A单位岗位十",
              "A单位整体超编(人)"
            ];
            data1 = [4, 3, 1, 2, 2, 3, 1, 3, 1, 2, 22];
            category2 = [
              "A单位岗位一",
              "A单位岗位二",
              "A单位岗位三",
              "A单位岗位四",
              "A单位岗位五",
              "A单位岗位六",
              "A单位岗位七",
              "A单位岗位八",
              "A单位整体超编(人)"
            ];
            data2 = [2, 2, 3, 1, 1, 2, 1, 2, 14];
            category3 = [
              "A单位岗位一",
              "A单位岗位二",
              "A单位岗位三",
              "A单位岗位四",
              "A单位岗位五",
              "A单位岗位六",
              "A单位岗位七",
              "A单位岗位八",
              "A单位岗位九",
              "A单位整体超编(人)"
            ];
            data3 = [1, 2, 3, 1, 3, 1, 1, 1, 2, 15];
          } else if (this.currentDepartment == "department-second") {
            category1 = [
              "B单位岗位一",
              "B单位岗位二",
              "B单位岗位三",
              "B单位岗位四",
              "B单位岗位五",
              "B单位岗位六",
              "B单位岗位七",
              "B单位岗位八",
              "B单位岗位九",
              "B单位岗位十",
              "B单位整体超编(人)"
            ];
            data1 = [4, 3, 1, 2, 2, 3, 1, 3, 1, 2, 22];
            category2 = [
              "B单位岗位一",
              "B单位岗位二",
              "B单位岗位三",
              "B单位岗位四",
              "B单位岗位五",
              "B单位岗位六",
              "B单位岗位七",
              "B单位岗位八",
              "B单位整体超编(人)"
            ];
            data2 = [2, 2, 3, 1, 1, 2, 1, 2, 14];
            category3 = [
              "B单位岗位一",
              "B单位岗位二",
              "B单位岗位三",
              "B单位岗位四",
              "B单位岗位五",
              "B单位岗位六",
              "B单位岗位七",
              "B单位岗位八",
              "B单位岗位九",
              "B单位整体超编(人)"
            ];
            data3 = [1, 2, 3, 1, 3, 1, 1, 1, 2, 15];
          } else if (this.currentDepartment == "department-third") {
            category1 = [
              "C单位岗位一",
              "C单位岗位二",
              "C单位岗位三",
              "C单位岗位四",
              "C单位岗位五",
              "C单位岗位六",
              "C单位岗位七",
              "C单位岗位八",
              "C单位岗位九",
              "C单位岗位十",
              "C单位整体超编(人)"
            ];
            data1 = [4, 3, 1, 2, 2, 3, 1, 3, 1, 2, 22];
            category2 = [
              "C单位岗位一",
              "C单位岗位二",
              "C单位岗位三",
              "C单位岗位四",
              "C单位岗位五",
              "C单位岗位六",
              "C单位岗位七",
              "C单位岗位八",
              "C单位整体超编(人)"
            ];
            data2 = [2, 2, 3, 1, 1, 2, 1, 2, 14];
            category3 = [
              "C单位岗位一",
              "C单位岗位二",
              "C单位岗位三",
              "C单位岗位四",
              "C单位岗位五",
              "C单位岗位六",
              "C单位岗位七",
              "C单位岗位八",
              "C单位岗位九",
              "C单位整体超编(人)"
            ];
            data3 = [1, 2, 3, 1, 3, 1, 1, 1, 2, 15];
          } else if (this.currentDepartment == "department-fourth") {
            category1 = [
              "D单位岗位一",
              "D单位岗位二",
              "D单位岗位三",
              "D单位岗位四",
              "D单位岗位五",
              "D单位岗位六",
              "D单位岗位七",
              "D单位岗位八",
              "D单位岗位九",
              "D单位岗位十",
              "D单位整体超编(人)"
            ];
            data1 = [4, 3, 1, 2, 2, 3, 1, 3, 1, 2, 22];
            category2 = [
              "D单位岗位一",
              "D单位岗位二",
              "D单位岗位三",
              "D单位岗位四",
              "D单位岗位五",
              "D单位岗位六",
              "D单位岗位七",
              "D单位岗位八",
              "D单位整体超编(人)"
            ];
            data2 = [2, 2, 3, 1, 1, 2, 1, 2, 14];
            category3 = [
              "D单位岗位一",
              "D单位岗位二",
              "D单位岗位三",
              "D单位岗位四",
              "D单位岗位五",
              "D单位岗位六",
              "D单位岗位七",
              "D单位岗位八",
              "D单位岗位九",
              "D单位整体超编(人)"
            ];
            data3 = [1, 2, 3, 1, 3, 1, 1, 1, 2, 15];
          } else if (this.currentDepartment == "department-fivth") {
            category1 = [
              "E单位岗位一",
              "E单位岗位二",
              "E单位岗位三",
              "E单位岗位四",
              "E单位岗位五",
              "E单位岗位六",
              "E单位岗位七",
              "E单位岗位八",
              "E单位岗位九",
              "E单位岗位十",
              "E单位整体超编(人)"
            ];
            data1 = [4, 3, 1, 2, 2, 3, 1, 3, 1, 2, 22];
            category2 = [
              "E单位岗位一",
              "E单位岗位二",
              "E单位岗位三",
              "E单位岗位四",
              "E单位岗位五",
              "E单位岗位六",
              "E单位岗位七",
              "E单位岗位八",
              "E单位整体超编(人)"
            ];
            data2 = [2, 2, 3, 1, 1, 2, 1, 2, 14];
            category3 = [
              "E单位岗位一",
              "E单位岗位二",
              "E单位岗位三",
              "E单位岗位四",
              "E单位岗位五",
              "E单位岗位六",
              "E单位岗位七",
              "E单位岗位八",
              "E单位岗位九",
              "E单位整体超编(人)"
            ];
            data3 = [1, 2, 3, 1, 3, 1, 1, 1, 2, 15];
          }
          configureLeaderSurpass(
            category1,
            data1,
            category2,
            data2,
            category3,
            data3
          );
          break;
        case "pane-fourth":
          if (this.currentDepartment == "department-first") {
            this.mobilityData = [
              {
                department: "A单位",
                job: "岗位一",
                first: 3,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "A单位",
                job: "岗位二",
                first: 5,
                second: 2,
                third: 2,
                fourth: 1,
                fifth: "-",
                average: 2.5
              },
              {
                department: "A单位",
                job: "岗位三",
                first: 6,
                second: 4,
                third: "-",
                fourth: "-",
                fifth: "-",
                average: 5
              },
              {
                department: "A单位",
                job: "岗位四",
                first: 3,
                second: 4,
                third: 3,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "A单位",
                job: "岗位五",
                first: 4,
                second: 5,
                third: 1,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "A单位",
                job: "岗位六",
                first: 2,
                second: 3,
                third: 3,
                fourth: 2,
                fifth: "-",
                average: 2.5
              },
              {
                department: "A单位",
                job: "岗位七",
                first: 2,
                second: 2,
                third: 1,
                fourth: 2,
                fifth: 3,
                average: 2
              },
              {
                department: "A单位",
                job: "岗位八",
                first: 4,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "A单位",
                job: "岗位九",
                first: 3,
                second: 2,
                third: 5,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "A单位",
                job: "岗位十",
                first: 3,
                second: 3,
                third: 4,
                fourth: "-",
                fifth: "-",
                average: 3.3
              }
            ];
          } else if (this.currentDepartment == "department-second") {
            this.mobilityData = [
              {
                department: "B单位",
                job: "岗位一",
                first: 3,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "B单位",
                job: "岗位二",
                first: 5,
                second: 2,
                third: 2,
                fourth: 1,
                fifth: "-",
                average: 2.5
              },
              {
                department: "B单位",
                job: "岗位三",
                first: 6,
                second: 4,
                third: "-",
                fourth: "-",
                fifth: "-",
                average: 5
              },
              {
                department: "B单位",
                job: "岗位四",
                first: 3,
                second: 4,
                third: 3,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "B单位",
                job: "岗位五",
                first: 4,
                second: 5,
                third: 1,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "B单位",
                job: "岗位六",
                first: 2,
                second: 3,
                third: 3,
                fourth: 2,
                fifth: "-",
                average: 2.5
              },
              {
                department: "B单位",
                job: "岗位七",
                first: 2,
                second: 2,
                third: 1,
                fourth: 2,
                fifth: 3,
                average: 2
              },
              {
                department: "B单位",
                job: "岗位八",
                first: 4,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "B单位",
                job: "岗位九",
                first: 3,
                second: 2,
                third: 5,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "B单位",
                job: "岗位十",
                first: 3,
                second: 3,
                third: 4,
                fourth: "-",
                fifth: "-",
                average: 3.3
              }
            ];
          } else if (this.currentDepartment == "department-third") {
            this.mobilityData = [
              {
                department: "C单位",
                job: "岗位一",
                first: 3,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "C单位",
                job: "岗位二",
                first: 5,
                second: 2,
                third: 2,
                fourth: 1,
                fifth: "-",
                average: 2.5
              },
              {
                department: "C单位",
                job: "岗位三",
                first: 6,
                second: 4,
                third: "-",
                fourth: "-",
                fifth: "-",
                average: 5
              },
              {
                department: "C单位",
                job: "岗位四",
                first: 3,
                second: 4,
                third: 3,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "C单位",
                job: "岗位五",
                first: 4,
                second: 5,
                third: 1,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "C单位",
                job: "岗位六",
                first: 2,
                second: 3,
                third: 3,
                fourth: 2,
                fifth: "-",
                average: 2.5
              },
              {
                department: "C单位",
                job: "岗位七",
                first: 2,
                second: 2,
                third: 1,
                fourth: 2,
                fifth: 3,
                average: 2
              },
              {
                department: "C单位",
                job: "岗位八",
                first: 4,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "C单位",
                job: "岗位九",
                first: 3,
                second: 2,
                third: 5,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "C单位",
                job: "岗位十",
                first: 3,
                second: 3,
                third: 4,
                fourth: "-",
                fifth: "-",
                average: 3.3
              }
            ];
          } else if (this.currentDepartment == "department-fourth") {
            this.mobilityData = [
              {
                department: "D单位",
                job: "岗位一",
                first: 3,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "D单位",
                job: "岗位二",
                first: 5,
                second: 2,
                third: 2,
                fourth: 1,
                fifth: "-",
                average: 2.5
              },
              {
                department: "D单位",
                job: "岗位三",
                first: 6,
                second: 4,
                third: "-",
                fourth: "-",
                fifth: "-",
                average: 5
              },
              {
                department: "D单位",
                job: "岗位四",
                first: 3,
                second: 4,
                third: 3,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "D单位",
                job: "岗位五",
                first: 4,
                second: 5,
                third: 1,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "D单位",
                job: "岗位六",
                first: 2,
                second: 3,
                third: 3,
                fourth: 2,
                fifth: "-",
                average: 2.5
              },
              {
                department: "D单位",
                job: "岗位七",
                first: 2,
                second: 2,
                third: 1,
                fourth: 2,
                fifth: 3,
                average: 2
              },
              {
                department: "D单位",
                job: "岗位八",
                first: 4,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "D单位",
                job: "岗位九",
                first: 3,
                second: 2,
                third: 5,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "D单位",
                job: "岗位十",
                first: 3,
                second: 3,
                third: 4,
                fourth: "-",
                fifth: "-",
                average: 3.3
              }
            ];
          } else if (this.currentDepartment == "department-fivth") {
            this.mobilityData = [
              {
                department: "E单位",
                job: "岗位一",
                first: 3,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "E单位",
                job: "岗位二",
                first: 5,
                second: 2,
                third: 2,
                fourth: 1,
                fifth: "-",
                average: 2.5
              },
              {
                department: "E单位",
                job: "岗位三",
                first: 6,
                second: 4,
                third: "-",
                fourth: "-",
                fifth: "-",
                average: 5
              },
              {
                department: "E单位",
                job: "岗位四",
                first: 3,
                second: 4,
                third: 3,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "E单位",
                job: "岗位五",
                first: 4,
                second: 5,
                third: 1,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "E单位",
                job: "岗位六",
                first: 2,
                second: 3,
                third: 3,
                fourth: 2,
                fifth: "-",
                average: 2.5
              },
              {
                department: "E单位",
                job: "岗位七",
                first: 2,
                second: 2,
                third: 1,
                fourth: 2,
                fifth: 3,
                average: 2
              },
              {
                department: "E单位",
                job: "岗位八",
                first: 4,
                second: 4,
                third: 2,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "E单位",
                job: "岗位九",
                first: 3,
                second: 2,
                third: 5,
                fourth: "-",
                fifth: "-",
                average: 3.3
              },
              {
                department: "E单位",
                job: "岗位十",
                first: 3,
                second: 3,
                third: 4,
                fourth: "-",
                fifth: "-",
                average: 3.3
              }
            ];
          }
          break;
        case "pane-fivth":
          if (this.currentDepartment == "department-first") {
            this.retireData = [
              {
                department: "A单位",
                name: "王小虎",
                ID: "0098431",
                retireTime: "2018-10-20"
              },
              {
                department: "A单位",
                name: "李河北",
                ID: "3218431",
                retireTime: "2018-12-03"
              },
              {
                department: "A单位",
                name: "汪真真",
                ID: "3432181",
                retireTime: "2018-09-22"
              },
              {
                department: "A单位",
                name: "夏海",
                ID: "8134321",
                retireTime: "2018-08-22"
              },
              {
                department: "A单位",
                name: "王津",
                ID: "2813431",
                retireTime: "2018-05-26"
              },
              {
                department: "A单位",
                name: "杜贺",
                ID: "0098431",
                retireTime: "2018-03-20"
              },
              {
                department: "A单位",
                name: "吕建国",
                ID: "3218431",
                retireTime: "2018-11-12"
              },
              {
                department: "A单位",
                name: "陈壮",
                ID: "3432181",
                retireTime: "2018-06-18"
              },
              {
                department: "A单位",
                name: "李济",
                ID: "8134321",
                retireTime: "2018-03-20"
              },
              {
                department: "A单位",
                name: "董武",
                ID: "2813431",
                retireTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-second") {
            this.retireData = [
              {
                department: "B单位",
                name: "王小虎",
                ID: "0098431",
                retireTime: "2018-10-20"
              },
              {
                department: "B单位",
                name: "李河北",
                ID: "3218431",
                retireTime: "2018-12-03"
              },
              {
                department: "B单位",
                name: "汪真真",
                ID: "3432181",
                retireTime: "2018-09-22"
              },
              {
                department: "B单位",
                name: "夏海",
                ID: "8134321",
                retireTime: "2018-08-22"
              },
              {
                department: "B单位",
                name: "王津",
                ID: "2813431",
                retireTime: "2018-05-26"
              },
              {
                department: "B单位",
                name: "杜贺",
                ID: "0098431",
                retireTime: "2018-03-20"
              },
              {
                department: "B单位",
                name: "吕建国",
                ID: "3218431",
                retireTime: "2018-11-12"
              },
              {
                department: "B单位",
                name: "陈壮",
                ID: "3432181",
                retireTime: "2018-06-18"
              },
              {
                department: "B单位",
                name: "李济",
                ID: "8134321",
                retireTime: "2018-03-20"
              },
              {
                department: "B单位",
                name: "董武",
                ID: "2813431",
                retireTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-third") {
            this.retireData = [
              {
                department: "C单位",
                name: "王小虎",
                ID: "0098431",
                retireTime: "2018-10-20"
              },
              {
                department: "C单位",
                name: "李河北",
                ID: "3218431",
                retireTime: "2018-12-03"
              },
              {
                department: "C单位",
                name: "汪真真",
                ID: "3432181",
                retireTime: "2018-09-22"
              },
              {
                department: "C单位",
                name: "夏海",
                ID: "8134321",
                retireTime: "2018-08-22"
              },
              {
                department: "C单位",
                name: "王津",
                ID: "2813431",
                retireTime: "2018-05-26"
              },
              {
                department: "C单位",
                name: "杜贺",
                ID: "0098431",
                retireTime: "2018-03-20"
              },
              {
                department: "C单位",
                name: "吕建国",
                ID: "3218431",
                retireTime: "2018-11-12"
              },
              {
                department: "C单位",
                name: "陈壮",
                ID: "3432181",
                retireTime: "2018-06-18"
              },
              {
                department: "C单位",
                name: "李济",
                ID: "8134321",
                retireTime: "2018-03-20"
              },
              {
                department: "C单位",
                name: "董武",
                ID: "2813431",
                retireTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-fourth") {
            this.retireData = [
              {
                department: "D单位",
                name: "王小虎",
                ID: "0098431",
                retireTime: "2018-10-20"
              },
              {
                department: "D单位",
                name: "李河北",
                ID: "3218431",
                retireTime: "2018-12-03"
              },
              {
                department: "D单位",
                name: "汪真真",
                ID: "3432181",
                retireTime: "2018-09-22"
              },
              {
                department: "D单位",
                name: "夏海",
                ID: "8134321",
                retireTime: "2018-08-22"
              },
              {
                department: "D单位",
                name: "王津",
                ID: "2813431",
                retireTime: "2018-05-26"
              },
              {
                department: "D单位",
                name: "杜贺",
                ID: "0098431",
                retireTime: "2018-03-20"
              },
              {
                department: "D单位",
                name: "吕建国",
                ID: "3218431",
                retireTime: "2018-11-12"
              },
              {
                department: "D单位",
                name: "陈壮",
                ID: "3432181",
                retireTime: "2018-06-18"
              },
              {
                department: "D单位",
                name: "李济",
                ID: "8134321",
                retireTime: "2018-03-20"
              },
              {
                department: "D单位",
                name: "董武",
                ID: "2813431",
                retireTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-fivth") {
            this.retireData = [
              {
                department: "E单位",
                name: "王小虎",
                ID: "0098431",
                retireTime: "2018-10-20"
              },
              {
                department: "E单位",
                name: "李河北",
                ID: "3218431",
                retireTime: "2018-12-03"
              },
              {
                department: "E单位",
                name: "汪真真",
                ID: "3432181",
                retireTime: "2018-09-22"
              },
              {
                department: "E单位",
                name: "夏海",
                ID: "8134321",
                retireTime: "2018-08-22"
              },
              {
                department: "E单位",
                name: "王津",
                ID: "2813431",
                retireTime: "2018-05-26"
              },
              {
                department: "E单位",
                name: "杜贺",
                ID: "0098431",
                retireTime: "2018-03-20"
              },
              {
                department: "E单位",
                name: "吕建国",
                ID: "3218431",
                retireTime: "2018-11-12"
              },
              {
                department: "E单位",
                name: "陈壮",
                ID: "3432181",
                retireTime: "2018-06-18"
              },
              {
                department: "E单位",
                name: "李济",
                ID: "8134321",
                retireTime: "2018-03-20"
              },
              {
                department: "E单位",
                name: "董武",
                ID: "2813431",
                retireTime: "2018-09-12"
              }
            ];
          }
          break;
        case "pane-sixth":
          if (this.currentDepartment == "department-first") {
            this.growData = [
              {
                department: "A单位",
                name: "王小虎",
                ID: "0098431",
                growTime: "2018-10-20"
              },
              {
                department: "A单位",
                name: "李河北",
                ID: "3218431",
                growTime: "2018-12-03"
              },
              {
                department: "A单位",
                name: "汪真真",
                ID: "3432181",
                growTime: "2018-09-22"
              },
              {
                department: "A单位",
                name: "夏海",
                ID: "8134321",
                growTime: "2018-08-22"
              },
              {
                department: "A单位",
                name: "王津",
                ID: "2813431",
                growTime: "2018-05-26"
              },
              {
                department: "A单位",
                name: "杜贺",
                ID: "0098431",
                growTime: "2018-03-20"
              },
              {
                department: "A单位",
                name: "吕建国",
                ID: "3218431",
                growTime: "2018-11-12"
              },
              {
                department: "A单位",
                name: "陈壮",
                ID: "3432181",
                growTime: "2018-06-18"
              },
              {
                department: "A单位",
                name: "李济",
                ID: "8134321",
                growTime: "2018-03-20"
              },
              {
                department: "A单位",
                name: "董武",
                ID: "2813431",
                growTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-second") {
            this.growData = [
              {
                department: "B单位",
                name: "王小虎",
                ID: "0098431",
                growTime: "2018-10-20"
              },
              {
                department: "B单位",
                name: "李河北",
                ID: "3218431",
                growTime: "2018-12-03"
              },
              {
                department: "B单位",
                name: "汪真真",
                ID: "3432181",
                growTime: "2018-09-22"
              },
              {
                department: "B单位",
                name: "夏海",
                ID: "8134321",
                growTime: "2018-08-22"
              },
              {
                department: "B单位",
                name: "王津",
                ID: "2813431",
                growTime: "2018-05-26"
              },
              {
                department: "B单位",
                name: "杜贺",
                ID: "0098431",
                growTime: "2018-03-20"
              },
              {
                department: "B单位",
                name: "吕建国",
                ID: "3218431",
                growTime: "2018-11-12"
              },
              {
                department: "B单位",
                name: "陈壮",
                ID: "3432181",
                growTime: "2018-06-18"
              },
              {
                department: "B单位",
                name: "李济",
                ID: "8134321",
                growTime: "2018-03-20"
              },
              {
                department: "B单位",
                name: "董武",
                ID: "2813431",
                growTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-third") {
            this.growData = [
              {
                department: "C单位",
                name: "王小虎",
                ID: "0098431",
                growTime: "2018-10-20"
              },
              {
                department: "C单位",
                name: "李河北",
                ID: "3218431",
                growTime: "2018-12-03"
              },
              {
                department: "C单位",
                name: "汪真真",
                ID: "3432181",
                growTime: "2018-09-22"
              },
              {
                department: "C单位",
                name: "夏海",
                ID: "8134321",
                growTime: "2018-08-22"
              },
              {
                department: "C单位",
                name: "王津",
                ID: "2813431",
                growTime: "2018-05-26"
              },
              {
                department: "C单位",
                name: "杜贺",
                ID: "0098431",
                growTime: "2018-03-20"
              },
              {
                department: "C单位",
                name: "吕建国",
                ID: "3218431",
                growTime: "2018-11-12"
              },
              {
                department: "C单位",
                name: "陈壮",
                ID: "3432181",
                growTime: "2018-06-18"
              },
              {
                department: "C单位",
                name: "李济",
                ID: "8134321",
                growTime: "2018-03-20"
              },
              {
                department: "C单位",
                name: "董武",
                ID: "2813431",
                growTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-fourth") {
            this.growData = [
              {
                department: "D单位",
                name: "王小虎",
                ID: "0098431",
                growTime: "2018-10-20"
              },
              {
                department: "D单位",
                name: "李河北",
                ID: "3218431",
                growTime: "2018-12-03"
              },
              {
                department: "D单位",
                name: "汪真真",
                ID: "3432181",
                growTime: "2018-09-22"
              },
              {
                department: "D单位",
                name: "夏海",
                ID: "8134321",
                growTime: "2018-08-22"
              },
              {
                department: "D单位",
                name: "王津",
                ID: "2813431",
                growTime: "2018-05-26"
              },
              {
                department: "D单位",
                name: "杜贺",
                ID: "0098431",
                growTime: "2018-03-20"
              },
              {
                department: "D单位",
                name: "吕建国",
                ID: "3218431",
                growTime: "2018-11-12"
              },
              {
                department: "D单位",
                name: "陈壮",
                ID: "3432181",
                growTime: "2018-06-18"
              },
              {
                department: "D单位",
                name: "李济",
                ID: "8134321",
                growTime: "2018-03-20"
              },
              {
                department: "D单位",
                name: "董武",
                ID: "2813431",
                growTime: "2018-09-12"
              }
            ];
          } else if (this.currentDepartment == "department-fivth") {
            this.growData = [
              {
                department: "E单位",
                name: "王小虎",
                ID: "0098431",
                growTime: "2018-10-20"
              },
              {
                department: "E单位",
                name: "李河北",
                ID: "3218431",
                growTime: "2018-12-03"
              },
              {
                department: "E单位",
                name: "汪真真",
                ID: "3432181",
                growTime: "2018-09-22"
              },
              {
                department: "E单位",
                name: "夏海",
                ID: "8134321",
                growTime: "2018-08-22"
              },
              {
                department: "E单位",
                name: "王津",
                ID: "2813431",
                growTime: "2018-05-26"
              },
              {
                department: "E单位",
                name: "杜贺",
                ID: "0098431",
                growTime: "2018-03-20"
              },
              {
                department: "E单位",
                name: "吕建国",
                ID: "3218431",
                growTime: "2018-11-12"
              },
              {
                department: "E单位",
                name: "陈壮",
                ID: "3432181",
                growTime: "2018-06-18"
              },
              {
                department: "E单位",
                name: "李济",
                ID: "8134321",
                growTime: "2018-03-20"
              },
              {
                department: "E单位",
                name: "董武",
                ID: "2813431",
                growTime: "2018-09-12"
              }
            ];
          }
          break;
      }

      console.log(this.currentDepartment);
    },

    // 标签页点击事件
    handleClick(tab, event) {
      this.currentTab = tab.$el.id;

      if (this.currentTab == "pane-third") {
        var category1 = [
          "A单位岗位一",
          "A单位岗位二",
          "A单位岗位三",
          "A单位岗位四",
          "A单位岗位五",
          "A单位岗位六",
          "A单位岗位七",
          "A单位岗位八",
          "A单位岗位九",
          "A单位岗位十",
          "A单位整体超编(人)"
        ];
        var data1 = [4, 3, 1, 2, 2, 3, 1, 3, 1, 2, 22];
        var category2 = [
          "A单位岗位一",
          "A单位岗位二",
          "A单位岗位三",
          "A单位岗位四",
          "A单位岗位五",
          "A单位岗位六",
          "A单位岗位七",
          "A单位岗位八",
          "A单位整体超编(人)"
        ];
        var data2 = [2, 2, 3, 1, 1, 2, 1, 2, 14];
        var category3 = [
          "A单位岗位一",
          "A单位岗位二",
          "A单位岗位三",
          "A单位岗位四",
          "A单位岗位五",
          "A单位岗位六",
          "A单位岗位七",
          "A单位岗位八",
          "A单位岗位九",
          "A单位整体超编(人)"
        ];
        var data3 = [1, 2, 3, 1, 3, 1, 1, 1, 2, 15];
        configureLeaderSurpass(
          category1,
          data1,
          category2,
          data2,
          category3,
          data3
        );
      }
      console.log(tab.$el.id, event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("../../assets/css/teamControl.css");
</style>

